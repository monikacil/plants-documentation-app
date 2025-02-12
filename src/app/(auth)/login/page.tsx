import { login } from "@/actions/auth.actions";
import AuthForm from "@/components/AuthForm";

export default function Login() {
  return (
    <>
      <AuthForm btnText="Login" authAction={login} isLoginForm />
    </>
  );
}
