import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import api from './api/ajax.js'
import { ElMessage } from 'element-plus'

const app = createApp(App)

app.config.globalProperties.$clone = require('lodash/cloneDeep')
app.config.globalProperties.$api = api
app.config.globalProperties.$message = {
  success: (msg) => ElMessage({
      message: msg,
      type: 'success'
    }),
  error: (msg) => ElMessage.error(msg)
}
app.use(ElementPlus)
app.use(router)
app.mount('#app')


// const vm = new Vue({
//   render: h => h(APP)
// })
// vm.$mount('#app')