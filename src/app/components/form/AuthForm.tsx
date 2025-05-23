"use client";

import { useActionState, useEffect, useState } from "react";
import Form from "next/form";

import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { authOrSignIn } from "@/app/actions/auth.ts";

import Input from "../form/Input";
import Button from "../common/Button";
import { SocialLoginButtons } from "@/app/components/form/SocialLoginButton.tsx";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction, isPending] = useActionState(authOrSignIn, undefined);

  useEffect(() => {
    if (state && "success" in state) {
      setMode("login");
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [state]);
  
  return (
    <Form action={ formAction } className="max-w-md m-auto text-center">
      <div className="flex flex-col gap-2 mb-2">
        { mode === "register" && (
          <Input
            name="name"
            placeholder="Name"
            value={ name }
            onChange={ (value) => {
              setName(value);
            } }
          />
        ) }
        <Input
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ (value) => {
            setEmail(value);
          } }
        />
        <Input
          name="password"
          placeholder="Password"
          value={ password }
          onChange={ (value) => {
            setPassword(value);
          } }
        />
      </div>
      { state?.error && (
        <Alert
          color="failure"
          icon={ HiInformationCircle }
        >
          <span className="font-medium">{ state?.error }</span>
        </Alert>
      ) }
      { state && "success" in state && (
        <Alert
          color="success"
          icon={ HiInformationCircle }
        >
          <span className="font-medium">Account created, check your email to confirm!</span>
        </Alert>
      ) }

      <div className="text-sm">
        { mode === "login" ? "Don't have an account?" : "Already have an account?" } &nbsp;
        <span className="font-semibold cursor-pointer text-base-green-600 underline underline-offset-4"
              onClick={ () => setMode(mode === "login" ? "register" : "login") }>
              { mode === "login" ? "Sign up" : "Log in" }
        </span>
      </div>
      <input type="hidden" name="mode" value={ mode }/>
      <div className="flex flex-col items-center gap-2 mt-5">
        <Button type="submit" disabled={ isPending } className="mb-3">
          { mode === "login" ? "Login" : "Register" }
        </Button>
        <SocialLoginButtons/>
      </div>
    </Form>
  );
}
