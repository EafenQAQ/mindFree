<template>
  <nav
    class="sticky top-3 z-50 w-[100%-50px] mx-3 rounded-full my-3 backdrop-filter backdrop-blur-lg bg-opacity-30 firefox:bg-opacity-90"
  >
    <div class="max-w-7xl mx-auto px-2">
      <div class="flex items-center justify-between h-16">
        <RouterLink
          :to="{ name: 'home' }"
          class="flex hover:bg-white/30 py-2 rounded-full items-center router-link-active router-link-exact-active btn btn-ghost p-0 m-0 h-fit w-fit"
        >
          <img
            src="../assets/logo.webp"
            alt="navLogo"
            class="h-8 ml-1 bg-blue-gray-50 rounded-full p-1"
          />
          <span class="logoText mr-4 font-semibold">mindFree.AI</span>
        </RouterLink>
        <div class="signin">
          <!-- <button
            @click="userStore.forTest"
            class="bg-red-400 py-2 px-4 rounded-2xl hover:cursor-pointer hover:bg-red-500 text-white"
          >
            for test
          </button> -->
          <router-link :to="{ name: 'login' }">
            <button
              v-if="!userStore.isLoggedIn"
              class="relative inline-flex items-center justify-center w-20 transition-all duration-300 ease-in-out bg-gradient-to-tr from-[#8bdaf0] to-blue-500 hover:from-[#62a9bd] hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:shadow-lg"
            >
              登录
            </button>
          </router-link>
          <button
            v-if="userStore.isLoggedIn"
            @click="logout"
            class="btn btn-dash hover:bg-red-500 hover:text-white rounded-full"
          >
            登出
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useUserInfoStore } from "../Stores/UserInfo";
const userStore = useUserInfoStore();
const router = useRouter();

const logout = () => {
  userStore.logOut();
  setTimeout(() => {
    router.push({ name: "home" });
  }, 1000);
};
</script>
