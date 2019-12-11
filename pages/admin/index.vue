<template>
  <div class="container container-admin">
    <h1>Admin movie</h1>
    <ul class="list-movie">
      <li v-for="movie in listMovies" :key="movie">{{ movie }}</li>
    </ul>
    <div class="info-movie-admin">
      <div class="img-cover">
        <img src="" alt="Image Cover" title="Image Cover" />
      </div>
      <div class="properties-movie">
        <input type="text" name="fileName" placeholder="File Name" />
        <input type="text" name="movieName" placeholder="Movie Name" />
        <input type="text" name="movieCode" placeholder="Movie Code" />
        <input type="date" name="releaseDate" />
        <multiselect
          v-model="value"
          :options="options"
          :multiple="true"
          :taggable="true"
          :close-on-select="false"
          @tag="addTag"
          open-direction="bottom"
          tag-placeholder="Add this as new tag"
          placeholder="Search or add a tag"
          label="name"
          track-by="code"
          class="modify-multiselect"
        ></multiselect>
        {{ value }}
        {{ this.$store.state.adminMovie.counter }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import multiselect from 'vue-multiselect'

export default {
  layout: 'admin',

  components: { multiselect },

  // computed: {
  //   resulttt() {
  //     return this.$store.state.index.counter
  //   }
  // },

  async asyncData({ params }) {
    const { data } = await axios.get('http://vonvon.xyz:5000/api')

    return {
      listMovies: data,
      movieProperties: {
        image: '',
        fileName: '',
        movieName: '',
        movieCode: '',
        releaseDate: '',
        seriesId: '',
        studioId: '',
        labelId: '',
        directorId: '',
        uncensored: ''
      },
      value: [],
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source b', code: 'osb' },
        { name: 'Open Source c', code: 'osc' },
        { name: 'Open Source d', code: 'osd' },
        { name: 'Open Source e', code: 'ose' },
        { name: 'Open Source f', code: 'osf' },
        { name: 'Open Source g', code: 'osg' }
      ]
    }
  },

  head: {
    title: 'Admin page - NuxtJS'
  },

  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      }
      this.options.push(tag)
      this.value.push(tag)
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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

.info-movie-admin {
  position: fixed;
  top: 100px;
  left: 400px;
  right: 20px;
  bottom: 20px;
}

.info-movie-admin .img-cover {
  width: 650px;
  min-height: 420px;
  border: 1px solid #bbb;
  display: inline-block;
  font-size: 0;
  vertical-align: top;
}
.info-movie-admin .img-cover img {
  width: 100%;
}
.info-movie-admin .properties-movie {
  display: inline-block;
  width: 800px;
  margin-left: 40px;
  vertical-align: top;
}
.info-movie-admin .properties-movie input[type='text'],
.info-movie-admin .properties-movie input[type='date'] {
  display: block;
  width: 500px;
  margin-bottom: 25px;
  outline: none;
  border: 1px solid #bbb;
  padding: 6px 8px;
}

.info-movie-admin .properties-movie .modify-multiselect {
  width: 500px;
}
</style>
