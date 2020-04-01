module.exports = {
  configureWebpack: {
    resolve:{
      extensions:[],
      alias:{
        'assets':'@/assets',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    },
    // devServer: {
    //   proxy: {
    //     '/picture': {
    //       target: 'http://127.0.0.1:8888/api/private/v1', //对应自己的接口
    //       changeOrigin: true,
    //       ws: true,
    //       pathRewrite: {
    //         '^/picture': ''
    //       }
    //     }
    //   }
    // }
  }
}