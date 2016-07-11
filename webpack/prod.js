var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('../config')
var autoprefixer = require('autoprefixer')
var definePlugin = new webpack.DefinePlugin({
  __API__BASE__: JSON.stringify(config.api.base),
  __PRODUCTION__: true,
})

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, '../src/client')
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: config.static.base,
    chunkFilename: 'js/[name].js',
    filename: 'js/[name].js'
  },

  plugins: [
    definePlugin,
    new ExtractTextPlugin('css/[name].css'),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/template/index.html'),
      filename: 'template/index.html'
    })
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
