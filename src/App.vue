<template>
  <NavBar />
  <router-view />
</template>

<script setup>
import { onMounted, onUpdated } from "vue";
import NavBar from "./components/NavBar.vue";
import { useUserInfoStore } from "./Stores/UserInfo";
import { runHomeAnime } from "./utils/anime";
// 加载用户状态
const userStore = useUserInfoStore();
userStore.loadUserInfo();

// 初始化
onMounted(() => {
  //播放动画
  runHomeAnime();
});
</script>
