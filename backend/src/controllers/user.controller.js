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
        doc_url: document.url,
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

  const docLocalPath = req.file?.document[0]?.path;

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

    return newAccount;
  } catch (error) {
    throw new ApiError(500, "Failed to create account");
  }
};

const addAccount = AsyncHandler(async (req, res) => {
  const { accType, openingBalance } = req.body;
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
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

export { getProfile, kycRequest, addAccount, addBeneficiary };
