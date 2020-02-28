<template>
  <div class="container header">
    <div class="row">
      <h2><NuxtLink @click.native="clearSelectMovie" to="/">Ⓢⓞⓓⓐ</NuxtLink></h2>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clearSelectMovie() {
      this.$store.dispatch('Movie/setMovie', '')
    }
  }
}
</script>
