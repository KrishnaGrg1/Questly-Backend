

import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import env from "../helpers/config";
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

const authController = {
    register,
    login
}

export default authController