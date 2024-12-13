import Link from "next/link";
import { logout } from "@/app/actions/auth.actions";
import BasicButton from "../common/BasicButton";

export default async function DesktopNav( {isAuth}: {isAuth: boolean}) {

  return (
    <div className="flex gap-2 align-middle justify-end md:order-2">
      {!isAuth
        ? <>
          <BasicButton color="cyan">
            <Link href="/">Home</Link>
          </BasicButton>
          <BasicButton color="cyan">
            <Link href="/signup">Sign Up</Link>
          </BasicButton>
          <BasicButton color="cyan">
            <Link href="/signin">Login</Link>
          </BasicButton>
        </>
        :<>
          <BasicButton color="cyan">
            <Link href="/plants">Plants</Link>
          </BasicButton>
          <BasicButton onClick={ logout } color="cyan">
            Logout
          </BasicButton>
        </>
        }
      </div>
  );
}
