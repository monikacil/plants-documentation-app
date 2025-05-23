import { CredentialsSignin } from "next-auth";

export class CredentialsError extends CredentialsSignin {
  message = "Invalid credentials. Please try again.";
}

export class NoUserError extends CredentialsSignin {
  message = "No user found with this email. Please register first or try again with a different email address.";
}

export class UserNotConfirmed extends CredentialsSignin {
  message = "User not confirmed. Please check your email and confirm your account.";
}
