module.exports = {
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/vue3-recommended",
    "plugin:vue/base",
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    "vue/no-unused-vars": "error",
    quotes: ["warn", "double"],
  },
};
