"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../helpers/config"));
const sendRecoveryOtp_1 = require("../helpers/sendRecoveryOtp");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserName, email, password } = req.body;
        const existingUser = yield client.user.findFirst({
            where: {
                UserName
            }
        });
        if (existingUser) {
            res.status(400).json({
                message: "Username already exist"
            });
            return;
        }
        const existingEmail = yield client.user.findFirst({
            where: {
                email
            }
        });
        if (existingEmail) {
            res.status(400).json({
                message: "Email already exist"
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const NewUser = yield client.user.create({
            data: {
                UserName,
                email: email,
                password: hashedPassword
            }
        });
        res.status(200).json({
            message: "User registered successfully",
            NewUser
        });
        return;
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({
                message: e.message
            });
        }
        else {
            res.status(500).json({
                messsage: "Unexpected Error has occurred"
            });
        }
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield client.user.findFirst({
            where: {
                email
            }
        });
        if (!existingUser) {
            res.status(400).json({
                message: "User didnot exist"
            });
            return;
        }
        const comparePassword = yield bcrypt_1.default.compare(password, existingUser === null || existingUser === void 0 ? void 0 : existingUser.password);
        if (!comparePassword) {
            res.status(400).json({
                message: "Incorrect password"
            });
            return;
        }
        const JWT_Password = config_1.default.JWT_Password;
        const token = jsonwebtoken_1.default.sign({ userID: existingUser.id }, JWT_Password);
        res.status(200).json({
            message: "User login successfully",
            token
        });
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({
                message: e.message
            });
        }
        else {
            res.status(500).json({
                messsage: "Unexpected Error has occurred"
            });
        }
    }
});
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const existingUser = yield client.user.findFirst({
            where: {
                email
            }
        });
        if (!existingUser) {
            res.status(400).json({
                message: "Email not found"
            });
            return;
        }
        const otp = yield (0, sendRecoveryOtp_1.sendRecoveryEmail)(email);
        const hashed_Otp = yield bcrypt_1.default.hash(otp, 10);
        const newOtp = yield client.otp.create({
            data: {
                otp_code: hashed_Otp,
                userId: existingUser.id
            }
        });
        res.status(200).json({
            newOtp,
            message: `Sucessfully send Otp to ${existingUser.UserName}`
        });
        return;
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({
                message: e.message
            });
        }
        else {
            res.status(500).json({
                message: "Unexpected error has occurred"
            });
        }
    }
});
const verifyPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, userId, newPassword } = req.body;
    try {
        yield client.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            // Find user
            const existingUser = yield tx.user.findUnique({
                where: { id: userId },
            });
            if (!existingUser) {
                res.status(400).json({ message: "User not found" });
                return;
            }
            // Find OTP
            const existingOtp = yield tx.otp.findFirst({
                where: {
                    userId,
                    otp_code: otp,
                },
            });
            if (!existingOtp) {
                res.status(400).json({ message: "Invalid OTP" });
                return;
            }
            // Hash the new password
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
            // Update password
            yield tx.user.update({
                where: { id: userId },
                data: { password: hashedPassword },
            });
            // Delete OTP entry
            yield tx.otp.delete({
                where: { id: existingOtp.id },
            });
            res.status(200).json({ message: 'Password updated successfully' });
        }));
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({
                message: e.message
            });
        }
        else {
            res.status(500).json({
                messsage: "Unexpected Error has occurred"
            });
        }
    }
});
const authController = {
    register,
    login,
    forgetPassword,
    verifyPassword
};
exports.default = authController;
