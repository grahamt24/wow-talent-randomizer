import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  setupFilesAfterEnv: ["./setupTests.ts"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg)$": "jest-transform-stub",
  },
};

export default config;
