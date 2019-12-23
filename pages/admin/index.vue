<template>
  <div class="container container-admin">
    <h1>Admin movie</h1>

    <ul class="list-movie">
      <li
        v-for="(movie, index) in listMovie"
        :key="index"
        @click="crawlMovie"
        :id="`movie-${index}`"
        :class="{ active: movieSelected == movie }"
      >
        {{ movie }}
      </li>
    </ul>

    <div class="info-movie-admin">
      <div class="img-cover">
        <img
          v-if="
            imageCover !== '' &&
              imageCover !== 'loading' &&
              imageCover !== '404'
          "
          :src="imageCover"
        />
        <div v-if="imageCover === 'loading'" class="lds-hourglass"></div>
        <p v-if="imageCover === '404'" class="image-not-found">
          Không tìm thấy hình ảnh
        </p>
      </div>

      <div class="properties-movie">
        <form-input :value="fileName" type="text" label="File name" />
        <form-input :value="movieName" type="text" label="Movie name" />
        <form-input :value="movieCode" type="text" label="Movie Code" />
        <form-input :value="releaseDate" type="date" label="Release Date" />
        <basic-select
          :selected="movieStudio"
          :options="listStudio"
          label="Studio"
        />
        <multi-select
          :options="listGenre"
          :selected="movieGenre"
          label="Genre"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import formInput from '../../components/admin/FormInput.vue'
import MultiSelect from '../../components/admin/MultiSelect.vue'
import BasicSelect from '../../components/admin/BasicSelect.vue'

export default {
  layout: 'admin',
  head: { title: 'Admin page - NuxtJS' },

  components: { formInput, BasicSelect, MultiSelect },

  filters: {
    decodeEntities(str) {
      const text = document.createElement('textarea')
      text.innerHTML = str
      return text.value
    }
  },

  computed: {
    ...mapState('adminMovie', [
      'listMovie',
      'listGenre',
      'imageCover',
      'movieSelected',
      'fileName',
      'movieName',
      'movieCode',
      'actresses',
      'releaseDate',
      'listStudio',
      'movieStudio',
      'movieGenre'
    ])
  },

  asyncData({ params }) {
    return {}
  },

  created() {
    this.$store.dispatch('adminMovie/addDataInit')
  },

  methods: {
    crawlMovie(event) {
      const fileNameMovie = event.target.innerHTML.trim()
      this.$store.dispatch('adminMovie/crawlMovie', fileNameMovie)
    }
  }
}
</script>

<style src="vue-search-select/dist/VueSearchSelect.css"></style>
<style>
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
  width: 310px;
  border-right: 1px solid #999;
  position: fixed;
  top: 77px;
  left: 0;
  bottom: 0;
  overflow: auto;
  padding: 10px 30px 10px 20px;
}

.list-movie li {
  margin-bottom: 8px;
  user-select: none;
  cursor: pointer;
  padding: 2px 0;
}
.list-movie li.active {
  background-color: #aaa;
}

.info-movie-admin {
  position: fixed;
  top: 100px;
  left: 330px;
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
  position: relative;
}

.info-movie-admin .img-cover img {
  width: 100%;
}

.info-movie-admin .img-cover p.image-not-found {
  position: absolute;
  text-align: center;
  font-size: 16px;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;
  transform: translateY(-50%);
}

.info-movie-admin .properties-movie {
  display: inline-block;
  width: 800px;
  margin-left: 40px;
  vertical-align: top;
}

.info-movie-admin .properties-movie .modify-multiselect {
  display: inline-block;
  width: 400px;
}

.ui.fluid.dropdown {
  display: inline-block;
  width: 400px;
  border: 1px solid #bbb;
  border-radius: 0;
  padding-left: 8px;
  margin-bottom: 25px;
}

.lds-hourglass {
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
  margin: auto;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.lds-hourglass:after {
  content: ' ';
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #ddd;
  border-color: #ddd transparent #ddd transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>
