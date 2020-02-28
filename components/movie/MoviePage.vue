<template>
  <div class="container main">
    <my-video :currentMovie="currentMovie" />
    <list-movie :movies="listMovie" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListMovie from '~/components/movie/ListMovie.vue'
import MyVideo from '~/components/movie/MyVideo.vue'

export default {
  layout: 'movie',

  components: { ListMovie, MyVideo },

  computed: {
    ...mapState('Movie', ['listMovie', 'currentMovie'])
  },

  created() {
    this.$store.dispatch('Movie/getMovie')
    if (this.$route.params.movie !== undefined)
      this.$store.dispatch('Movie/setMovie', this.$route.params.movie)
  },

  methods: {},

  head: {
    title: 'Home Movie - by NuxtJS'
  }
}
</script>
