<template>
  <div class="container container-admin">
    <h1>Admin movie</h1>

    <ul class="list-movie">
      <li
        v-for="(movie, index) in listMovie"
        :key="index"
        @click="getMovie"
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

        <div class="form-input">
          <label for="genre">Genre</label>
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
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import axios from 'axios'
import multiselect from 'vue-multiselect'
import formInput from '../../components/admin/FormInput.vue'

export default {
  layout: 'admin',

  components: { multiselect, formInput },

  computed: {
    ...mapGetters('adminMovie', ['listMovie']),

    ...mapState('adminMovie', [
      'imageCover',
      'movieSelected',
      'fileName',
      'movieName',
      'movieCode',
      'actresses',
      'releaseDate',
      'listStudio'
    ])
  },

  asyncData({ params }) {
    // const { data } = await axios.get('http://vonvon.xyz:5000/api')
    return {
      value: [],
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source b', code: 'osb' },
        { name: 'Open Source c', code: 'osc' }
      ]
    }
  },

  async created() {
    const listMovie = await axios.get('http://vonvon.xyz:5000/api')
    const dataInit = [
      {
        listStudio: await this.customAxios(
          'http://vonvon.xyz:5000/api/studiojp'
        )
      },
      {
        listActresses: ['abc', 'xyz']
      }
    ]
    this.$store.dispatch('adminMovie/createListMovieInit', listMovie.data)
    this.$store.dispatch('adminMovie/addDataInit', dataInit)
  },

  head: {
    title: 'Admin page - NuxtJS'
  },

  methods: {
    async getMovie(event) {
      const fileNameMovie = event.target.innerHTML.trim()
      const regex = /(.*)\s-\s(.*)\.[^.]+$/g
      const parseMovie = regex.exec(fileNameMovie)

      this.$store.dispatch('adminMovie/changeMovieSelected', {
        fileNameMovie,
        parseMovie
      })

      // const codeMovie = parseMovie[2].replace(/-/g, '')
      const codeMovie = parseMovie[2]
      const infoMovie = await axios.get(
        `http://vonvon.xyz:5000/getinfomovie/${codeMovie}`
      )

      if (infoMovie.data.status === false)
        this.$store.dispatch(
          'adminMovie/changeImageCover',
          infoMovie.data.imageCover
        )
      else
        this.$store.dispatch(
          'adminMovie/updateInfoMovie',
          infoMovie.data.infoMovie
        )
      console.log(infoMovie.data.infoMovie)
    },

    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      }
      this.options.push(tag)
      this.value.push(tag)
    },

    async customAxios(url) {
      const response = await axios.get(url)
      return response.data
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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

/* .info-movie-admin .properties-movie input[type='text'],
.info-movie-admin .properties-movie input[type='date'] {
  display: inline-block;
  width: 400px;
  margin-bottom: 25px;
  outline: none;
  border: 1px solid #bbb;
  padding: 6px 8px;
} */

.info-movie-admin .properties-movie .modify-multiselect {
  display: inline-block;
  width: 400px;
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
