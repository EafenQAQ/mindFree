<template>
  <div
    class="heroContainer max-3xl:max-w-lg flex items-center justify-center mx-auto max-w-6xl max-3xl:flex-col-reverse max-3xl:mt-25"
  >
    <!-- hero左侧文字区 -->
    <div class="text-center 3xl:text-left">
      <p
        class="text-anime-1 mt-3 mb-5 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
      >
        你的专属心理健康智能管家🧠
      </p>
      <h1
        class="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-5xl"
      >
        <span class="text-anime-2 block xl:inline"
          >为你提供专业、稳定的情感支持,
        </span>
        <!--   -->
      </h1>
      <div
        class="textTyper max-3xl:mx-auto font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8bdaf0] to-blue-500"
      >
        24小时在线
      </div>
      <div
        class="center mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
      >
        <div class="rounded-full max-w-75 max-3xl:mx-auto">
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
      <div class="mt-6 sm:mt-8 flex max-3xl:justify-center justify-start space-x-4">
        <p class="text-sm text-gray-500 font-medium">24全天支持</p>
        <p class="text-sm text-gray-500 font-medium">打开即用</p>
        <p class="text-sm text-gray-500 font-medium">免费</p>
      </div>
    </div>
    <!-- hero图 -->

    <div
      @click="runAnime"
      class="heroImg w-full max-w-[512px] object-cover sm:h-72 max-3xl:m-10 max-3xl:w-80"
    >
      <img
        class="rounded-2xl max-3xl:rounded-full"
        src="../assets/hero_img.webp"
        alt="heroImg"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import anime from "animejs";
</script>

<style scoped>
/* 打字机动画效果 */
.textTyper {
  font-size: 3rem;
  /* 初始宽度为0 */
  width: 0;
  height: 4rem;
  /* 初始隐藏光标 */
  border-right: 5px solid transparent;
  /*
    Steps(<number_of_steps>，<direction>)
    steps接收两个参数：第一个参数指定动画分割的段数；第二个参数可选，接受 start和 end两个值，指定在每个间隔的起点或是终点发生阶跃变化，默认为 end。
    */
  animation:
    showCursor 0.01s 2.5s forwards,
    write 3s steps(5) 2.5s forwards,
    blink 0.75s steps(1) infinite,
    hideCursor 0.01s 7s forwards;
  overflow: hidden;
}

@keyframes write {
  0% {
    width: 0;
  }

  100% {
    width: 280px;
  }
}

@keyframes blink {
  50% {
    /* transparent是全透明黑色(black)的速记法，即一个类似rgba(0,0,0,0)这样的值。 */
    border-color: transparent; /* #00000000 */
  }
}

@keyframes hideCursor {
  to {
    border-right-color: transparent;
  }
}
@keyframes showCursor {
  to {
    border-right-color: rgb(100, 146, 231);
  }
}
</style>
