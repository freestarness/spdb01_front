import * as types from '../mutation-types'

// initial state

const state = {
  isLoading: true
}
// getters
const getters = {
  isLoading: state => state.isLoading
}

// actions
const actions = {
  isLoading ({ commit, state }, isLoading) {
    state.isLoading = isLoading
  }
}

// mutations
const mutations = {
  [types.SWITCH_IS_LOADING] (state, isLoading) {
    state.isLoading = isLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
