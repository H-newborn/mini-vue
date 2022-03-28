// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetWebpackPlugin = require('add-asset-html-webpack-plugin');

const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    other: './other/other.js',
  },
  // 路径配置
  resolve: {
    // 文件结尾的查找配置
    extensions: ['.js', '.jsx'],
    // 路径只写了/的情况下 先默认找index,再找child
    mainFiles: ['index', 'child'],
    // 别名配置, 使用delllee代替绝对路径
    alias: {
      delllee: path.resolve(__dirname, '../src/child'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          // 改变this指向
          // 'imports-loader?this=>window'
          // 'eslint-loader',
        ],
        exclude: /node_modules/,
        // options: {
        //   // 业务代码
        //   presets: [["@babel/preset-env", {
        //     targets: {
        //       chrome: "67"
        //     },
        //     useBuiltIns: 'usage'
        //   }]]

        //   // 库代码 防止污染全局环境
        //   // "plugins": [
        //   //   [
        //   //     "@babel/plugin-transform-runtime",
        //   //     {
        //   //       "absoluteRuntime": false,
        //   //       "corejs": false,
        //   //       "helpers": true,
        //   //       "regenerator": true,
        //   //       "version": "7.0.0-beta.0"
        //   //     }
        //   //   ]
        //   // ]
        // }
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'index.html'),
      filename: 'index.html',
      chunks: ['index', 'common'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'other.html'),
      filename: 'other.html',
      chunks: ['other', 'vender', 'common'],
    }),
    new AddAssetWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll/lodash.dll.js'),
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll/lodash.manifest.json'),
    }),
    // 第三方模块使用，可以解决import问题
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash',
      _join: ['lodash', 'join'],
    }),
  ],
  // 库打包 打包的时候不要打入这个代码
  // external: ['lodash'],
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, '..', 'dist'),
    clean: true,
    // 库打包
    // library: 'library',
    // library: 'root'
    // libraryTarget: 'umd'
  },
  optimization: {
    usedExports: true,
  },
};
