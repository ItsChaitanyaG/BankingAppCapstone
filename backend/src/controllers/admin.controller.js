import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { prisma } from "../lib/prisma.js";

const getAllCustomers = AsyncHandler(async (req, res) => {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    select: { id: true, name: true, email: true, role: true },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, customers, "Customers fetched successfully"));
});

const getCustomer = AsyncHandler(async (req, res) => {
  const customer = await prisma.user.findUnique({
    where: { id: req.params.id },
    select: { id: true, name: true, email: true },

    account: {
      select: { id: true, acc_no: true, balance: true },
    },

    kyc: {
      select: { id: true, status: true },
    },
  });

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, customer, "Customer fetched successfully"));
});

const getAllKyc = AsyncHandler(async (req, res) => {
  const kyc = await prisma.kyc.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (kyc.length === 0) {
    throw new ApiError(404, "No KYC records found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, kyc, "KYC fetched successfully"));
});

const getKyc = AsyncHandler(async (req, res) => {
  const kyc = await prisma.kyc.findUnique({
    where: { id: req.params.id },
  });

  if (!kyc) {
    throw new ApiError(404, "KYC not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, kyc, "KYC fetched successfully"));
});

const verifyKyc = AsyncHandler(async (req, res) => {
  const kyc = await prisma.kyc.update({
    where: { id: req.params.id },
    data: { status: "VERIFIED" },
  });

  if (!kyc) {
    throw new ApiError(404, "KYC not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, kyc, "KYC verified successfully"));
});

const rejectKyc = AsyncHandler(async (req, res) => {
  const kyc = await prisma.kyc.update({
    where: { id: req.params.id },
    data: {
      status: "REJECTED",
    },
  });

  if (!kyc) {
    throw new ApiError(404, "KYC not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, kyc, "KYC rejected successfully"));
});

export {
  getAllCustomers,
  getCustomer,
  getAllKyc,
  getKyc,
  verifyKyc,
  rejectKyc,
};
