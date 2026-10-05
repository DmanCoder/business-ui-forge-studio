// eslint.config.mjs
// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

export default tseslint.config(
  // Base JS rules
  eslint.configs.recommended,

  // TypeScript recommended rules (parser + plugin wired up)
  tseslint.configs.recommended,

  // Next.js "core web vitals" (flat config, eslint-config-next >= 16)
  ...nextCoreWebVitals,

  // Your project-specific rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        React: 'readonly',
        gsap: 'readonly',
      },
    },
    rules: {
      'no-console': 'error',
      'no-debugger': 'error',
      'no-undef': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'jsx-a11y/alt-text': 'error',
      'react/no-children-prop': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-empty-pattern': 'off',
      'no-case-declarations': 'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // Ignores (replaces deprecated .eslintignore)
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'public/**', 'new-design/**'],
  }
);
