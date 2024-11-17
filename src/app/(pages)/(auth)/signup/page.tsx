import { register } from "@/app/actions/authActions";
import AuthForm from "@/app/components/shared/AuthForm";

export default function SignUp() {
  return (
    <>
      <AuthForm btnText="Sign Up!" headerText="Create new account" authAction={register} />
    </>
  )
}