import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用 HTML5 History 模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/chatView',
      name: 'chatView',
      component: () => import('../views/ChatView.vue')
    },
    // ... 其他路由规则
  ]
})

export default router