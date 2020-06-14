import Vue from 'vue'
import Router from 'vue-router'
import Show from './components/views/Show.vue'

Vue.use(Router)

export default new Router({
routes: [
  {
    path: '/app',
    name: 'App',
    component: require('./components/Show.vue')
  },
  {
    path: '/show',
    name: 'Show',
    component: require('./components/views/Show.vue')
  }
],
 mode: 'history',
  base: process.env.BASE_URL,

})

