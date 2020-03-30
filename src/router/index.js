import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import AppIndex from '../components/home/AppIndex'
import Register from '../components/Register'
import Home from '../components/Home'
import Admin from '../components/Admin'
import Cart from '../components/Cart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
