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
  collectCoverage: true,
  collectCoverageFrom: ["components/**/*.tsx", "app/**/*.ts", "pages/*"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageProvider: "v8",

  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    'next-auth/(.*)': '<rootDir>/node_modules/next-auth/$1'
  },

  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["tests/e2e"],
};

export default createJestConfig(config);
