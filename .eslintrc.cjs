// .eslintrc.cjs
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier + eslint-config-prettier
  ],
  rules: {
    'prettier/prettier': 'warn', // Show Prettier issues as warnings
    'react/react-in-jsx-scope': 'off', // Not needed with Vite/React 17+
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
