<template>
  <div class="container container-admin">
    <h1>Admin movie</h1>
    <ul class="list-movie">
      <li
        v-for="(movie, index) in listMovies"
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
          alt="Image Cover"
          title="Image Cover"
        />
        <div v-if="imageCover === 'loading'" class="lds-hourglass"></div>
        <p v-if="imageCover === '404'" class="image-not-found">
          Không tìm thấy hình ảnh
        </p>
      </div>
      <div class="properties-movie">
        <div class="form-input">
          <label for="file-name">File name</label>
          <input
            id="file-name"
            v-model="fileName"
            type="text"
            name="fileName"
          />
        </div>
        <div class="form-input">
          <label for="movie-name">Movie name</label>
          <input
            id="movie-name"
            v-model="movieName"
            type="text"
            name="movieName"
          />
        </div>
        <div class="form-input">
          <label for="movie-code">Movie Code</label>
          <input
            id="movie-code"
            v-model="movieCode"
            type="text"
            name="movieCode"
          />
        </div>
        <div class="form-input">
          <label for="release-date">Release Date</label>
          <input id="release-date" type="date" name="releaseDate" />
        </div>
        <div class="form-input">
          <label for="studio">Studio</label>
          <input id="studio" type="text" name="studio" value="" />
        </div>
        <div class="form-input">
          <label for="label-movie">Label</label>
          <input id="label-movie" name="labelMovie" type="text" value="" />
        </div>
        <div class="form-input">
          <label for="series">Series</label>
          <input id="serires" type="text" name="series" value="" />
        </div>
        <div class="form-input">
          <label for="actresses">Actresses</label>
          <input
            id="actresses"
            v-model="actresses"
            type="text"
            name="actresses"
            value=""
          />
        </div>
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
import axios from 'axios'
import multiselect from 'vue-multiselect'

// import request from 'request'

// import { mapState } from 'vuex'

export default {
  layout: 'admin',

  components: { multiselect },
  computed: {
    // ...mapState({
    //   movieSelected: (state) => state.adminMovie.movieSelected
    // })
    imageCover() {
      return this.$store.state.adminMovie.imageCover
    },

    movieSelected() {
      return this.$store.state.adminMovie.movieSelected
    },

    fileName: {
      get() {
        return this.$store.state.adminMovie.fileName
      },
      set(fileName) {
        this.$store.commit('adminMovie/changeInfoMovie', { fileName })
      }
    },

    movieName: {
      get() {
        return this.$store.state.adminMovie.movieName
      },
      set(movieName) {
        this.$store.commit('adminMovie/changeInfoMovie', { movieName })
      }
    },

    movieCode: {
      get() {
        return this.$store.state.adminMovie.movieCode
      },
      set(movieCode) {
        this.$store.commit('adminMovie/changeInfoMovie', { movieCode })
      }
    },

    actresses: {
      get() {
        return this.$store.state.adminMovie.actresses
      },
      set(actresses) {
        this.$store.commit('adminMovie/changeInfoMovie', { actresses })
      }
    }
  },

  async asyncData({ params }) {
    const { data } = await axios.get('http://192.168.1.250:5000/api')

    return {
      listMovies: data,
      value: [],
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source b', code: 'osb' },
        { name: 'Open Source c', code: 'osc' }
      ]
    }
  },

  head: {
    title: 'Admin page - NuxtJS'
  },

  methods: {
    // async getMovie(event) {
    //   const fileNameMovie = event.target.innerHTML.trim()
    //   const regex = /(.*)\s-\s(.*)\.[^.]+$/g
    //   const parseMovie = regex.exec(fileNameMovie)
    //   this.$store.commit('adminMovie/changeMovieSelected', {
    //     fileNameMovie,
    //     parseMovie
    //   })
    //   this.$store.commit('adminMovie/addLoadingImageCover', 'loading')
    //   const dataInfoMovie = await axios.get(
    //     `http://vonvon.xyz:5000/getinfomovie/${parseMovie[2]}`
    //   )
    //   if (dataInfoMovie.data !== '')
    //     this.$store.commit(
    //       'adminMovie/addLoadingImageCover',
    //       dataInfoMovie.data
    //     )
    //   else this.$store.commit('adminMovie/addLoadingImageCover', '404')
    // },
    async getMovie(event) {
      const fileNameMovie = event.target.innerHTML.trim()
      const regex = /(.*)\s-\s(.*)\.[^.]+$/g
      const parseMovie = regex.exec(fileNameMovie)
      this.$store.commit('adminMovie/changeMovieSelected', {
        fileNameMovie,
        parseMovie
      })
      this.$store.commit('adminMovie/addLoadingImageCover', 'loading')
      // const codeMovie = parseMovie[2].replace(/-/g, '')
      const codeMovie = parseMovie[2]
      const dataInfoMovie = await axios.get(
        `http://192.168.1.250:5000/getinfomovie/${codeMovie}`
      )

      if (dataInfoMovie.data.status === false) {
        alert(dataInfoMovie.data.message)
        this.$store.commit('adminMovie/addLoadingImageCover', '404')
      } else {
        this.$store.commit(
          'adminMovie/addLoadingImageCover',
          'https://res.cloudinary.com/teepublic/image/private/s--c746ptCM--/c_crop,x_10,y_10/c_fit,h_690/c_crop,g_north_west,h_734,w_1004,x_-199,y_-22/l_upload:v1466701074:production:blanks:ibu6swrzxdis4kiazjnn/fl_layer_apply,g_north_west,x_-330,y_-275/b_rgb:ffffff/c_limit,f_jpg,h_630,q_90,w_630/v1547232282/production/designs/3943702_0.jpg'
          // dataInfoMovie.data.infoMovie.imageCover
        )
        this.$store.commit(
          'adminMovie/updateInfoMovieR18',
          dataInfoMovie.data.infoMovie
        )
        console.log(dataInfoMovie.data.infoMovie)
      }
    },

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

.info-movie-admin .properties-movie .form-input label {
  display: inline-block;
  width: 100px;
}

.info-movie-admin .properties-movie input[type='text'],
.info-movie-admin .properties-movie input[type='date'] {
  display: inline-block;
  width: 400px;
  margin-bottom: 25px;
  outline: none;
  border: 1px solid #bbb;
  padding: 6px 8px;
}

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
