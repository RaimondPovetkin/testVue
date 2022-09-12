import Vue from 'vue'
import VueRouter from 'vue-router'
import AboutView from '@/views/AboutView'
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LoginPage";
import RegisterBlock from "@/components/RegisterBlock";

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
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
