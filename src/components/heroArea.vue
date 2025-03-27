<template>
  <div
    class="heroContainer flex items-center justify-center mx-auto max-w-6xl max-sm:flex-col-reverse max-sm:mt-25"
  >
    <!-- hero左侧文字区 -->
    <div class="text-center sm:text-center lg:text-left">
      <p
        class="mt-3 mb-5 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
      >
        你的专属心理健康智能管家🧠
      </p>
      <h1
        class="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-5xl"
      >
        <span class="block xl:inline">为你提供专业、稳定的情感支持, </span>
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-[#8bdaf0] to-blue-500"
          >24小时在线</span
        >
      </h1>
      <div
        class="center mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
      >
        <div class="rounded-full max-w-75 max-sm:mx-auto">
          <router-link :to="{ name: 'chatView' }">
            <a
              href="#"
              class="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full bg-gradient-to-tr from-[#8bdaf0] to-[#3df3d2] hover:from-[#96dff3] hover:to-[#63fee1] hover:shadow-md md:py-4 md:text-lg md:px-10"
              @click="login"
            >
              开始使用 >
            </a>
          </router-link>
        </div>
      </div>
      <div class="mt-6 sm:mt-8 flex justify-center lg:justify-start space-x-4">
        <p class="text-sm text-gray-500 font-medium">24全天支持</p>
        <p class="text-sm text-gray-500 font-medium">打开即用</p>
        <p class="text-sm text-gray-500 font-medium">免费</p>
      </div>
    </div>
    <!-- hero图 -->

    <div
      class="heroImg w-full max-w-[512px] object-cover sm:h-72 md:h-96 lg:w-full lg:h-full max-sm:m-10 max-sm:w-80"
    >
      <img
        class="rounded-2xl max-sm:rounded-full"
        src="../assets/hero_img.webp"
        alt="heroImg"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
</script>

<style scoped>
.heroImg-enter-active,
.heroImg-leave-active {
  transition: all 0.5s ease;
}

.heroImg-enter-from,
.heroImg-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
