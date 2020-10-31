import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/layout/"),
    children: [{
      path: '',
      name: 'home',
      component: () => import("@/views/layout/zi_layout/home.vue")

    },
    {
      path: '/qa',
      name: 'qa',
      component: () => import("@/views/layout/zi_layout/qa.vue")

    },
    {
      path: '/video',
      name: 'video',
      component: () => import("@/views/layout/zi_layout/video.vue")

    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import("@/views/layout/zi_layout/mine.vue")

    }]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/")
  },
  {
    path: '/search',
    name: '/search',
    component: () => import("@/views/layout/zi_layout/zihome/search")
  },
  {
    path: '/article/:articleId',
    name: '/article',
    component: () => import("@/views/layout/zi_layout/Articles/article.vue")
  },
  {
    path: '/user/profile',
    name: '/profile',
    component: () => import("@/views/user-Information")
  }

]

const router = new VueRouter({
  routes
})

export default router
