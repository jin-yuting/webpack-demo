// 清除log
module.exports = function(content) {
  return content.replace(/console\.log(.*\);?/g, "");
}