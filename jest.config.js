module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // use "jsdom" for testing browser-like behavior
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // mocks for CSS imports
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
