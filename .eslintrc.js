module.exports = {  
  extends: ["eslint:recommended"],  
  parserOptions: {  
    "ecmaVersion": 6,  
    "sourceType": "module"  // es module
  },  
  env: {  
    "browser": true,  //浏览器全局变量
    "node": true,  
    "es6": true  
  },  
  rules: {  
    "max-len": ["error", {"code": 66}],  
    "no-undef": "off"  
  }  
}