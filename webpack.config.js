const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: './dist',
    path: path.resolve(__dirname, 'dist')
  }
}