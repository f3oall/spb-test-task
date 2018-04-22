import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('@/pages/index.vue')
const Comments = () => import('@/pages/comments.vue')
export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/comments',
      component: Comments
    }
  ]
})
