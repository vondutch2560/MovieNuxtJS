// import Vue from 'vue'
// import Vuex from 'vuex'
// import Result from './modules/Result.js'

// import * as getters from './getters.js'
// import * as mutations from './mutations.js'
// import * as actions from './actions.js'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     value: ''
//   },

//   getters,
//   mutations,
//   actions,

//   modules: { Result }
// })
export const state = () => ({
  movieSelected: '',
  fileName: '',
  movieName: '',
  movieCode: '',
  actresses: '',
  imageCover: '',
  studioId: 0,
  labelId: 0,
  seriesId: 0,
  directorId: 0,
  uncensored: 0,
  releaseDate: '',
  movieGenre: []
})

export const mutations = {
  changeMovieSelected(state, objMovie) {
    state.movieSelected = state.fileName = objMovie.fileNameMovie
    state.actresses = objMovie.parseMovie[1]
    state.movieCode = objMovie.parseMovie[2]
  },

  changeInfoMovie(state, objMovie) {
    for (const key in objMovie) {
      state[key] = objMovie[key]
    }
  },

  addLoadingImageCover(state, str) {
    state.imageCover = str
  },

  updateInfoMovieR18(state, objMovie) {
    state.movieName = objMovie.nameMovie
    state.actresses = objMovie.actresses
    // state.imageCover = objMovie.imageCover
  }
}
