import axios from 'axios'
const hostApi = 'http://vonvon.xyz:5000/api'

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

  updateInfoMovie(state, objMovie) {
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

  updateInfoMovie({ commit, state }, objMovie) {
    formatObj(state, objMovie)
    commit('updateInfoMovie', objMovie)
    commit(
      'changeImageCover',
      'https://res.cloudinary.com/teepublic/image/private/s--c746ptCM--/c_crop,x_10,y_10/c_fit,h_690/c_crop,g_north_west,h_734,w_1004,x_-199,y_-22/l_upload:v1466701074:production:blanks:ibu6swrzxdis4kiazjnn/fl_layer_apply,g_north_west,x_-330,y_-275/b_rgb:ffffff/c_limit,f_jpg,h_630,q_90,w_630/v1547232282/production/designs/3943702_0.jpg'
    )
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

async function formatObj(state, obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') obj[key] = obj[key].trim()
    if (key === 'releaseDate') obj[key] = formatDate(obj[key])
    if (key === 'studio') obj[key] = await checkExistValueDB(state, obj[key])
  }
}

// function findValue(arr, value) {
//   const result = arr.find((item) => item.name === value)
//   return result === undefined ? { id: '', name: '' } : result
// }

function formatDate(strDate) {
  const d = new Date(strDate)
  const year = d.getFullYear()
  const month = ('0' + (d.getMonth() + 1)).slice(-2)
  const date = ('0' + d.getDate()).slice(-2)
  return `${year}-${month}-${date}`
}

async function checkExistValueDB(state, movie) {
  let findStudio = state.listStudio.find((item) => item.name === movie.studio)
  if (findStudio === undefined) {
    const response = await axios.post(hostApi + '/studio', {
      studio: movie.studio
    })
    if (response.status === 200) findStudio = response.data
  }
  console.log(findStudio)
  return findStudio
}
