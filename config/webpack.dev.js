const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');
// 图片压缩：1.配置有问题
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
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
        use: [MiniCssExtractPlugin.loader, 'css-loader']
        // use: ['style-loader', 'css-loader']
      },
      {
        // loader: 'postcss-loader', // 解决样式兼容性问题-2.配置有问题
        // options: {
        //   postcssOptions: {
        //     plugins: [
        //       [
        //         'postcss-preset-env',
        //       ],
        //     ],
        //   },
        // },
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'less-loader'
        ]
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
        exclude: /(node_modules)/, //排除
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: 2,
            }
          },
          {
            loader: 'babel-loader',
            options: {
              // presets: ['@babel/preset-env'], // 智能预设
              cacheDirectory: true, // 开启缓存
              cacheCompression: false, // 关闭缓存压缩（为了提升缓存速度，不需要压缩）
              plugins: ['@babel/plugin-transform-runtime'], // 避免重复引用
            }
          }
        ]
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
    new ESLintPlugin(),
    // css打包至单独文件
    new MiniCssExtractPlugin({
      filename: 'static/css/index.css',
    }),
    // new ImageMinimizerPlugin({
    //   minimizerOptions: {
    //     plugins: [
    //       ["gifsicle", { interlaced: true }],
    //       ["jpegtran", { progressive: true }],
    //       ["optipng", { optimizationLevel: 5 }],
    //     ],
    //   },
    // })
  ],
  // 开发服务器：不会输出资源，在内存中编译打包的
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    // hot: true, // 是默认值 开启HMR(更新修改的)
  },
  // 模式
  mode: 'development',
  devtool: 'cheap-module-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all', // 对所有模块都分割,只针对node modules 文件分割
    }
  }
}