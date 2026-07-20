import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { prisma } from "../lib/prisma.js";
import uploadToCloudinary from "../utils/Cloudinary.js";

//profile
const getProfile = AsyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      kyc: {
        select: {
          status: true,
          doc_url: true,
          doc_type: true,
          doc_no: true,
          submittedAt: true,
          updatedAt: true,
        },
      },
      account: {
        select: {
          id: true,
          acc_no: true,
          acc_type: true,
          balance: true,
          beneficiaries: true,

        },
      },

    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, "success"));
});

//kyc
const addKyc = async (userId, doc_type, doc_no, document) => {
  try {
    const kyc = await prisma.kyc.create({
      data: {
        user_id: userId,
        doc_type,
        doc_no,
        doc_url: document.secure_url,
      },
    });

    return kyc;
  } catch (error) {
    console.error(error);
  }
};

const kycRequest = AsyncHandler(async (req, res) => {

  const { doc_type, doc_no } = req.body;

  if (!doc_type || !doc_no) {
    throw new ApiError(400, "doc_type and doc_no are required");
  }

  const userId = req.user.id;

  if (!userId) {
    throw new ApiError(400, "Unauthorized request");
  }

  const docLocalPath = req.files?.document[0].path;

  if (!docLocalPath) {
    throw new ApiError(400, "Document is required.");
  }

  const document = await uploadToCloudinary(docLocalPath);

  if (!document) {
    throw new ApiError(400, "Document is required.");
  }

  const newKyc = await addKyc(userId, doc_type, doc_no, document);

  return res.status(200).json(new ApiResponse(200, newKyc, "success"));
});

//account
const generateAccountNumber = () => {
  return Math.floor(100000000000 + Math.random() * 900000000000).toString();
};

const createAccount = async (user, accType, openingBalance) => {
  try {
    let accNo, accExists;

    do {
      accNo = generateAccountNumber();

      accExists = await prisma.account.findUnique({
        where: { acc_no: accNo },
      });
    } while (accExists);

    const newAccount = await prisma.account.create({
      data: {
        user_id: user.id,
        acc_no: accNo,
        acc_type: accType,
        balance: openingBalance,
      },
    });

  console.log("=== addAccount controller ===");

    return newAccount;
  } catch (error) {
    console.error("Create account error:", error);
    throw new ApiError(500, "Failed to create account");
  }
};

const addAccount = AsyncHandler(async (req, res) => {
  const { accType, openingBalance } = req.body;
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
        account: true,
      },
  });

  if (!accType || !openingBalance) {
    throw new ApiError(400, "Account type and openingBalance are required");
  }

  if (user.account.length === 2) {
    throw new ApiError(400, "Maximum 2 accounts allowed");
  }

  if (accType === "SAVINGS" && openingBalance < 1000) {
    throw new ApiError(400, "Minimum opening balance for Savings is ₹1000");
  }

  if (accType === "CURRENT" && openingBalance < 5000) {
    throw new ApiError(400, "Minimum opening balance for Current is ₹5000");
  }

  const newAccount = await createAccount(user, accType, openingBalance);

  return res
    .status(201)
    .json(new ApiResponse(201, newAccount, "Account created successfully"));
});

//beneficiaries
const getBeneficiaries = AsyncHandler(async (req, res) => {
  const accountId = Number(req.params.accountId);

  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      user_id: req.user.id,
    }
  })

  if (!account) {
    throw new ApiError(403, "Unauthorized access");
  }

  const beneficiaries = await prisma.beneficiary.findMany({
    where: {
      owner_acc_id: accountId,
    }
  })

  return res.status(200)
    .json( new ApiResponse(200, beneficiaries, "Beneficiaries fetched successfully"))
});

