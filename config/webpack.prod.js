const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const config = require('./webpack.base.js');

config.module.rules.push({
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    use: [
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ],
    fallback: 'style-loader',
    publicPath: '../../'
  }),
  exclude: /node_modules/
},{
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    use: [
      'css-loader',
      'postcss-loader'
    ],
    fallback: 'style-loader',
    publicPath: '../../'
  }),
  exclude: /node_modules/
});

config.plugins.push(
  new CleanWebpackPlugin(['build'], {
    verbose: true,
    root: paths.appROOT
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }),
  new webpack.LoaderOptionsPlugin({minimize: true}),
  new ExtractTextPlugin({
    filename: '[name]/css/style-[hash].css',
    allChunks: false,
    ignoreOrder: true
  }),
);

const appPages = paths.appPages
Object.keys(appPages).map(page => {
  const entry = appPages[page]
  const match = entry.match(/\/js\/(.*)\.js/)
  const pageName = match && match[1]

  config.plugins.push(new HtmlWebpackPlugin({
    filename: pageName + '.html',
    inject: true,
    template: path.resolve(paths.appViews, pageName + '.html'),
    chunks: [pageName, 'commons']
  }))
})


module.exports = config;
