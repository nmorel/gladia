const {join} = require('node:path')

module.exports = {
  root: true,
  extends: [join(__dirname, 'base.js'), 'plugin:node/recommended'],
  env: {
    browser: false,
    node: true,
  },
}
