module.exports = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json"
      }
    ],
  },
};