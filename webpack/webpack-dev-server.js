// webpack
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('../config')
var webpackConfig = require('./dev')

// live
var server = new WebpackDevServer(webpack(webpackConfig), {
  hot: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
})

server.listen(config.static.port, config.static.host, (err) => {
  if (err) {
    console.log(err)
  }
})
