module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.eslint.json",
  },
  plugins: ["@typescript-eslint", "jest"],
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
  ],
  rules: {
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/no-var-requires": "off",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
  },
};
