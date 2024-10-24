import { Router } from "express";
import { loginUser, logoutUser, refreshToken, registerUser } from "../controller/auth.controller";
import Protected from "../middleware/Protected";


const router = Router()

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(Protected, logoutUser);
router.route("/refresh-token").get(refreshToken);

export default router;