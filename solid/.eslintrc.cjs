module.exports = {
  env: {
    browser: true,
    es2021: true
  },

  plugins: ["solid", "prettier"],
  extends: ["eslint:recommended", "plugin:solid/recommended", "plugin:prettier/recommended"],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
  }
}
