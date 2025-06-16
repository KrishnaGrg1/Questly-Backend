"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const mainRoutes = (0, express_1.Router)();
mainRoutes.use('/api/v1/', authRoutes_1.default);
exports.default = mainRoutes;
