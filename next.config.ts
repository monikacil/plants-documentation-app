import withPWA from "next-pwa";
import pwaConfig from "./next-pwa.config";

const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  ...pwaConfig,
})(nextConfig);
