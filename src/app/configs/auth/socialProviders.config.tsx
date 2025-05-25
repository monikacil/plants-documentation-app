import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { ReactNode } from "react";

export type SocialProvider = {
  id: "google" | "facebook";
  label: string;
  icon: ReactNode;
  className: string;
};

export const socialProviders: SocialProvider[] = [
  {
    id: "google",
    label: "Log in with Google",
    icon: <FaGoogle />,
    className: "bg-white border border-gray-300 text-black hover:bg-gray-50",
  },
  {
    id: "facebook",
    label: "Log in with Facebook",
    icon: <FaFacebook />,
    className: "bg-[#1877F2] text-white hover:bg-[#145DBF]",
  },
];
