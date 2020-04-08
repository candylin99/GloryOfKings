import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'

import Main from './views/Main.vue'

import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import ItemList from './views/ItemList.vue'
import ItemEdit from './views/ItemEdit.vue'
import HeroList from './views/HeroList.vue'
import HeroEdit from './views/HeroEdit.vue'
import ArticleList from './views/ArticleList.vue'
import ArticleEdit from './views/ArticleEdit.vue'
import AdList from './views/AdList.vue'
import AdEdit from './views/AdEdit.vue'
import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/login',
            name: 'login',
            component: Login,
            meta: { isPublic: true },
        },

        {
            path: '/',
            name: 'main',
            component: Main,
            // redirect: '/login',
            // 注意这里是子路由，就是左边点了右边会变
            children: [{
                    // 注意 前面的 ‘/’ 
                    path: 'categories/create',

                    component: CategoryEdit,
                },
                {

                    path: 'categories/list',
                    component: CategoryList,
                },

                {
                    //让它不同的地址使用同一个页面组件
                    path: 'categories/edit/:id',
                    component: CategoryEdit,
                    //表示把/categories/edit/:id任何的参数都注入到CategoryList里面
                    props: true
                },
                {
                    path: 'items/create',

                    component: ItemEdit,
                },
                {

                    path: 'items/list',
                    component: ItemList,
                },

                {
                    //让它不同的地址使用同一个页面组件
                    path: 'items/edit/:id',
                    component: ItemEdit,
                    //表示把/categories/edit/:id任何的参数都注入到CategoryList里面
                    props: true
                },

                {
                    path: 'heroes/create',

                    component: HeroEdit,
                },
                {

                    path: 'heroes/list',
                    component: HeroList,
                },

                {
                    //让它不同的地址使用同一个页面组件
                    path: 'heroes/edit/:id',
                    component: HeroEdit,
                    //表示把/categories/edit/:id任何的参数都注入到CategoryList里面
                    props: true
                },
                {
                    path: 'articles/create',

                    component: ArticleEdit,
                },
                {

                    path: 'articles/list',
                    component: ArticleList,
                },

                {
                    //让它不同的地址使用同一个页面组件
                    path: 'articles/edit/:id',
                    component: ArticleEdit,

                    props: true
                },

                {
                    path: 'ads/create',

                    component: AdEdit,
                },
                {

                    path: 'ads/list',
                    component: AdList,
                },

                {
                    //让它不同的地址使用同一个页面组件
                    path: 'ads/edit/:id',
                    component: AdEdit,

                    props: true
                },

                {
                    path: 'admin_user/create',

                    component: AdminUserEdit,
                },
                {

                    path: 'admin_user/list',
                    component: AdminUserList,
                },

                {
                    //让它不同的地址使用同一个页面组件
                    path: 'admin_user/edit/:id',
                    component: AdminUserEdit,

                    props: true
                },


            ]

        },

    ]
})

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
//表示每次切换或者进入这个路由的时候做什么
router.beforeEach((to, from, next) => {
    // console.log(to.meta)
    //先判断是否有meta，或者有没有token
    if (to.meta.isPublic && localStorage.token) {
        return next('/login')
    }
    next()
})
export default router