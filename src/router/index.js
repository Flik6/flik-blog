import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import {message} from "ant-design-vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: "Flik - 让生活·更生活",
            menuKey:['1']
        },
    }, {
        path: '/articles',
        name: 'articles',
        meta: {
            title: "文章 - 让生活·更生活"
        },
        component: () => import('../views/article/ArticleInfo')
    }, {
        path: '/userinfo',
        name: 'userinfo',
        meta: {
            title: "个人资料 - 让生活·更生活"
        },
        component: () => import('../views/user/UserInfo')
    }, {
        path: '/publicArticle',
        name: 'publicArticle',
        meta: {
            title: "发表文章 - 让生活·更生活"
        },
        component: () => import('../views/article/PublicArticle')
    },{
        path: '/books',
        name: 'books',
        meta: {
            title: "不二单词 - 让生活·更生活",
            menuKey:['2']
        },
        component: () => import('../views/word/Books')
    },{
        path: '/study',
        name: 'study',
        meta: {
            title: "学单词 - 让生活·更生活"
        },
        component: () => import('../views/word/StudyWords')
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

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.meta.isLogin) {

        if (Object.prototype.hasOwnProperty.call(window.sessionStorage, 'token')) {
            next()
        } else {
            message.error("尚未登录,请登录~")
            next({path: '/login'})
            return;
        }
    }

    next()
})