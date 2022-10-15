import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/vuex/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'teacher',
    component: () => import(/* webpackChunkName: "about" */ '../views/Teacher/TeacherFunction.vue'),
    redirect:"/home",
    children: [
        {path: '/student', name: 'Student', component: () => import(/* webpackChunkName: "about" */ '../views/Teacher/StudentManagement.vue')},
        {path: '/home', name: 'Home', component: () => import(/* webpackChunkName: "about" */ '../views/Teacher/Home.vue')},
      {path: '/exam', name: 'Exam', component: () => import(/* webpackChunkName: "about" */ '../views/Teacher/ExamManagement.vue')},
      {path: '/fill_in', name: 'Fill in questions', component: () => import(/* webpackChunkName: "about" */ '../views/Teacher/Fill_inQuestion.vue')},
      {path: '/score', name: 'Score', component: () => import(/* webpackChunkName: "about" */ '../views/Teacher/ScoreManagement.vue')},
      {path: '/multi_choice', name: 'Multi choice questions', component: () => import(/* webpackChunkName: "about" */ '../views/Teacher/MultiChoice.vue')},
      {path: '/judge', name: 'Judge questions', component: () => import(/* webpackChunkName: "about" */ '../views/Teacher/JudgeQuestion.vue')},
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
  store.commit("setPath")  // 触发store的数据更新
  next()  // 放行路由
})
export default router
