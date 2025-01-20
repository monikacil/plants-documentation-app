import { register } from "@/app/actions/auth.actions";
import AuthForm from "@/app/components/user/AuthForm";

export default function SignUp() {
  return (
    <>
      <AuthForm btnText="Sign Up" authAction={ register } />
    </>
  )
}
