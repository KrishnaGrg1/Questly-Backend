

import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import env from "../helpers/config";
import { sendRecoveryEmail } from "../helpers/sendRecoveryOtp";
const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { UserName, email, password } = req.body
        const existingUser = await client.user.findFirst({
            where: {
                UserName
            }
        })
        if (existingUser) {
            res.status(400).json({
                message: "Username already exist"
            })
            return
        }
        const existingEmail = await client.user.findFirst({
            where: {
                email
            }
        })
        if (existingEmail) {
            res.status(400).json({
                message: "Email already exist"
            })
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const NewUser = await client.user.create({
            data: {
                UserName,
                email: email,
                password: hashedPassword
            }
        });
        res.status(200).json({
            message: "User registered successfully",
            NewUser
        })
        return
    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(500).json({
                message: e.message
            })
        } else {
            res.status(500).json({
                messsage: "Unexpected Error has occurred"
            })
        }
    }
}

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const existingUser = await client.user.findFirst({
            where: {
                email
            }
        })
        if (!existingUser) {
            res.status(400).json({
                message: "User didnot exist"
            })
            return
        }
        const comparePassword = await bcrypt.compare(password, existingUser?.password)
        if (!comparePassword) {
            res.status(400).json({
                message: "Incorrect password"
            })
            return
        }
        const JWT_Password = env.JWT_Password as string;
        const token = jwt.sign({ userID: existingUser.id }, JWT_Password);
        res.status(200).json({
            message: "User login successfully",
            token
        })
    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(500).json({
                message: e.message
            })
        } else {
            res.status(500).json({
                messsage: "Unexpected Error has occurred"
            })
        }
    }
}

const forgetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        const existingUser = await client.user.findFirst({
            where: {
                email
            }
        })
        if (!existingUser) {
            res.status(400).json({
                message: "Email not found"
            })
            return
        }
        const otp = await sendRecoveryEmail(email)
        const hashed_Otp = await bcrypt.hash(otp, 10)
        const newOtp = await client.otp.create({
            data: {
                otp_code: hashed_Otp,
                userId: existingUser.id
            }
        })
        res.status(200).json({
            newOtp,
            message: `Sucessfully send Otp to ${existingUser.UserName}`
        })
        return
    } catch (e: any) {
        if (e instanceof Error) {
            res.status(500).json({
                message: e.message
            })
        } else {
            res.status(500).json({
                message: "Unexpected error has occurred"
            })
        }
    }
}

const verifyPassword = async (req: Request, res: Response): Promise<void> => {
    const { otp, userId, newPassword } = req.body;
    try {
        await client.$transaction(async (tx) => {
            // Find user
            const existingUser = await tx.user.findUnique({
                where: { id: userId },
            });

            if (!existingUser) {
                res.status(400).json({ message: "User not found" });
                return;
            }

            // Find OTP
            const existingOtp = await tx.otp.findFirst({
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
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update password
            await tx.user.update({
                where: { id: userId },
                data: { password: hashedPassword },
            });

            // Delete OTP entry
            await tx.otp.delete({
                where: { id: existingOtp.id },
            });

            res.status(200).json({ message: 'Password updated successfully' });
        });

    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(500).json({
                message: e.message
            })
        } else {
            res.status(500).json({
                messsage: "Unexpected Error has occurred"
            })
        }
    }
}

const authController = {
    register,
    login,
    forgetPassword,
    verifyPassword
}

export default authController