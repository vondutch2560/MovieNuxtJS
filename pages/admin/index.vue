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
      <div class="inner-info-movie">
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
          <form-input
            :value="movieName | decodeEntities"
            type="text"
            label="Movie name"
          />
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

    <div class="footer">Copyright 2020</div>
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
</style>
