module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    "indent": [
        "warn",
        2 
    ],
    "linebreak-style": [
        "warn",
        "unix"
    ],
    "quotes": [
        "warn",
        "single"
    ],
    "react/react-in-jsx-scope": "off",
    "semi": [
        "warn",
        "always"
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
