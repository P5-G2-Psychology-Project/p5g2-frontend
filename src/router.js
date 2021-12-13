import { createRouter, createWebHashHistory } from 'vue-router'
import App                                    from './App.vue'

import Login                                  from './components/login.vue'
import SignUp                                 from './components/signUp.vue'
import Home                                   from './components/home.vue'
import Logbook                                from './components/logbook.vue'

const routes = [
  {
    path: '/user/login',
    name: "login",
    component: Login
  },
  {
    path: '/user/signUp',
    name: "signup",
    component: SignUp
  },

  {
    path: '/home',
    name: "home",
    component: Home
  },

  {
    path: '/logbook',
    name: "logbook",
    component: Logbook
  }
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
