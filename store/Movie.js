import axios from 'axios'
const hostApi = 'http://vonvon.xyz:5000/api/mv'

export const state = () => ({
  listMovie: [],
  currentMovie: ''
})

export const mutations = {
  updateMovie(state, allMovie) {
    state.listMovie = allMovie
  },

  setMovie(state, movie) {
    state.currentMovie = movie
  }
}

export const actions = {
  async getMovie({ commit }) {
    const allMovie = await customAxios('/getall')
    commit('updateMovie', allMovie)
  },

  setMovie({ commit }, currentMovie) {
    commit('setMovie', currentMovie)
  }
}

async function customAxios(url = '') {
  const response = await axios.get(hostApi + url)
  return response.data
}
