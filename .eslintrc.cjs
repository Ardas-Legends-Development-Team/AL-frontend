/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    "plugins": [
        "@typescript-eslint"
    ],
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript",
        "@vue/eslint-config-prettier",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-for-in-array": "off",
        "@typescript-eslint/no-throw-literal": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/no-confusing-void-expression": "off",
        "linebreak-style": "warn", // <----------
        "no-undef": "off",
        "no-duplicate-imports": "error",
        "no-unreachable": "error",
        "no-unused-vars": "warn",
        "camelcase": "warn",
        "default-case": "error",
        "default-param-last": "warn",
        "eqeqeq": "error",
        "new-cap": "error",
        "no-floating-decimal": "error",
        "no-invalid-this": "warn",
        "no-multi-spaces": "warn",
        "prefer-const": "error",


    },
};
