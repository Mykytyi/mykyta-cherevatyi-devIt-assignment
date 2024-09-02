import globals from 'globals';
import pluginJs from '@eslint/js';
import ts from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    rules: {
      'no-unused-vars': 'warn',
      'space-unary-ops': 'error',
      'prefer-const': 'error'
    }
  },
  {
    ignores: ['dist/*']
  },
  pluginJs.configs.recommended,
  ...ts.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended
];
