import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用 HTML5 History 模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // ... 其他路由规则
  ]
})

export default router