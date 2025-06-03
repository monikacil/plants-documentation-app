import { FaBug, FaLeaf, FaMoneyBillWave, FaSeedling } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

export const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: <FaLeaf/> },
  { label: "Plants collections", href: "/plants", icon: <FaSeedling/> },
  { label: "Expenses", href: "/expenses", icon: <FaMoneyBillWave/> },
  { label: "Plant Protection", href: "/plant-protection", icon: <FaBug/> },
  { label: "Profile", href: "/user-profile", icon: <FaCircleUser/> },
] as const;
