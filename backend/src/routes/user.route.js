import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  addAccount,
  getProfile,
  kycRequest,
} from "../controllers/user.controller.js";
import { verifyKyc } from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//profile
router.route("/profile").get(verifyJWT, getProfile);

//kyc
router
  .route("/kycRequest")
  .post(
    verifyJWT,
    upload.fields({ name: "document", maxCount: 1 }),
    kycRequest,
  );

//account
router.route("/account/addAccount").post(verifyJWT, verifyKyc, addAccount);

export default router;
