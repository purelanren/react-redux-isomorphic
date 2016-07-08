var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('../config')
var autoprefixer = require('autoprefixer')
var definePlugin = new webpack.DefinePlugin({
  __API__BASE__: JSON.stringify(config.api.base),
  __PRODUCTION__: false,
})

module.exports = {

  devtool: ['source-map'],

  entry: {
    bundle: [
      'webpack-dev-server/client?' + config.static.base,
      'webpack/hot/dev-server',
      path.resolve(__dirname, '../src/client')
    ]
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: config.static.base,
    chunkFilename: 'js/[name].js',
    filename: 'js/[name].js'
  },

  plugins: [
    definePlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/template/index.html')
    })
  ],

  module: {
    loaders: [
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'postcss', 'less']
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loaders: ['url?limit=8192&name=img/[name].[ext]'],
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
  }
}
