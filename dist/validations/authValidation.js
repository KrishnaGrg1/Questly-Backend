"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const authValidation = {
    register: {
        body: joi_1.default.object().keys({
            UserName: joi_1.default.string().min(2).max(150).required().messages({
                "string.empty": "Username is required",
                "string.min": "Username must contain altleast 2 characters long",
                "string.max": "Username mustnot exceed 150 characters long"
            }),
            email: joi_1.default.string().email().required().messages({
                "string.empty": "Username is required",
                "string.email": "Username must be valid email address"
            }),
            password: joi_1.default.string().min(8).max(50).required().messages({
                "string.empty": "Password is required",
                "string.min": "Passsword must be at least 8 character",
                "string.max": "Password must not exceed 50 characters"
            })
        })
    },
    login: {
        body: joi_1.default.object().keys({
            email: joi_1.default.string().email().required().messages({
                "string.empty": "Username is required",
                "string.email": "Username must be valid email address"
            }),
            password: joi_1.default.string().min(8).max(50).required().messages({
                "string.base": "Password must be string",
                "string.empty": "Password is required",
                "string.min": "Password must be atleast 8 characters long",
                "string.max": "Password mustnot exceed 50 characters long",
                "any.required": "Password is required"
            })
        })
    }
};
exports.default = authValidation;
