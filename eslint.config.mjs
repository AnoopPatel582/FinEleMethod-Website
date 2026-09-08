import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  {
    ignores: [
      'dist/**',
      '.astro/**',
      '.tools/**',
      '.agents/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  {
    files: ['src/scripts/*.js'],
    languageOptions: {
      globals: {
        document: 'readonly',
        window: 'readonly',
        localStorage: 'readonly',
        HTMLSelectElement: 'readonly',
        HTMLElement: 'readonly',
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
];
