module.exports = {
  root: true,

  env: {
    node: true,
    jest: true
  },

  extends: ["plugin:vue/recommended"],

  parserOptions: {
    parser: "babel-eslint" // Support dynamic import
  },

  ignorePatterns: ["dist/"],

  rules: {
    "no-undef": ["error"],
    "vue/match-component-file-name": [
      "error",
      {
        extensions: ["js", "vue"],
        shouldMatchCase: false
      }
    ],
  }
};
