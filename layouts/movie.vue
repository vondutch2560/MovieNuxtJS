<template>
  <div class="_layout_movie">
    <Header />
    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/movie/Header.vue'

export default {
  components: { Header }
}
</script>

<style>
@import '../assets/css/movie.css';
</style>
