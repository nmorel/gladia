module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['**/dist/**/*', '**/.cache/**/*', '**/build/**/*'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-unused-vars': ['error', {ignoreRestSiblings: true}],
  },
  overrides: [
    {
      files: ['*.js'],
      extends: ['plugin:node/recommended'],
      env: {
        browser: false,
        node: true,
      },
      parserOptions: {
        allowImportExportEverywhere: true,
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      rules: {
        'node/no-unpublished-require': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
