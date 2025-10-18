import ResetPasswordComponent from "./ResetPasswordComponent";
import { verifyResetToken } from "@/actions/auth.actions";

export default async function ResetPasswordServerPage({ params }: { params: { token: string } }) {
  const result = await verifyResetToken(params.token);

  return <ResetPasswordComponent token={ params.token } tokenStatus={ result } />;
}
