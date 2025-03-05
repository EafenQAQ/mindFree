<template>
  <NavBar />
  <main class="flex flex-col mx-auto w-full -mt-32">
    <!-- 背景矢量图 -->
      <img 
      src="../assets/heroSVG.svg" 
      alt="bgSVG" 
      class="absolute top-0 right-0 w-full h-[90vh] object-cover opacity-80">
    <!-- hero区域 -->
    <section class="heroArea relative h-[90vh] flex items-center">
      <HeroArea />
    </section>
    <!-- 条幅简介 -->
    <section class="Banner mt-10">
      <div class="bg-gradient-to-tr from-[#c0edf9] to-[#4bf2df] h-30 flex items-center justify-center font-semibold text-white text-xl">
        <h3>mindFree是一款自助AI工具，当你感到担忧、悲伤、压力或单纯想要倾诉时可以使用。它就像一个可以倾听你烦恼并帮助你缓解情绪的朋友。</h3>
      </div>
    </section>
  </main>

  <img src="../assets/R.jpg" alt="bgImg">
  <img src="../assets/R.jpg" alt="bgImg">
  <img src="../assets/R.jpg" alt="bgImg">
</template>

<script>
import HeroArea from '../components/heroArea.vue';
import NavBar from '../components/NavBar.vue';

export default {
  components: { NavBar, HeroArea }
}
</script>
