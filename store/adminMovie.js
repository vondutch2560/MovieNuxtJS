export const state = () => ({
  listMovie: [],
  listActresses: [],
  listGenre: [],
  listSeries: [],
  listStudio: [],
  movieSelected: '',
  fileName: '',
  movieName: '',
  movieCode: '',
  actresses: '',
  imageCover: '',
  studio: { id: '', name: '' },
  label: '',
  series: '',
  director: '',
  uncensored: '',
  releaseDate: ''
})

export const mutations = {
  addDataInit(state, objData) {
    objData.forEach((item) => {
      for (const key in item) {
        state[key] = item[key]
      }
    })
  },

  changeMovieSelected(state, objMovie) {
    state.movieSelected = state.fileName = objMovie.fileNameMovie
    state.actresses = objMovie.parseMovie[1]
    state.movieCode = objMovie.parseMovie[2]
  },

  changeImageCover(state, str) {
    state.imageCover = str
  },

  updateInfoMovieR18(state, objMovie) {
    state.movieName = objMovie.nameMovie
    state.actresses = objMovie.actresses
    state.studio = findValue(state.listStudio, objMovie.studio)
    // state.imageCover = objMovie.imageCover
  },

  changeInfoMovie(state, objMovie) {
    for (const key in objMovie) {
      state[key] = objMovie[key]
    }
  },

  addListStudio(state, newStudio) {
    state.listStudio.push(newStudio)
  },

  updateInfoMovieByObjectName(state, objUpdate) {
    objUpdate.forEach((item) => {
      for (const key in item) {
        console.log(key)
        state[key] = item[key]
      }
    })
  }
}

export const actions = {
  addDataInit({ commit }, objData) {
    commit('addDataInit', objData)
  },

  changeMovieSelected({ commit }, objMovie) {
    commit('changeMovieSelected', objMovie)
    commit('changeImageCover', 'loading')
  },

  changeImageCover({ commit }, image) {
    commit('changeImageCover', image)
  },

  updateInfoMovie({ commit }, objMovie) {
    commit(
      'changeImageCover',
      'https://res.cloudinary.com/teepublic/image/private/s--c746ptCM--/c_crop,x_10,y_10/c_fit,h_690/c_crop,g_north_west,h_734,w_1004,x_-199,y_-22/l_upload:v1466701074:production:blanks:ibu6swrzxdis4kiazjnn/fl_layer_apply,g_north_west,x_-330,y_-275/b_rgb:ffffff/c_limit,f_jpg,h_630,q_90,w_630/v1547232282/production/designs/3943702_0.jpg'
    )
    commit('updateInfoMovieR18', objMovie)
  },

  addListStudio({ commit }, newStudio) {
    commit('addListStudio', newStudio)
  },

  updateInfoMovieByObjectName({ commit }, objUpdate) {
    commit('updateInfoMovieByObjectName', objUpdate)
  }
}

export const getters = {
  listMovie(state) {}
}

function findValue(arr, value) {
  const result = arr.find((item) => item.text === value)
  return result === undefined ? { value: '', text: '' } : result
}
