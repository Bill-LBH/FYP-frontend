import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/vuex/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import( '../views/Login.vue'),
    },
    {
        path: '/teacher',
        name:'Homepage',
        component: () => import( '../views/Teacher/TeacherFunction.vue'),
        redirect: "/home",
        children: [
            {path: '/student', name: 'Student', component: () => import( '../views/Teacher/StudentManagement.vue')},
            {path: '/home', name: 'Home', component: () => import( '../views/Teacher/Home.vue')},
            {path: '/exam', name: 'Exam', component: () => import( '../views/Teacher/ExamManagement.vue')},
            {
                path: '/fill_in',
                name: 'Fill in questions',
                component: () => import( '../views/Teacher/Fill_inQuestion.vue')
            },
            {path: '/score', name: 'Score', component: () => import( '../views/Teacher/ScoreManagement.vue')},
            {
                path: '/multi_choice',
                name: 'Multi choice questions',
                component: () => import( '../views/Teacher/MultiChoice.vue')
            },
            {path: '/judge', name: 'Judge questions', component: () => import( '../views/Teacher/JudgeQuestion.vue')},
            {
                path: '/papermanage', //增加题库主界面
                name: 'Paper Manage',
                component: () => import('../views/Teacher/Papermanage.vue'),
                redirect: '/papermanage/addAnswer',
                children: [
                    {
                        path: '/papermanage/addAnswer', //增加题库主界面
                        name: 'Paper',
                        component: () => import('../views/Teacher/AddAnswer.vue'),
                    },
                    {
                        path: '/papermanage/addAnswerChildren', //点击试卷跳转到添加题库页面
                        name: 'Edit paper',
                        component: () => import('../views/Teacher/AddAnswerChildren.vue')
                    },
                    {
                        path: '/papermanage/viewpaper',
                        name: 'View paper',
                        component: () => import('../views/Teacher/ViewPaper.vue')
                    }
                ]
            },

        ]
    },
    {path: '/verify', name: 'Verify', component: () => import( '../views/VerifyAccount.vue')},
    {path: '/register', name: 'register', component: () => import( '../views/Register.vue')},
    {
        path: '/index', name: 'student', component: () => import('../views/Student/index.vue'),
        redirect: '/myexam',
        children: [
            {path: '/myexam', name: 'myexam', component: () => import( '../views/Student/MyExam')},
            {path: '/myscore', name: 'myscore', component: () => import( '../views/Student/MyScore')},
            {path: '/examMsg', name: 'Exam_Message', component: () => import( '../views/Student/examMsg')},
        ]
    },
    {path: '/answer', name: 'Answer', component: () => import( '../views/Student/Answer')},
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
