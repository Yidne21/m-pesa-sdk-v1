require("dotenv").config({ path: "./.env.test" });

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
