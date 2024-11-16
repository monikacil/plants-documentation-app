import { register } from "@/app/actions/authActions";
import AuthForm from "@/app/components/shared/AuthForm";
import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <AuthForm btnText="Sign Up!" headerText="Create new account" authAction={register} />
      <div className="mt-6 text-center text-sm">
        Already have an account?{' '}
        <Link className="underline" href="/signin">
          Sign In!
        </Link>
      </div>
    </>
  )
}