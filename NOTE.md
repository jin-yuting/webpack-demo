# 初始化创建
1.创建文件，安装依赖（webpack webpack-cli）
2.添加文件，编写配置文件
3.打包命令：npm run build

# 核心概念
1.entry 入口
2.output 输出
3.loader (加载器) - webpack本身只能处理js,json等资源，其它资源需要借助loader
4.plugins 插件
5.mode 模式
  development
  production

# 高级
1.可是使用oneof 提升性能，但是较少使用
2.thread-loader 多进程
3.tree-shaking 生成环境自动开启
4.core-js
5.PWA 断网也正常访问: WorkboxPlugin

# 其它
1.图片转base64 （就是字符串）可以减少图片的请求数量，缺点是体积会变大，一般小图转base64，大图不转
2.preload/prefetch 可查找npm插件，浏览器兼容性问题比较大
  preload 立即加载资源，优先级高
  prefetch 空闲时加载资源，优先级低

