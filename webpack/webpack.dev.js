const { merge } = require('webpack-merge');
const webpack = require('webpack');

const path = require('path');
const WeabpackComC = require('./webpack.common');

module.exports = merge(WeabpackComC, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.jpeg|png|gif$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 8081,
    // progress: true,  // 显示打包的进度条
    // contentBase: path.join(__dirname, '..', 'dist'),  // 根目录
    open: true, // 自动打开浏览器
    compress: true, // 启动 gzip 压缩
    hot: true,
    // hotOnly: true,
    // overlay: true,

    // 单页面应用
    // historyApiFallback: true,

    // // 设置代理
    proxy: {
      // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
      // '/api': 'http://localhost:3000',

      // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      // '/api2': {
      //     target: 'http://localhost:3000',
      //     pathRewrite: {
      //         'head.json': 'demo.json'
      //     }
      // }
    },
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ],
});
