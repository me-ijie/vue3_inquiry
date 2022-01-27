import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$clone = require('lodash/cloneDeep')
app.use(ElementPlus)
app.use(router)
app.mount('#app')


// const vm = new Vue({
//   render: h => h(APP)
// })
// vm.$mount('#app')