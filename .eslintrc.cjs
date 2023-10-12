const RULES_STATE = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'testing-library', 'jest-dom'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': RULES_STATE.OFF,
  },
}
