import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
    const link = `http://localhost:3000/verify-email?token=${token}`;

    return resend.emails.send({
        from: "testing@resend.dev",
        to: email,
        subject: "SGBC Information System - Verify your email address",
        html: `
        <h1>SGBC Information System - Verify your email address</h1>
        <p>Please click the link below to verify your email address:</p>
            <a href="${link}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>`
    });
}