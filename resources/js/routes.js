import Vue from 'vue'
import Router from 'vue-router'
import Show from './components/Show.vue'

Vue.use(Router)

export default new Router({
routes: [
  {
    path: '/app',
    name: 'App',
    component: require('./components/App.vue')
  },
  {
    path: '/show',
    name: 'Show',
    component: require('./components/Show.vue')
  }
],
 mode: 'history',
  base: process.env.BASE_URL,

})

