var dev = require('./dev')
var prod = require('./prod')

var config = {}

switch (process.env.NODE_ENV) {
  case 'dev':
    config = dev
    break

  case 'prod':
    config = prod
    break

  default:
    config = dev
    break
}

module.exports = config
