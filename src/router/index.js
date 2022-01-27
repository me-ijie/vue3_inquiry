/*
 * @Description: 路由配置
 * @Date: 2022-01-27 15:36:35
 * @LastEditors: meijie
 * @LastEditTime: 2022-01-27 16:53:28
 * @FilePath: \vue3_inquiry\src\router\index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import ('../views/login/index'),
  },
  {
    path: '/inquiry',
    name: 'inquiry',
    component: () => import ('../views/inquiry/index'),
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router