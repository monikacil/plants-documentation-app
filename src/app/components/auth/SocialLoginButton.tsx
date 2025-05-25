"use client";

import { signIn } from "next-auth/react";
import Button from "@/app/components/common/Button";
import { socialProviders } from "@/app/configs/auth/socialProviders.config.tsx";

export function SocialLoginButtons() {
  const handleLogin = async (provider: "google" | "facebook") => {
    await signIn(provider);
  };

  return (
    <div className="flex flex-col gap-2 w-full items-center justify-center">
      { socialProviders.map((provider) => (
        <Button
          key={ provider.id }
          type="button"
          onClick={ () => handleLogin(provider.id) }
          icon={ provider.icon }
          aria-label={ `Log in with ${ provider.label }` }
          className={ `flex items-center justify-center gap-2 py-1 px-2 rounded-3xl shadow transition ${ provider.className }` }
        >
          <span>{ provider.label }</span>
        </Button>
      )) }
    </div>
  );
}
