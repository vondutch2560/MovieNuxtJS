<template>
  <div class="row">
    <div class="list--movie">
      <nuxt-link
        :to="movie"
        v-for="(movie, index) in movies"
        :key="index"
        @click.native="addMovie(movie)"
        class="item-movie"
      >
        <div :style="{ backgroundImage: coverImg(movie) }" class="cover"></div>
        <h4>{{ titleMovie(movie) }}</h4>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movies: { type: [Array, Object], default: () => [] }
  },

  computed: {},

  methods: {
    coverImg(str) {
      const img = str.trim().replace(/\s/g, '%20')
      return `url(http://vonvon.xyz:5000/${img}/${img}.jpg)`
    },

    titleMovie(str) {
      return str.slice(6)
    },

    addMovie(currentMovie) {
      this.$store.dispatch('Movie/setMovie', currentMovie)
    }
  }
}
</script>
