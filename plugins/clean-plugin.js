class cleanWebpackPlugin() {
  apply(compiler) {
    // 2.获取打包输出的目录
    const outputPath = compiler.options.output.path;
    const fs = compiler.outputFileSystem;
    // 1.注册钩子，在打包输出之前 emit
    compiler.hooks.emit.tap("cleanWebpackPlugin", (compilation) => {
      // 3.通过fs删除打包输出的目录下的所有文件
      this.removeFiles(fs, outputPath)
    })
  }
  removeFiles(fs, outputPath) {
    // 想删除打包输出目录下所有资源，先将目录下的资源删除，才能删除这个目录
    // 1.读取当前目录下所有资源
    const files = fs.readdirSync(filepath)
    //2.遍历一个个删除
    files.forEach(file => {
      // 2.1遍历所有文件，判断是文件夹还是文件
      const path = `${filepath}/${file}`;
      const fileStat = fs.statSync(path);
      if (fileStat.isDirectory()) {
        // 2.2是文件夹， 就得删除下面的文件，才能删除文件夹
        this.removeFiles(fs,path)
      } else {
        // 2.3是文件直接删除
        fs.unlinkSync(path)
      }
    });
  }
}
module.exports = cleanWebpackPlugin;