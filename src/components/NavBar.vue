<template>
  <nav
    class="sticky top-3 z-50 w-[100%-50px] mx-3 rounded-full my-3 backdrop-filter backdrop-blur-lg bg-opacity-30 firefox:bg-opacity-90"
  >
    <div class="max-w-7xl mx-auto px-2">
      <div class="flex items-center justify-between h-16">
        <a
          href="/"
          class="flex bg-white py-2 rounded-full items-center router-link-active router-link-exact-active btn btn-ghost p-0 m-0 h-fit w-fit hover:bg-gray-200"
        >
          <img
            src="../assets/logo.webp"
            alt="navLogo"
            class="h-8 ml-1 bg-blue-gray-50 rounded-full p-1"
          />
          <span class="logoText mr-4 font-semibold">mindFree.AI</span>
        </a>
        <div class="signin">
          <button
            @click="userStore.forTest"
            class="bg-red-400 py-2 px-4 rounded-2xl hover:cursor-pointer hover:bg-red-500 text-white"
          >
            for test
          </button>
          <button
            @click="login"
            class="relative inline-flex items-center justify-center w-20 transition-all duration-300 ease-in-out bg-gradient-to-tr from-[#8bdaf0] to-blue-500 hover:from-[#62a9bd] hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:shadow-lg"
          >
            登录
          </button>
       

          
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserInfoStore } from "../Stores/UserInfoStore";

const userStore = useUserInfoStore();
const router = useRouter();

const login = () => {
  router.push("/chatView");
};
</script>
