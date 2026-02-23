import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";
// If your Prisma file is located elsewhere, you can change the path

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
    },
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins: [process.env.APP_URL!],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "CUSTOMER",
                required: false
            },
            phone: {
                type: "string",
                required: false,
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE",
                required: false
            }
        },
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            try {
                const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}&email=${encodeURIComponent(user.email)}`;
                const info = await transporter.sendMail({
                    from: '"FoodHub" <foodhub.manager@gmail.com>',
                    to: user.email!,
                    subject: `Hello ✔ ${user.name}, Please verify your email address`,
                    html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <title>Email Verification</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>

                <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px 0;">
                <tr>
                    <td align="center">

                    <!-- Main Container -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">

                        <!-- Header -->
                        <tr>
                        <td style="background:#4f46e5;padding:20px;text-align:center;color:#ffffff;">
                            <h1 style="margin:0;font-size:24px;">FoodHub</h1>
                            <p style="margin:5px 0 0;font-size:14px;">Verify Your Email Address</p>
                        </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                        <td style="padding:30px;color:#333333;">

                            <h2 style="margin-top:0;">Hello ${user.name}, 👋</h2>

                            <p style="font-size:15px;line-height:1.6;">
                            Thank you for creating an account on <b>FoodHub</b>.  
                            To complete your registration, please verify your email address by clicking the button below:
                            </p>

                            <!-- Button -->
                            <div style="text-align:center;margin:30px 0;">
                            <a href="${verificationUrl}"
                                style="background:#4f46e5;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-size:16px;display:inline-block;">
                                Verify Email
                            </a>
                            </div>

                            <p style="font-size:14px;line-height:1.6;color:#555;">
                            If the button doesn't work, copy and paste this link into your browser:
                            </p>

                            <p style="word-break:break-all;font-size:13px;color:#4f46e5;">
                            "${verificationUrl}"
                            </p>

                            <p style="font-size:14px;line-height:1.6;color:#555;">
                            If you did not create this account, you can safely ignore this email.
                            </p>

                            <p style="margin-top:30px;font-size:14px;">
                            Regards,<br>
                            <b>FoodHub Team</b>
                            </p>

                        </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                        <td style="background:#f1f5f9;padding:15px;text-align:center;font-size:12px;color:#777;">
                            © 2026 FoodHub. All rights reserved.<br>
                            This is an automated message, please do not reply.
                        </td>
                        </tr>

                    </table>

                    </td>
                </tr>
                </table>

                </body>
                </html>
                `
                });
                console.log("Message sent:", info.messageId);
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});