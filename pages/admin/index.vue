<template>
  <div class="container container-admin">
    <h1>Admin movie</h1>
    <div class="row row-admin">
      <ul class="list-movie">
        <li v-for="movie in movies" :key="movie">{{ movie }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'admin',

  components: {},

  async asyncData({ params }) {
    // We can use async/await ES6 feature
    const { data } = await axios.get('http://vonvon.xyz:5000/api')
    return { movies: data }
  },

  head: {
    title: 'Admin page - NuxtJS'
  }
}
</script>

<style scoped>
.container-admin {
  color: #777;
}

h1 {
  padding: 20px;
  background-color: #aaa;
  color: #555;
  user-select: none;
}

.list-movie {
  display: inline-block;
  width: 380px;
  border-right: 1px solid #999;
  position: fixed;
  top: 77px;
  left: 0;
  bottom: 0;
  overflow: auto;
}

.list-movie li {
  margin-bottom: 8px;
  user-select: none;
  cursor: pointer;
}
</style>
