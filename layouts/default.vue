<template>
  <div class="_layout_movie">
    <header-cpn />
    <nuxt />
    <footer-cpn />
  </div>
</template>

<script>
import HeaderCpn from '~/components/layout/Header.vue'
import FooterCpn from '~/components/layout/Footer.vue'

export default {
  components: {
    HeaderCpn,
    FooterCpn
  }
}
</script>

<style>
._layout_movie {
  position: relative;
  padding-bottom: 40px;
}
</style>
