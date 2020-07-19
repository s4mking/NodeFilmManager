import Vue from 'vue'
import VueRouter from 'vue-router'
 import connect from '../pages/connection.vue'
 import films from '../pages/Films.vue'
 import Film from '../pages/Film.vue'
 import Distributeur from '../pages/Distributeur.vue'
 import Distributeurs from '../pages/Distributeurs.vue'
 import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/auth',
    name: 'Connect',
    component: connect
  },
  {
    path: '/films',
    name: 'Films',
    component: films,
    meta: { 
      requiresAuth: true
    },
  },
  {
  path: '/films/:id',
  name: 'film',
  component: Film,
  meta: { 
    requiresAuth: true
  },
  },
  {
    path: '/distributeurs',
    name: 'distributeurs',
    component: Distributeurs,
    meta: { 
      requiresAuth: true
    },
  },
  {
  path: '/distributeurs/:id',
  name: 'distributeur',
  component: Distributeur,
  meta: { 
    requiresAuth: true
  },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/auth') 
  } else {
    next() 
  }
})
export default router
