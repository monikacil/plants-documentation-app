import { AuthFormState } from "@/app/lib/zod/zodAuth.ts";

export function getFieldError<TField extends string>(
  state: AuthFormState,
  field: TField
): string[] | undefined {
  if (state && state.success !== true && state.error && field in state.error) {
    return state.error[ field ];
  }

  return undefined;
}
