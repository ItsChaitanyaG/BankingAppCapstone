import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  addAccount,
  getProfile,
  kycRequest,
  getBeneficiaries,
  addBeneficiary,
  transferMoney,
  transactionHistory,
} from "../controllers/user.controller.js";
import checkKycVerified from "../middlewares/kyc.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//profile
router.route("/profile").get(verifyJWT, getProfile);

//kyc
router
  .route("/kycRequest")
  .post(
    verifyJWT,
    upload.fields([{ name: "document", maxCount: 1 }]),
    kycRequest,
  );

//account
router.route("/account/addAccount").post(verifyJWT, checkKycVerified, addAccount);

//beneficiaries
router.route("/beneficiaries/:accountId").get(verifyJWT, getBeneficiaries);
router.route("/beneficiaries/:accountId").post(verifyJWT, checkKycVerified, addBeneficiary);

//transaction
router.route("/:senderAccId/transfer").patch(verifyJWT, checkKycVerified, transferMoney);
router.route("/:accountId/transactions").get(verifyJWT, transactionHistory);


export default router;
