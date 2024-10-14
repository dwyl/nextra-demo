/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  setupFiles: ["./jest.polyfills.js"],

  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "scripts/*.{mjs,js,jsx,ts,tsx}", "!<rootDir>/node_modules/", "!src/generatePrivateRoutes.ts"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageProvider: "v8",

  moduleDirectories: ["node_modules"],
  modulePathIgnorePatterns: [
    // Testing auth with `next-auth` complains (consider switching to Vitest)
    // Doesn't seem to have a proper solution. See https://github.com/nextauthjs/next-auth/issues/4198.
    "src/auth.ts",
    "src/generatePrivateRoutes.ts",

    // Middleware can't be properly mocked to test.
    "src/middleware.ts",

    // No need to unit test types
    "src/types.ts",

    // The "_app.ts" runs on every page and can't be properly tested. There's no need to, regardless.
    "src/pages/_app.ts",

    // The `app` folder is only used to export the default handlers from `next-auth`.
    "src/app",
  ],
  moduleNameMapper: {
    "next-auth/(.*)": "<rootDir>/node_modules/next-auth/$1",
    "^uuid$": require.resolve("uuid"), // See https://github.com/uuidjs/uuid/issues/451#issuecomment-1377066303.
  },

  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["tests/e2e", "tests/unit/link-check.test.ts"],
};

export default createJestConfig(config);
