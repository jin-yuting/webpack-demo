// loader 就是一个函数，当webpack解析资源时，会调用相应的loader去处理
// loader接受到文件内容作为参数，返回内容出去
// content 文件内容，map SourceMap; meta 别的loader传递的数据

// 同步 loader 写法1
module.exports = function(content) {
  console.log(content);
  return content;
}
// 写法2
module.exports = function(content) {
  this.callback(null,content, map, meta);
}

/*
异步 loader
*/ 
module.exports = function(content, map, meta) {
  const callback = this.async();
  setTimeout(() =>{
    callback(null, content, map, meta)
  }, 1000)
}

/*
raw loader
接受到content 是buffer数据，（图片,字体 数据）
*/ 
module.exports = function(content) {
  return content
}
module.exports.raw = true;

/*
pitch loader
作用：加载多个loader
*/ 
module.exports = function(content) {
  return content
}
module.exports.pitch = function() {
  console.log('pitch2');
  // 如果有return 后面会终止
  return '111';
};