"use client";

import { useActionState, useState } from "react";
import SubmitButton from "./../common/SubmitButton";
import ZodErrors from "./../common/ZodErrors";
import { AuthFormState } from "@/app/lib/zod/zod-user"

interface Props {
  btnText: string,
  headerText: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authAction: (prevState: any, formData: FormData) => Promise<any>
}

export default function AuthForm({ btnText, headerText, authAction }: Props) {

  const [state, formAction, isPending] = useActionState(authAction, { errors: {} as AuthFormState })
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex max-w-144 m-auto flex-1 flex-col lg:my-48 px-6 py-8 lg:py-12 lg:px-8 rounded-md bg-primary-green-50/30 shadow-md shadow-primary-green-50/50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight">
          { headerText }
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={ formAction }>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm/6 font-medium">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              { !email ? <ZodErrors error={state?.errors.email} />: '' }
            </div>
          </div>

          <div  className="mb-3">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              { !password || password.length < 8 ? <ZodErrors error={state?.errors.password} />: '' }
            </div>
          </div>
          <div>
            <ZodErrors error={state?.errors.message} />
          </div>
          <div className="mt-8">
            <SubmitButton disabled={isPending} text={btnText} />
          </div>
        </form>
      </div>
    </div>
  )
}
