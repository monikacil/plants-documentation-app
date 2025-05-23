import type { AuthFormState } from "@/app/lib/zod/zodAuth";

type Params =
  | { success: true; status?: string }
  | {
  success?: false
  error?: Record<string, string[]>
  errorMessage?: string
  status?: string
}

export function createFormResponse(params: Params): AuthFormState {
  if (params.success) {
    return { success: true };
  }

  return {
    success: false,
    error: params.error,
    errorMessage: params.errorMessage,
    status: params.status ?? "invalid",
  };
}
