import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.config.globalProperties.$clone = require('lodash/cloneDeep')
app.use(ElementPlus)
app.mount('#app')


// const vm = new Vue({
//   render: h => h(APP)
// })
// vm.$mount('#app')