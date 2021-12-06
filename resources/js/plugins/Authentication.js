import store from '../store/index.js'

export async function login(username, password) {
  var promise = new Promise((resolve, reject) => {
    const info = {
      login: username,
      password: password
    }
    window.axios.post('auth/login', info).then((response) => {
      store.dispatch('doLogin', response.data)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      resolve(response.data)
    }).catch((err) => {
      reject(err)
    })
  })
  return promise
}

export async function signUp(data) {
  var promise = new Promise((resolve, reject) => {
    window.axios.post('auth/register', data).then((response) => {
      const res = response.data
      store.dispatch('loginFromSignup', res)
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.token}`;
      localStorage.setItem('token', res.token)
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
  return promise
}

export async function reset(email) {
  var promise = new Promise((resolve, reject) => {
    const data = {
      email: email
    }
    window.axios.post('auth/password/email', data).then((response) => {
      const res = response.data
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
  return promise
}

export async function authenticate(username, password) {
  let data;
  const info = {
    login: username,
    password: password
  }
  await window.axios.post('auth/login', info).then((response) => {
    store.dispatch('doLogin', response.data)
    data = response.data
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
  }).catch((err) => {
    data = err
  })
  return data;
}

export async function fetchUser () {
  var promise = new Promise((resolve, reject) => {
    if(localStorage.getItem('token')) {
      window.axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('token')}`;
      window.axios.get('auth/user').then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data))
        store.dispatch('userFetched', res.data)
        resolve(res.data)
      }).catch((err) => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('loggedIn')
        store.dispatch('logout')
        reject(new Error('Not Authenticated'))
      })
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('loggedIn')
      store.dispatch('logout')
      reject(new Error('Not Logged In'))
    }
  })
  return promise;
}

export async function logout () {
  await window.axios.post('auth/logout').then(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('loggedIn')
    store.dispatch('logout')
  })
}