const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'static/images/[hash:10][ext][query]',
    // 自动清空上次打包的内容
    clean: true,
  },
  // 加载器
  module: {
    rules: [
      {
        // 匹配要处理的文件类型，一般是正则表达式
        test: /\.css$/,
        // 要使用的loader
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i, // 图片资源处理
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|woff2?)$/i, // 图标资源处理
        type: 'asset/resource',
        generator: {
          filename: 'static/iconfont/[hash:10][ext][query]'
        }
      },
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-demo',
      template: './public/index.html'
    }),
    new ESLintPlugin(),
    // css打包至单独文件
    // new MiniCssExtractPlugin({
    //   filename: 'index.css'
    // })
  ],
  // 模式
  mode: 'development'
}