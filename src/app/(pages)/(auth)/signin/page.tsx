import { login } from "@/app/actions/authActions";
import AuthForm from "@/app/components/shared/AuthForm";

export default function SignIn() {
  return (
    <>
      <AuthForm btnText="Login" headerText="Login to your account" authAction={login} />
    </>
  )
}