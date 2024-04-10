const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/index.js`,

  mode: "development",

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "bundle.js"
  },

  devServer: {
    static: "dist",
    open: true
  },

  plugins: [
    new webpack.DefinePlugin({
      'USER_POOL_ID': JSON.stringify(env.USER_POOL_ID || ""),
      'CLIENT_ID': JSON.stringify(env.CLIENT_ID || ""),
    }),
  ]
};