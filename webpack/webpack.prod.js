const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// PWA插件
const WorkboxPlugin = require('workbox-webpack-plugin');
const WeabpackComC = require('./webpack.common');

module.exports = merge(WeabpackComC, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 有import 则less文件 重新走postcss less -loader
              modules: true, // 开启css模块化打包
            },
          },
          'less-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpeg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
            outputPath: '/images/',
            limit: 5 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    // 抽离css
    new MiniCssExtractPlugin({
      filename: '[name]_css/[name].[contenthash:8].css',
      chunkFilename: '[name].chunk.css',
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  optimization: {
    // runtimeChunk: {
    //   name: 'runtime'
    // },
    // 压缩css
    minimizer: [new TerserWebpackPlugin({}), new OptimizeCssAssetsPlugin({})],

    // 分割代码块
    splitChunks: {
      chunks: 'all',
      /**
       * initial 入口 chunk，对于异步导入的文件不处理
          async 异步 chunk，只对异步导入的文件处理
          all 全部 chunk
       */

      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: 'vendor', // chunk 名称
          priority: 1, // 权限更高，优先抽离，重要！！！
          test: /node_modules/,
          minSize: 0, // 大小限制
          maxSize: 50000000000000,
          minChunks: 1, // 最少复用过几次
          maxAsyncRequests: 5,
        },

        // 公共的模块
        common: {
          name: 'common', // chunk 名称
          priority: 0, // 优先级
          minSize: 0, // 公共模块的大小限制
          minChunks: 2, // 公共模块最少复用过几次
          reuseExistingChunk: true,
        },

        // css Split
      },
    },
  },
});
