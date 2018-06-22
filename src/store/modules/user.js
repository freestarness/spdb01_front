import * as types from '../mutation-types'
import { cookie } from 'vux'

// initial state

const state = {
  userId: cookie.get('userId'),
  token: cookie.get('token'),
  expires: cookie.get('tokenExpired')
}
// getters
const getters = {
  userId: state => state.userId,
  token: state => state.token,
  expires: state => state.expires
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_EXPIRES] (state, expires) {
    state.expires = expires
  },
  [types.SET_USER_ID] (state, userId) {
    state.userId = userId
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
