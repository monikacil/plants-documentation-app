import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendVerificationEmail(to: string, token: string) {
  const verifyUrl = `${ process.env.NEXT_PUBLIC_APP_URL }/api/auth/verify-email?token=${ token }`;

  const subject = "Confirm your email address";
  const html = `
    <div style="font-family: sans-serif; line-height: 1.5">
      <h2>Hello!</h2>
      <p>Thank you for registering. To activate your account, please click the link below:</p>
      <a href="${ verifyUrl }" style="color: #4f46e5">Activate your account</a>
      <p>Link valid for 12 hours.</p>
    </div>
  `;

  try {
    return await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: [to],
      subject,
      html,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new Error("Failed to send email");
  }
}
