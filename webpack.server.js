var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./config')
var autoprefixer = require('autoprefixer')

var definePlugin = new webpack.DefinePlugin({
  __API__BASE__: JSON.stringify(config.api.base),
  __PRODUCTION__: process.env.NODE_ENV === 'prod',
  __ISOMORPHIC__: !!process.env.ISOMORPHIC
})
var nodeModules = {}
fs.readdirSync('node_modules').filter(function (x) {
  return ['.bin'].indexOf(x) === -1
}).forEach(function (mod) {
  nodeModules[mod] = 'commonjs ' + mod
})

module.exports = {

  target: 'node',

  entry: {
    bundle: path.resolve(__dirname, './src/web/server.js')
  },

  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: config.static.base,
    chunkFilename: 'js/[name].js',
    filename: 'server.js'
  },

  plugins: [
    definePlugin,
    new ExtractTextPlugin('css/[name].css')
  ],

  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'url?limit=8192&name=img/[name].[ext]',
        exclude: /node_modules/
      }
    ]
  },

  postcss () {
    return {
      defaults: [autoprefixer]
    }
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  externals: nodeModules,

  node: {
    __dirname: true
  }
}
