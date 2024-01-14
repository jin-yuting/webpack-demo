/*
1.webpack加载webpack.config.js中所有配置，此时就会new TestPlugin(),执行插件的constructor
2.webpack创建compiler对象
3.遍历所有plugins中插件，调用插件的apply方法
4.执行剩下编译流程（触发各个hooks事件）
*/ 
class TestPlugin() {
  constructor(){
    console.log('constructor');
  }
  apply(compiler) {
    console.log('apply');
    // 由文档可知，environment是同步钩子，所以需要tap注册
    compiler.hooks.environment.tap("TestPlugin", ()=>{
      console.log("environment");
    })
    // emit 是异步串行钩子
    compiler.hooks.emit.tap("TestPlugin", (compilation)=>{
      console.log("emit 111");
    })

    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback)=>{
      setTimeout(()=>{
        console.log("emit 222");
        callback()
      }, 2000)
    })
    compiler.hooks.emit.tapPromise("TestPlugin", (compilation)=>{
      return new Promise((res)=>{
        setTimeout(()=>{
          console.log("emit 33");
          res()
        }, 2000)
      })
    })

    // make是异步并行钩子
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback)=>{
      setTimeout(()=>{
        console.log("make 111");
        callback()
      }, 2000)
    })
  }
}

module.exports = TestPlugin;