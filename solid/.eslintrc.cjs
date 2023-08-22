'use strict';

module.exports = {
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    requireConfigFile: false,
  },
  parser: "@babel/eslint-parser",

  plugins: ["prettier", "solid"],
  extends: ["eslint:recommended", "plugin:prettier/recommended", "plugin:solid/recommended"],
  rules: {
    "prettier/prettier": "error",
  },
  env: { browser: true },
  rules: {},
  overrides: [
    {
      files: [
        "./.eslintrc.js",
        "./.prettierrc.js",
        "./.stylelintrc.js",
      ],
      parserOptions: { sourceType: "script" },
      env: { browser: false, node: true },
      extends: ["plugin:n/recommended"],
    },
  ],
};
