class BannerWebpackPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler){
    compiler.hooks.emit.tapAsync("BannerWebpackPlugin", (compilation,callback) => {
      const extensions = ["css","js"];
      // 1.获取即将输出的资源文件，compilation.assets
      // 2.过滤只保留js 和 css 资源
      const assets = Object.keys(compilation.assets).filter((assetPath) => {
        const splited = assetPath.split('.')
        const extension = splited[splited.length -1]
        return extensions.includes(extension)
      })
      const prefix = `
      /*
      *Author: ${options.author}
      */`
      // 3.遍历剩下资源添加上注释 
      assets.forEach((asset) => {
        const source = compilation.assets[asset].source()
        const content = prefix + source;

        compilation.assets[asset] = {
          source() {
            return content;
          },
          size() {
            return content.length
          }
        }
      })
      callback()
    })
  }
}
module.exports = BannerWebpackPlugin;