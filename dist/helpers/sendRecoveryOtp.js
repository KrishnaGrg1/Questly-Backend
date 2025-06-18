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
exports.sendRecoveryEmail = sendRecoveryEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("./config"));
const transporter = nodemailer_1.default.createTransport({
    host: config_1.default.SMTP_HOST,
    port: Number(config_1.default.SMTP_PORT),
    secure: Number(config_1.default.SMTP_PORT) === 465,
    auth: {
        user: config_1.default.SMTP_USERNAME,
        pass: config_1.default.SMTP_PASSWORD,
    },
});
function generateToken() {
    return (100000 + Math.floor(Math.random() * 900000)).toString();
}
function sendEmail(to, subject, html, text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = yield transporter.sendMail({
                from: `"YaGOo" <${config_1.default.SMTP_USERNAME}>`,
                to,
                subject,
                text,
                html,
            });
            console.log('Message sent: %s', info.messageId);
        }
        catch (error) {
            console.error('Failed to send email:', error);
            throw new Error('Email service failure');
        }
    });
}
function sendRecoveryEmail(userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = generateToken();
        const subject = 'Password Recovery - Verify Your Email';
        const text = `Hello, use the token to verify your email: ${token}`;
        const html = `
    <p>Dear User,</p>
    <p>Please use the following token to verify your email address:</p>
    <p><b style="font-size: 20px;">${token}</b></p>
    <p>Do not share this token with anyone.</p>
    <p>Thank you,<br />The YaGOo Team</p>`;
        yield sendEmail(userEmail, subject, html, text);
        return token;
    });
}
