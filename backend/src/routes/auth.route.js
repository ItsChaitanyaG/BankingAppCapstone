import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);

//secured routes
router.route("/logout").post(verifyJWT, logout);

export default router;
