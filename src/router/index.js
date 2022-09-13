import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LoginPage";
import RegisterBlock from "@/components/RegisterBlock";
import VueMomentLib from 'vue-moment-lib';

Vue.use(VueRouter)
Vue.use(VueMomentLib);
let router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterBlock
    }
  ]
})

export default router
