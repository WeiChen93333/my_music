import Vue from 'vue'
import VueRouter from 'vue-router'
import Music from '../views/music/Music.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/music'
  },
  {
    path: '/music',
    component: Music
  } 
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
