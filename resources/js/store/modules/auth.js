const auth = {
  state: () => {
    return {
      token: null,
      user: {},
      loggedIn: false
    }
  },
  mutations: {
    userFetched (state, data) {
      state.user = data
      state.loggedIn = true
      state.token = localStorage.getItem('token')
    },
    doLogin (state, data) {
      state.token = data.access_token
      state.user = data.user_data
      state.loggedIn = true
    },
    doLogout (state) {
      state.token = null
      state.user = {}
      state.loggedIn = false
    },
    loginFromRegister (state, data) {
      state.token = data.token
      state.user = data.data
      state.loggedIn = true
    }
  },
  actions: {
    doLogin (context, data) {
      context.commit('doLogin', data)
    },
    loginFromSignup(context, data) {
      context.commit('loginFromRegister', data)
    },
    logout (context) {
      context.commit('doLogout')
    },
    userFetched (context, data) {
      context.commit('userFetched', data)
    },
  }
}

export default auth