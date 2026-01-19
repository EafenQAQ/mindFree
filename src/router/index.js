import { createRouter, createWebHistory } from "vue-router";

import { useUserInfoStore } from "../Stores/UserInfo";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用 HTML5 History 模式
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      alias: ["/mindFree"],
    },
    {
      path: "/chatView",
      name: "chatView",
      component: () => import("../views/ChatView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../auth/Signup.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../auth/Login.vue"),
      alias: ["/login"],
    },
    // ... 其他路由规则
  ],
});

// 判断用户登录状态

router.beforeEach((to, from, next) => {
  const userStore = useUserInfoStore();
  if (to.meta.requiresAuth) {
    userStore.getUserState(next);
  } else {
    next();
  }
});

export default router;
