import { login } from "@/app/actions/auth.actions";
import AuthForm from "@/app/components/user/AuthForm";

export default function Login() {
  return (
    <>
      <AuthForm
        btnText='Login'
        authAction={login}
        isLoginForm
      />
    </>
  );
}
