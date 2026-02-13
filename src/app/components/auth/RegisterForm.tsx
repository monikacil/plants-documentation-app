"use client";

import { useActionState, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { createUser } from "@/actions/auth.actions";
import { registerSchema } from "@/app/lib/zod/zodAuth";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { SocialButtons } from "./SocialButtons";
import Form from "next/form";
import { toast } from "sonner";

type FormShape = {
  name: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  // form values
  const [form, setForm] = useState<FormShape>({
    name: "",
    email: "",
    password: "",
  });

  // debounce
  const [debouncedForm] = useDebounce(form, 400);

  // touched
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  // client Zod (for success icon)
  const [liveErrors, setLiveErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  // server errors (cleared on change)
  const [serverErrors, setServerErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const [state, submitForm, isPending] =
    useActionState(createUser, undefined);

  // mark touched
  const markTouched = (field: keyof FormShape) =>
    setTouched((t) => ({ ...t, [field]: true }));

  // live Zod after blur
  useEffect(() => {
    const data = {
      name: touched.name ? debouncedForm.name || undefined : undefined,
      email: touched.email ? debouncedForm.email || undefined : undefined,
      password: touched.password ? debouncedForm.password || undefined : undefined,
    };

    const result = registerSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setLiveErrors({
        name: errors.name?.[0],
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
    } else {
      setLiveErrors({});
    }
  }, [debouncedForm, touched]);

  // server response
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Account created, check your email to confirm!");
      setForm({ name: "", email: "", password: "" });
      setServerErrors({});
      setTouched({ name: false, email: false, password: false });
      return;
    }

    toast.error(state.errorMessage ?? "Registration failed");

    if (state.error) {
      setServerErrors({
        name: state.error.name?.[0],
        email: state.error.email?.[0],
        password: state.error.password?.[0],
      });
    }
  }, [state]);


  // change handler
  const handleChange = (
    field: keyof FormShape,
    value: string
  ) => {
    setForm((f) => ({ ...f, [field]: value }));

    // clear server error for edited field
    setServerErrors((e) => ({
      ...e,
      [field]: undefined,
    }));
  };

  return (
    <Form action={ submitForm } className="space-y-6">

      <div className="flex flex-col gap-4">

        <Input
          name="name"
          placeholder="Name"
          value={ form.name }
          errors={ serverErrors.name }
          showSuccess={
            touched.name &&
            !!form.name &&
            !liveErrors.name &&
            !serverErrors.name
          }
          onBlur={ () => markTouched("name") }
          onChange={ (v) => handleChange("name", v) }
        />

        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={ form.email }
          errors={ serverErrors.email }
          showSuccess={
            touched.email &&
            !!form.email &&
            !liveErrors.email &&
            !serverErrors.email
          }
          onBlur={ () => markTouched("email") }
          onChange={ (v) => handleChange("email", v) }
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={ form.password }
          errors={ serverErrors.password }
          showSuccess={
            touched.password &&
            !!form.password &&
            !liveErrors.password &&
            !serverErrors.password
          }
          onBlur={ () => markTouched("password") }
          onChange={ (v) => handleChange("password", v) }
        />

      </div>

      <div className="flex flex-col gap-4">

        <Button type="submit" isLoading={ isPending }>
          Register
        </Button>

        <SocialButtons />

      </div>

    </Form>
  );
}
