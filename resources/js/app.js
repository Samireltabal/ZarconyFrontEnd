require('./bootstrap');
   
window.Vue = require('vue').default;
import VueRouter from 'vue-router'
import store from './store/index.js';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Icon from './components/Icon'
// import Layout from './components/defaults/Layout'
import ZarconyHeader from './components/defaults/Header'
import ZarconyFooter from './components/defaults/Footer'
import Breadcrumb from './components/breadcrumb'
import 'mdb-vue-ui-kit/css/mdb.min.css';
import { BootstrapVue } from 'bootstrap-vue';
import { fetchUser } from './plugins/Authentication.js'
import VueSweetalert2 from 'vue-sweetalert2';
import VueLuxon from "vue-luxon";
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import loader from "vue-ui-preloader";

Vue.use(loader);
Vue.component(loader)
Vue.use(VueSweetalert2);
axios.defaults.baseURL = process.env.MIX_API_URL
axios.interceptors.request.use(function (config) {
    store.commit('startLoading')
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    store.commit('stopLoading')
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.commit('stopLoading')
    return Promise.reject(error);
  });
Vue.use(VueAxios, axios);
Vue.use(VueRouter)
Vue.use(BootstrapVue)
// Vue.component('Layout', Layout)
Vue.component('zarcony-header', ZarconyHeader)
Vue.component('breadcrumb', Breadcrumb)
Vue.component('zarcony-footer', ZarconyFooter)
Vue.component('icon', Icon)
Vue.use(VueLuxon, {
    input: {
      zone: 'EET',
      format: 'iso'
    },
    output: 'short'
  })
  
import routes from "./routes/routes";

const router = new VueRouter({
    mode: 'history',
    routes 
})
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.admin_only)) {
        fetchUser().then((res) => {
            if (res.role === 'admin') {
                next()
            } else {
                next({
                    path: '/unauthorised'
                })
            }
        }).catch(() => {
            next({
                path: '/login'
            })
        })
    } else if(to.matched.some(record => record.meta.requiresAuth)) {
        fetchUser().then(() => {
            next()
        }).catch(() => {
            next({
                path: '/login'
            })
        })
    } else if(to.matched.some(record => record.meta.guest_only)) {
        fetchUser().then(() => {
            next({
                path: '/'
            })
        }).catch(() => {
            next()
        })
    } else {
        next()
    }
})

const app = new Vue({
    store,
    router
}).$mount('#app')