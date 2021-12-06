import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    $auth: auth
  },
  state: {
    count: 0,
    isLoading: false
  },
  mutations: {
    increment (state) {
      state.count++
    },
    startLoading (state) {
      state.isLoading = true
    },
    stopLoading (state) {
      state.isLoading = false
    }
  }
})

export default store