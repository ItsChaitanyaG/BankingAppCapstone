import { Router } from "express";
import {
  getAllCustomers,
  getAllKyc,
  getCustomer,
  getKyc,
  rejectKyc,
  verifyKyc,
  getTransactions,
  getTransactionDetails
} from "../controllers/admin.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import verifyAdmin from "../middlewares/admin.middleware.js";

const router = Router();

//customer
router.route("/customers").get(verifyJWT, verifyAdmin, getAllCustomers);
router.route("/customers/:id").get(verifyJWT, verifyAdmin, getCustomer);

//kyc
router.route("/kyc").get(verifyJWT, verifyAdmin, getAllKyc);
router.route("/kyc/:id").get(verifyJWT, verifyAdmin, getKyc);
router.route("/kyc/:id/verify").patch(verifyJWT, verifyAdmin, verifyKyc);
router.route("/kyc/:id/reject").patch(verifyJWT, verifyAdmin, rejectKyc);

//transactions
router.route("/transactions").get(verifyJWT, verifyAdmin, getTransactions);
router.route("/transactions/:id").get(verifyJWT, verifyAdmin, getTransactionDetails);


export default router;
