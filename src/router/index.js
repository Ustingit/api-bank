import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SearchResult from '../views/SearchResult.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/addApi',
    name: 'AddAPI',
    component: () => import('../views/AddApi.vue')
  },
  {
    path: '/details/:id',
    name: 'ApiDetail',
    component: () => import('../views/ApiDetail.vue')
  },
  {
    path: '/search/:filter',
    name: 'SearchResult',
    component: () => import('../views/SearchResult.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
