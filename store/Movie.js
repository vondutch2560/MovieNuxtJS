import axios from 'axios'
const hostApi = 'http://vonvon.xyz:5000/api/mv'

export const state = () => ({
  listMovie: []
})

export const mutations = {
  updateMovie(state, allMovie) {
    state.listMovie = allMovie
  }
}

export const actions = {
  async getMovie({ commit }) {
    const allMovie = await customAxios('/getall')
    commit('updateMovie', allMovie)
  }
}

async function customAxios(url = '') {
  const response = await axios.get(hostApi + url)
  return response.data
}
