const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: './dist',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      // 匹配要处理的文件类型，一般是正则表达式
      test: /\.css$/,
      // 要使用的loader
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-demo',
      template: './public/index.html'
    }),
    // css打包至单独文件
    new MiniCssExtractPlugin({
      filename: 'index.css'
    })
  ]
}