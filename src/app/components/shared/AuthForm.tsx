"use client";

import { FormEvent, useRef, useState  } from 'react'
import { register, login } from "@/actions/auth-actions"
import SubmitButton from "./SubmitButton";
import ZodErrors from "./ZodErrors"
import { redirect } from 'next/navigation';

type Props = {
  btnText: string,
  headerText: string,
  type: string
}

type zodType = {
  email: string[] | undefined,
  password: string[] | undefined
}

export default function AuthForm({ btnText, headerText, type }: Props) {

  const [error, setError] = useState("");
  const [zodErrors, setZodErrors] = useState({} as zodType);
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (type === "login") {
      const res = await login(formData);
      if (res?.zodErrors) {
        const errors = {
          email: res.zodErrors.email,
          password: res.zodErrors.password
        }
        return setZodErrors(errors)
      } else {
        redirect("/");
      }
    } else {
      const res = await register(formData);
       if (res?.zodErrors) {
        const errors = {
          email: res.zodErrors.email,
          password: res.zodErrors.password
        }
        return setZodErrors(errors)
      } else {
        ref.current?.reset()
        redirect("/signin");
      }
    }
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          { headerText }
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} ref = {ref} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              <ZodErrors error={zodErrors?.email || error} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              <ZodErrors error={zodErrors?.password || error} />
            </div>
          </div>
          <div>
            <SubmitButton text={ btnText } />
          </div>
        </form>
      </div>
    </div>
  )
}
