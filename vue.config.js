module.exports = {
  publicPath: "./",
  configureWebpack: {
    resolve:{
      extensions:[],
      alias:{
        'assets':'@/assets',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    }
  }
}