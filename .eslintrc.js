module.exports = {
  plugins: ["flowtype", "react", "prettier"],
  extends: [
    "airbnb",
    "plugin:flowtype/recommended",
    "plugin:react/recommended",

    "prettier/recommended",
    "prettier/flowtype",
    "prettier/react"
  ],
  globals: {
    window: true
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        semi: false,
        trailingComma: "all"
      }
    ],
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/anchor-is-valid": "none"
  }
};
