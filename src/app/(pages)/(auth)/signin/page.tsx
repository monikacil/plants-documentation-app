import { login } from "@/app/actions/auth.actions";
import AuthForm from "@/app/components/user/AuthForm";

export default function SignIn() {
  return (
    <>
      <AuthForm btnText="Login" headerText="Login to your account" authAction={login} />
    </>
  )
}