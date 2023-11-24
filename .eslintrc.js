module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@whoj'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    'vue/no-template-shadow': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ]
    }
  ]
};
