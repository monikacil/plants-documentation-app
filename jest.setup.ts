/* eslint-disable no-console */
import "@testing-library/jest-dom";
import { afterAll, beforeAll, jest } from "@jest/globals";

const originalConsoleError = console.error;

beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const first = args[0];
    if (typeof first === "string" && first.startsWith("Warning:")) {
      return;
    }
    originalConsoleError(...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
});

declare global {
  interface Window {
    matchMedia: (query: string) => MediaQueryList;
  }
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string): MediaQueryList => {
    const mql: MediaQueryList = {
      media: query,
      matches: false,
      onchange: null,
      addListener: (() => {
      }) as MediaQueryList["addListener"],
      removeListener: (() => {
      }) as MediaQueryList["removeListener"],
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn().mockReturnValue(true),
    } as unknown as MediaQueryList;

    return mql;
  },
});
