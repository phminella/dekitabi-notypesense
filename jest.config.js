module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@googlemaps/typescript-guards)/)",
  ],
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/components/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy", // your existing CSS handling
    "^react-dates/lib/css/_datepicker.css$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/$1", // map @ to project root
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
