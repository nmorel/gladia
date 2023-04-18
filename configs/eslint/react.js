const {join} = require('node:path')

module.exports = {
  root: true,
  extends: [
    join(__dirname, 'base.js'),
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  env: {
    browser: true,
    node: false,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
