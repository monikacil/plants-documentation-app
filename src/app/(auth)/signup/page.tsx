import { register } from "@/actions/auth.actions";
import AuthForm from "@/components/AuthForm";

export default function SignUp() {
  return (
    <>
      <AuthForm btnText="Sign Up" authAction={register} />
    </>
  );
}
