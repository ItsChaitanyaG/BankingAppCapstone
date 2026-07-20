import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { prisma } from "../lib/prisma.js";


const checkKycVerified = AsyncHandler(async (req, _, next) => {
  const kyc = await prisma.kyc.findUnique({
    where: { user_id: req.user.id },
  });

  if (!kyc) {
    throw new ApiError(404, "KYC not found");
  }

  if (kyc.status !== "VERIFIED") {
    throw new ApiError(403, "KYC not verified");
  }

  next();
});

export default checkKycVerified;
