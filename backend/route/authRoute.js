import express from "express";
import authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logOut);
authRouter.post("/sendotp", authController.sendOTP);
authRouter.post("/verifyotp", authController.verifyOTP);
authRouter.post("/resetpassword", authController.resetPassword);
authRouter.post("/signup-google", authController.signupGoogle);

export default authRouter;