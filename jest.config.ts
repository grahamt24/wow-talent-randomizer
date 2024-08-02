import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "ts-jest-mock-import-meta",
              options: {
                metaObjectReplacement: {
                  url: "https://www.url.com",
                  env: {
                    BLIZZ_USERNAME: "username",
                    BLIZZ_PASSWORD: "password",
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  setupFilesAfterEnv: ["./setupTests.ts"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg)$": "jest-transform-stub",
  },
};

export default config;
