<template>
  <div class="container">
    <filter-bar-cpn />
    <div class="row">
      <ul>
        <li v-for="movie in movies" :key="movie">{{ movie }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FilterBarCpn from '~/components/movie/FilterBar.vue'

export default {
  layout: 'movie',

  components: {
    FilterBarCpn
  },

  async asyncData({ params }) {
    // We can use async/await ES6 feature
    const { data } = await axios.get('http://vonvon.xyz:5000/api')
    return { movies: data }
  },

  head: {
    title: 'Home Movie - by NuxtJS'
  }
}
</script>

<style></style>
