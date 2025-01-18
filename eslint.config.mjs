import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      globals: {
        ...globals.browser,
        ...globals.node, // Add other globals if needed
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    extends: [
      'plugin:react/recommended',
    ],
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },
  {
    rules: {
      'no-console': 'warn',
      'jsx-a11y/anchor-is-valid': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
