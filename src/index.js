import { esmTest } from "./shard";
const cjsTest = require('./util')
import './assets/styles/index.css'
import './assets/styles/index.less'
import './assets/iconfont/iconfont.css'
esmTest()
cjsTest()

// document.getElementById('btn').onclick = function() {
//   import(/*webpackChunkName: 'math' */"./js/math").then(() =>{
//     console.log(mul(3,3));
//   })
// }