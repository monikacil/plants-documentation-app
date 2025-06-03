import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { ReactNode } from "react";

export type SocialProvider = {
  id: "google" | "facebook";
  label: string;
  icon: ReactNode;
};

export const socialProviders: SocialProvider[] = [
  {
    id: "google",
    label: "Log in with Google",
    icon: <FaGoogle/>,
  },
  {
    id: "facebook",
    label: "Log in with Facebook",
    icon: <FaFacebook/>,
  },
];
