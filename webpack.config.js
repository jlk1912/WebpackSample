var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
var isProd = process.env.NODE_ENV === 'production'; // true or false

let pathsToClean = [
  'dist',
];

module.exports = {
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
    }),
    new CleanWebpackPlugin(pathsToClean),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [ 'style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        { test: /\.js$/, 
          loader: 'babel-loader', 
          exclude: /node_modules/ },
        { test: /\.jsx$/,
          loader: 'babel-loader', 
          exclude: /node_modules/ },
        {
            test: /\.png$/,
            use: [
              {
                loader: 'file-loader',
              },
            ]
          },
        ]
    },
    devServer: {
      port: 9000,
      hot: true,
      open: true,
    },
  };