const addBeneficiary = AsyncHandler(async (req, res) => {
  const { name, bank_name, account_no, max_limit } = req.body;
  const { accountId } = req.params;

  const account = await prisma.account.findFirst({
    where: {
      id: Number(accountId),
      user_id: req.user.id,
    },
  });

  if (!account) {
    throw new ApiError(404, "Account not found");
  }

  if (!name || !bank_name || !account_no || !max_limit) {
    throw new ApiError(400, "All fields are required");
  }

  if (Number(max_limit) < 1000) {
    throw new ApiError(400, "Maximum transfer limit must be at least ₹1000");
  }

  const beneficiaryExists = await prisma.beneficiary.findFirst({
    where: {
      owner_acc_id: account.id,
      account_no,
    },
  });

  if (beneficiaryExists) {
    throw new ApiError(
      400,
      "Beneficiary with this account number already exists",
    );
  }

  const newBeneficiary = await prisma.beneficiary.create({
    data: {
      owner_acc_id: account.id,
      name,
      bank_name,
      account_no,
      max_limit,
    },
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, newBeneficiary, "Beneficiary added successfully"),
    );
});

//Transactions

const transfer = async (sender, receiver, amount, remark) => {
  const transferAmount = Number(amount);

  try {
    await prisma.$transaction(async (tx) => {
      //debit sender
      await tx.account.update({
        where: {
          id: sender.id,
        },
        data: {
          balance: {
            decrement: transferAmount,
          }
        }
      })

      //credit receiver
      await tx.account.update({
        where: {
          id: receiver.id,
        },
        data: {
          balance: {
            increment: transferAmount,
          }
        }
      })

      //create transaction record
      await tx.transaction.create({
        data: {
          sender_id: sender.id,
          receiver_id: receiver.id,
          amount: transferAmount,
          remark,
        }
      })
    });
  } catch (error) {
    throw new ApiError(500, "Transaction failed", error);
  }

};

const transferMoney = AsyncHandler(async (req, res) => {

  const { senderAccId } = req.params;
  const { accountNo, amount, remark } = req.body;

  const sender = await prisma.account.findFirst({
    where: {
      id: Number(senderAccId),
      user_id: req.user.id,
    }
  })

  if (!sender) {
    throw new ApiError(403, "Unauthorized Request");
  }

  if (!Number(accountNo) || Number(amount) <= 0) {
    throw new ApiError(400, "Invalid amount or account number");
  }

  const balance = sender.balance;

  if (Number(balance) < Number(amount)) {
    throw new ApiError(400, "Insufficient balance");
  }

  const beneficiary = await prisma.beneficiary.findFirst({
    where: {
      account_no: accountNo,
      owner_acc_id: sender.id,
    }
  })

  if (beneficiary) {
    if(Number(amount) > Number(beneficiary.max_limit)) {
      throw new ApiError(400, "Amount exceeds beneficiary's max limit");
    }
  }

  const receiver = await prisma.account.findUnique({
    where: {
      acc_no: accountNo,
    }
  })

  if(!receiver) {
    throw new ApiError(404, "Receiver account not found");
  }

  if(receiver.id === sender.id) {
    throw new ApiError(400, "Cannot transfer to the same account");
  }

  await transfer(sender, receiver, amount, remark);

  return res.status(200)
    .json(new ApiResponse(200, null, "Transfer successful"))
})

const transactionHistory = AsyncHandler(async (req, res) => {
  const { accountId } = req.params;

  const account = await prisma.account.findFirst({
    where: {
      id: Number(accountId),
      user_id: req.user.id,
    }
  })

  if (!account) {
    throw new ApiError(403, "Unauthorized Request");
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      OR: [
        { sender_id: Number(accountId) },
        { receiver_id: Number(accountId) },
      ],
    },
    include: {
      sender: {
        select: {
          acc_no: true,
        },
      },
      receiver: {
        select: {
          acc_no: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  if (!transactions) {
    throw new ApiError(404, "No transactions found");
  }

  return res.status(200)
    .json(new ApiResponse(200, transactions, "Transactions fetched successfully"));
})

export { getProfile, kycRequest, addAccount, getBeneficiaries, addBeneficiary, transferMoney, transactionHistory };
