import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import Logout from '../components/Logout.vue'
import Events from '../components/Events.vue'
import { getAuth } from "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let loggedIn = getAuth().currentUser
  if (to.name !== 'Login' && !loggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
