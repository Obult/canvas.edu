/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
  ],
  // Custom rules
  rules: {
    // The big ones
    'indent': ['warn', 2],            // 2 spaces for indentation
    'quotes': ['warn', 'single'],     // single quotes
    'semi': ['warn', 'always'],       // semicolons at the end of statements

    // Whitespace / newline rules
    'no-trailing-spaces': ['warn', { skipBlankLines: true }],
    'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
    'no-multi-spaces': ['warn', { ignoreEOLComments: true }],
    'no-irregular-whitespace': ['warn', { skipStrings: true, skipComments: true, skipRegExps: true, skipTemplates: true }],
  
    // Other rules
    'eqeqeq': ['warn', 'smart'],      // use === and !== instead of == and != (smart: allow == null)
    'prefer-const': ['warn'],         // prefer const over let
    'no-empty': ['warn'],             // disallow empty blocks
    'no-cond-assign': ['warn'],       // disallow assignment in conditional expressions
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
