import { login } from "@/app/actions/authActions";
import AuthForm from "@/app/components/shared/AuthForm";
import Link from "next/link";

export default function SignIn() {
  return (
    <>
      <AuthForm btnText="Login" headerText="Login to your account" authAction={login} />
      <div className="mt-6 text-center text-sm">
        Do not have account yet?{' '}
        <Link className="underline" href="/signup">
          Register now!
        </Link>
      </div>
    </>
  )
}