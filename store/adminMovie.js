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
  counter: 100
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
