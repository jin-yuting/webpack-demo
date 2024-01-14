// 输出作者信息
// 缺点：只能在开发环境下运行
const schema = require("./schema.json")
module.exports = function(content) {
  // schema 对options 验证规则
  const options = this.getOptions(schema)
  const prefix = `
  /*
  *Author: ${options.author}
  */`
  return prefix + content;
}