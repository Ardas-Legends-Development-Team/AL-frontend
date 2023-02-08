/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript",
        "@vue/eslint-config-prettier",
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
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
