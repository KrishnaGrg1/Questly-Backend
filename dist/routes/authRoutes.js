"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = __importDefault(require("../controllers/authControllers"));
const validation_1 = __importDefault(require("../middlewares/validation"));
const authValidation_1 = __importDefault(require("../validations/authValidation"));
const authRoutes = (0, express_1.Router)();
authRoutes.post('/register', (0, validation_1.default)(authValidation_1.default.register), authControllers_1.default.register);
authRoutes.post('/login', (0, validation_1.default)(authValidation_1.default.login), authControllers_1.default.login);
authRoutes.post('/forget-password', (0, validation_1.default)(authValidation_1.default.forget_password), authControllers_1.default.forgetPassword);
authRoutes.post('/reset-password', (0, validation_1.default)(authValidation_1.default.reset_password), authControllers_1.default.verifyPassword);
exports.default = authRoutes;
