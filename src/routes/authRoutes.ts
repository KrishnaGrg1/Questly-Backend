import { Router } from "express";
import authController from "../controllers/authControllers";
import validate from "../middlewares/validation";
import authValidation from "../validations/authValidation";

const authRoutes=Router()

authRoutes.post('/register',validate(authValidation.register),authController.register)
authRoutes.post('/login',validate(authValidation.login),authController.login)
authRoutes.post('/forget-password',validate(authValidation.forget_password),authController.forgetPassword)
authRoutes.post('/reset-password',validate(authValidation.reset_password),authController.verifyPassword)
export default authRoutes