import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    ...tseslint.configs.recommended,
  },
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: {
      globals: globals.browser,
    },
    ...pluginJs.configs.recommended,
  },
  {
    rules: {
      "no-console": "warn",
      "react/jsx-uses-react": "error",
      "jsx-a11y/anchor-is-valid": "off",
      "react/jsx-props-no-spreading": "off"
    },
  }
];



