module.exports = {
  devServer: {
    proxy: {
      '/api' :{
        // 匹配所有以‘/api’开头的请求路径
        target: process.env.VUE_APP_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
}