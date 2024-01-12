import { esmTest } from "./shard";
const cjsTest = require('./util')
// import './js/math'
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


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}