const webpack = require('webpack');
const path = require('path');
const address = require('address')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const paths = require('./paths');
const config = require('./webpack.base.js');


config.devServer = {
  historyApiFallback: true,
  overlay: true,
  // stats: 'errors-only',
  contentBase: paths.appSrc,
  inline: true,
  hot: true,
  publicPath: '/',
  host: address.ip() || '0.0.0.0'
};

config.module.rules.push({
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader',
    'postcss-loader',
    'sass-loader'
  ],
  exclude: /node_modules/
},{
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader',
    'postcss-loader'
  ],
  exclude: /node_modules/
},{
  test: /.jsx?$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [paths.appSrc],
  options: {
    formatter: require('eslint-friendly-formatter')
  }
});

const appPages = paths.appPages
Object.keys(appPages).map(page => {
  const entry = appPages[page]
  const match = entry.match(/\/src\/(.*)\/App\.js/)
  const pageName = match && match[1]
  config.plugins.push(new HtmlWebpackPlugin({
    filename: pageName + '.html',
    inject: true,
    template: path.resolve(paths.appSrc, pageName, 'index.html'),
    chunks: [pageName, 'commons']
  }))
})

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    exclude: ['vendor.js']
  }),
  new FriendlyErrorsPlugin()
);

module.exports = config;