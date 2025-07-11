import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport'; // 👈 add this
import env from './config';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: Number(env.SMTP_PORT) === 465,
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD,
  },
} as SMTPTransport.Options);

function generateToken(): string {
  return (100000 + Math.floor(Math.random() * 900000)).toString();
}
async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<void> {
  try {
    const info = await transporter.sendMail({
      from: `"YaGOo" <${env.SMTP_USERNAME}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Email service failure');
  }
}

export async function sendRecoveryEmail(userEmail: string): Promise<string> {
  const token = generateToken();
  const subject = 'Password Recovery - Verify Your Email';
  const text = `Hello, use the token to verify your email: ${token}`;
  const html = `
    <p>Dear User,</p>
    <p>Please use the following token to verify your email address:</p>
    <p><b style="font-size: 20px;">${token}</b></p>
    <p>Do not share this token with anyone.</p>
    <p>Thank you,<br />The YaGOo Team</p>`;

  await sendEmail(userEmail, subject, html, text);
  return token;
}
