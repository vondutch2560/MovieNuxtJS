<template>
  <div class="container container-header">
    <div class="row row-header">
      <ul>
        <li>
          <nuxt-link to="/">Movie</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/music">Music</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin">Admin</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container-header {
  padding: 10px;
}

.row-header ul {
  padding: 0;
}

.row-header ul li {
  display: inline-block;
  margin-right: 20px;
}

.row-header ul li a {
  display: inline-block;
  padding: 12px 5px;
  color: #ccc;
  transition: color 0.2s;
}

.row-header ul li a:hover,
.row-header ul li a.nuxt-link-exact-active {
  color: #fff;
}
</style>
