<template>
  <NavBar />
  <main class="flex flex-col mx-auto w-full -mt-32">
    <section class="heroArea relative h-[90vh] flex items-center">
      <HeroArea />
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
