<template>
  <NavBar />
  <router-view />
</template>

<script setup>
import { onMounted, onUpdated } from "vue";
import NavBar from "./components/NavBar.vue";
import { useUserInfoStore } from "./Stores/UserInfo";
// 加载用户状态
const userStore = useUserInfoStore();
userStore.loadUserInfo();


</script>
