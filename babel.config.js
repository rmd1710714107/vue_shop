// if(process.env.NODE_ENV==="production"){
//   发布产品时执行这里的代码
// }else if(process.env.NODE_ENV==="development"){
//   开发产品时执行这里的代码
// }
module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}