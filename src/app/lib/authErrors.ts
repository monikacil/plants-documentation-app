import { CredentialsSignin } from "next-auth";

export class CredentialsError extends CredentialsSignin {
  message = "Invalid credentials. Please try again.";
}

export class UserNotConfirmed extends CredentialsSignin {
  message = "User not confirmed. Please check your email and confirm your account.";
}
