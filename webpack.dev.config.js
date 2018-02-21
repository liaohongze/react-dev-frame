const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const ROOT_PATH = resolve(__dirname)
const APP_PATH = resolve(ROOT_PATH, 'app')
const BUILD_PATH = resolve(ROOT_PATH, 'dist')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      resolve(APP_PATH, 'index.js')
    ]
  },
  output: {
    filename: '[name]-[hash].js',
    path: BUILD_PATH,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: APP_PATH,
        loader: 'eslint-loader',
        options: {
          failOnWarning: true,
          failOnError: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: APP_PATH,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: APP_PATH,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true }
          }
        ]
      },
      {
        test: /\.(scss)$/,
        include: APP_PATH,
        use: [
          'style-loader',
          'css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer'),
                  require('cssnano')
                ]
              }
            }
          }, 'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        include: [APP_PATH],
        loader: 'url-loader?limit=8192&name=img/[name].[hash].[ext]'
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        exclude: /node_modules/,
        include: [APP_PATH],
        loader: 'url-loader?prefix=font/&limit=8192&name=font/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),
    new StyleLintPlugin({
      quiet: true
    }),
    new HtmlWebpackPlugin({
      title: 'react-dev-frame',
      keywords: 'react-dev-frame',
      description: 'react-dev-frame',
      favicon: resolve(APP_PATH, 'assets/favicon.ico'),
      template: resolve(APP_PATH, 'index.tpl.html')
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:3000'
    })
  ]
}