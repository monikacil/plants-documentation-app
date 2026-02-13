"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useDebounce } from "use-debounce";
import { redirect } from "next/navigation";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { SocialButtons } from "@/app/components/auth/SocialButtons";
import { loginSchema } from "@/app/lib/zod/zodAuth";
import { toast } from "sonner"

export function LoginForm({ children }: { children?: React.ReactNode }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [debouncedForm] = useDebounce(form, 400);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [liveErrors, setLiveErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  // Mark field touched
  const markTouched = (field: "email" | "password") =>
    setTouched((t) => ({ ...t, [field]: true }));

  // Live validation AFTER blur
  useEffect(() => {
    const data = {
      email: touched.email ? debouncedForm.email || undefined : undefined,
      password: touched.password ? debouncedForm.password || undefined : undefined,
    };

    const result = loginSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setLiveErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
    } else {
      setLiveErrors({});
    }
  }, [debouncedForm, touched]);

  const handleChange = (field: "email" | "password", value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      toast.error("Invalid credentials");
      return;
    }

    redirect("/dashboard");
  };

  return (
    <form onSubmit={ handleSubmit } className="space-y-6">

      <div className="flex flex-col gap-4">

        <Input
          type="email"
          placeholder="Email"
          value={ form.email }
          errors={ touched.email ? liveErrors.email : undefined }
          showSuccess={
            touched.email &&
            !!form.email &&
            !liveErrors.email
          }
          onBlur={ () => markTouched("email") }
          onChange={ (v) => handleChange("email", v) }
        />

        <Input
          type="password"
          placeholder="Password"
          value={ form.password }
          errors={ touched.password ? liveErrors.password : undefined }
          showSuccess={
            touched.password &&
            !!form.password &&
            !liveErrors.password
          }
          onBlur={ () => markTouched("password") }
          onChange={ (v) => handleChange("password", v) }
        />

      </div>

      { children }

      <div className="flex flex-col gap-4">

        <Button type="submit" isLoading={ isLoading }>
          Login
        </Button>

        <SocialButtons />

      </div>

    </form>
  );
}
