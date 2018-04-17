import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function page(name) {
  try {
    return require(`@/pages/${name}`).default
  } catch (e) {
    console.warn(`cant find page '${name}'`)
    return require(`@/pages/base-default`).default
  }
}

function route(path, component) {
  return { path, component }
}

export default new Router({
  routes: [route('/', page('index')), route('/comments', page('comments'))]
})
