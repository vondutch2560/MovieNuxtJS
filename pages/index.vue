<template>
  <div class="container main">
    <!-- <filter-bar /> -->
    <div class="row">
      <div v-for="(movie, index) in listMovie" :key="index" class="item-movie">
        <div :style="{ backgroundImage: coverImg(movie) }" class="cover"></div>
        <h4>{{ titleMovie(movie) }}</h4>
      </div>
      <ul>
        <!-- <li v-for="movie in movies" :key="movie">{{ movie }}</li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import axios from 'axios'
// import FilterBar from '~/components/movie/FilterBar.vue'

export default {
  layout: 'movie',
  computed: {
    ...mapState('Movie', ['listMovie'])
  },

  async asyncData({ params }) {
    // // We can use async/await ES6 feature
    // const { data } = await axios.get('http://vonvon.xyz:5000/api/jp')
    // return { movies: data }
  },

  created() {
    this.$store.dispatch('Movie/getMovie')
  },
  methods: {
    coverImg(str) {
      const img = str.trim().replace(/\s/g, '%20')
      return `url(http://vonvon.xyz:5000/${img}/${img}.jpg)`
    },

    titleMovie(str) {
      return str.slice(6)
    }
  },

  head: {
    title: 'Home Movie - by NuxtJS'
  }
}
</script>

<style></style>
