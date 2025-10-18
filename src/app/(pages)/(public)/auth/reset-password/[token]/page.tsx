import ResetPasswordComponent from "./ResetPasswordComponent";
import { verifyResetToken } from "@/actions/auth.actions";

export default async function ResetPasswordServerPage({ params }: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token
  const result = await verifyResetToken(token);
  
  return <ResetPasswordComponent token={ token } tokenStatus={ result } />;
}
