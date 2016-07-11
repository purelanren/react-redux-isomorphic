switch (process.env.NODE_ENV) {
  case 'dev':
    module.exports = require('./webpack/dev')
    break;

  case 'prod':
    module.exports = require('./webpack/prod')
    break;

  default:
    module.exports = require('./webpack/dev')
    break
}
