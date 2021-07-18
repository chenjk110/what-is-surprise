export default {
  preset: 'ts-jest',
  testEnvironment: process.env.TEST_ENV ?? 'node',
  rootDir: './src',
  testPathIgnorePatterns: [
    "node_modules",
    "dist"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/test/setup.js"
  ]
}