import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^next-auth/react$": "<rootDir>/src/__mocks__/next-auth-react.ts",
    "^next-auth$": "<rootDir>/src/__mocks__/next-auth.ts",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!next-auth)/"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/dist/"
  ],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", {
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: true,
          decorators: true
        },
        transform: {
          react: {
            runtime: "automatic"
          }
        }
      }
    }]
  }
};

export default createJestConfig(config);