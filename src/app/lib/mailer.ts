import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const EMAIL_FROM = process.env.EMAIL_FROM ?? "noreply@plants-app.com";

//
//  --- EMAIL: VERIFY ACCOUNT ---
//
export async function sendVerificationEmail(to: string, token: string) {
  const verifyUrl = `${ APP_URL }/auth/verify-email/${ token }`;
  const subject = "Confirm your email address";

  const html = `
  <div style="font-family: 'Fredoka', sans-serif; line-height: 1.6; color: #1F2D1F; max-width: 600px; margin: auto;">
    <h2 style="color: #4B8F61;">🌱 Hello Plant Enthusiast!</h2>
    <p>Thank you for joining <strong>Plants Documentation App</strong>.</p>
    <p>To activate your account, please confirm your email address by clicking the button below:</p>
    <p style="text-align: center; margin: 24px 0;">
      <a href="${ verifyUrl }" target="_blank" rel="noopener noreferrer"
        style="background-color: #4B8F61; color: #ffffff; padding: 10px 20px; border-radius: 25px;
               font-weight: bold; text-decoration: none; display: inline-block;">
        Verify Email
      </a>
    </p>
    <p style="font-size: 0.9rem; color: #6B7D6B;">This link will expire in 12 hours.</p>
    <p style="font-size: 0.9rem; color: #A8BDA8;">If you did not create an account, please ignore this email.</p>
  </div>
  `;

  try {
    return await resend.emails.send({
      from: EMAIL_FROM,
      to: [to],
      subject,
      html,
    })
  } catch (err) {
    console.error("[MAILER] Failed to send verification email:", err);
    throw new Error("Failed to send verification email");
  }
}

//
//  --- EMAIL: RESET PASSWORD ---
//
export async function sendResetPasswordEmail(to: string, token: string) {
  const resetUrl = `${ APP_URL }/auth/reset-password/${ token }`;
  const subject = "Reset your password";

  const html = `
  <div style="font-family: 'Fredoka', sans-serif; line-height: 1.6; color: #1F2D1F; max-width: 600px; margin: auto;">
    <h2 style="color: #4C9C9A;">🔒 Password Reset Request</h2>
    <p>We received a request to reset your password.</p>
    <p>Click the button below to set a new password:</p>
    <p style="text-align: center; margin: 24px 0;">
      <a href="${ resetUrl }" target="_blank" rel="noopener noreferrer"
        style="background-color: #4C9C9A; color: #ffffff; padding: 10px 20px; border-radius: 25px;
               font-weight: bold; text-decoration: none; display: inline-block;">
        Reset Password
      </a>
    </p>
    <p style="font-size: 0.9rem; color: #6B7D6B;">This link will expire in 30 minutes.</p>
    <p style="font-size: 0.9rem; color: #A8BDA8;">If you did not request this, you can safely ignore this email.</p>
  </div>
  `;

  try {
    return await resend.emails.send({
      from: EMAIL_FROM,
      to: [to],
      subject,
      html,
    });
  } catch (err) {
    console.error("[MAILER] Failed to send password reset email:", err);
    throw new Error("Failed to send password reset email");
  }
}
