const webpack = require('webpack');
const paths = require('./paths');

const appPages = paths.appPages
const entries = {}
Object.keys(appPages).map(page => {
  const entry = appPages[page]
  const match = entry.match(/\/js\/(.*)\.js/)
  const pageName = match && match[1]
  entries[pageName] = entry
})

module.exports = {
  context: paths.appSrc,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@css': paths.appCSS,
      '@lib': paths.appLib
    },
  },
  entry: entries,
  output: {
    path: paths.appBuildPath,
    publicPath: '/',
    filename: '[name]/js/entry-[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: 'commons/images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use:
        [
          {
            loader: 'file-loader',
            options:
            {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['commons'],
      filename: 'commons/js/commons-[hash].js'
    }),
  ]
}
