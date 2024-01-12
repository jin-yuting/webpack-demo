const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');
// css压缩
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: 'static/js/[name].js',
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
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 智能预设
            cacheDirectory: true, // 开启缓存
            cacheCompression: false, // 关闭缓存压缩（为了提升缓存速度，不需要压缩）
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  // 插件
  plugins: [
    // html自动引入js文件
    new HtmlWebpackPlugin({
      title: 'webpack-demo',
      template: './public/index.html' //保留原来html文本模版
    }),
    new ESLintPlugin({
      cache: true
    }),
    // css打包至单独文件
    new MiniCssExtractPlugin({
      filename: 'static/css/index.css',
    }),
    new CssMinimizerPlugin()
  ],
  // 模式
  mode: 'production',
  devtool: 'source-map'
}