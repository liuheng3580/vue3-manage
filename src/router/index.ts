
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routerConfig from './config'
import { userStore } from '@/store/userStore'
import { Store } from 'pinia'
import { User } from '@/api/type'

const Login = () => import('../view/Login.vue')
const MainBox = () => import('../view/MainBox.vue')

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/mainbox',
        name: 'MainBox',
        component: MainBox,
    },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})




router.beforeEach((to, from, next) => {
    if (to.name == 'Login') {
        next()
    } else {
        const token = localStorage.getItem('token')
        if (token) {
            const routeState = userStore()
            if (!routeState.isGetterRouter) {
                setRoute(routeState)
                next({
                    path: to.fullPath
                })
            } else {
                next()
            }
        } else {
            next({
                path: '/login'
            })
        }
    }
})

const setRoute = (routeState: Store<"userStore", { isGetterRouter: boolean; userInfo: Object | User }, {}, { setRouterState(val: boolean): void; setUser(val: Object | User): void }>) => {
    routerConfig.forEach((route: RouteRecordRaw) => {
        router.addRoute("MainBox", route)
    })
    routeState.setRouterState(true)
}
export default router