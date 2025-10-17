"use client";

import { Button } from "@/app/components/ui/Button";
import { cn } from "@/app/lib/utils/others";
import { signIn } from "next-auth/react";
import { socialProviders } from "@/app/configs/auth/socialProviders.config.tsx";

interface SocialButtonsProps {
  isLoading?: boolean;
  className?: string;
}

export function SocialButtons({
                                isLoading = false,
                                className,
                              }: SocialButtonsProps) {
  const handleLogin = async (provider: "google" | "facebook") => {
    await signIn(provider);
  };
  return (
    <div className={ cn("flex flex-col gap-3 w-full", className) }>
      { socialProviders.map((provider) => (
        <Button
          key={ provider.id }
          type="button"
          variant={ provider.id }
          onClick={ () => handleLogin(provider.id) }
          isLoading={ isLoading }
          icon={ provider.icon }
          aria-label={ `Log in with ${ provider.label }` }
        >
          <span>{ provider.label }</span>
        </Button>
      )) }
    </div>
  );
}
