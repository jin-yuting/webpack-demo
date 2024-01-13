const loaderUtils = require("loader-utils")
module.exports = function(content) {
  const interpolateName = loaderUtils.interpolateName(
    this,
    "[hash].[ext].[query]",
    {options}
  )
  // 将文件输出出去
  this.emitFile(interpolateName, content)
  return `module.exports = "${interpolateName}"`
}
module.exports.raw = true;