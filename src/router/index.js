import Vue from 'vue'
import VueRouter from 'vue-router'
import Player from '../views/player/Player.vue'
import SongPage from '../views/songPage/SongPage.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/music'
  },
  {
    path: '/music',
    components: {
      player: Player,
      content: SongPage
    }
  } 
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
