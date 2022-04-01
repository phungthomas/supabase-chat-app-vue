import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      user: null,
      username: "",
    }
  },

  getter() {
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUsername(state, username) {
      state.username = username;
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setUsername({ commit }, user) {
      commit('setUsername', user);

    }
  },
  modules() {
  }
})
