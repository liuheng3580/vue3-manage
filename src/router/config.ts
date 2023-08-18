
import { RouteRecordRaw } from 'vue-router'
const Home = () => import('../view/home/Home.vue')
const Center = () => import('../view/center/Center.vue')
const NewsAdd = () => import('../view/news-manage/NewsAdd.vue')
const NewsList = () => import('../view/news-manage/NewsList.vue')
const ProductAdd = () => import('../view/product-manage/ProductAdd.vue')
const ProductList = () => import('../view/product-manage/ProductList.vue')
const UserAdd = () => import('../view/user-manage/UserAdd.vue')
const UserList = () => import('../view/user-manage/UserList.vue')
const NotFound = () => import('../view/NotFound.vue')

const routers: RouteRecordRaw[] = [
    {
        path: '/index',
        name: 'Home',
        component: Home
    },
    {
        path: '/center',
        name: 'Center',
        component: Center
    },
    {
        path: '/news-manage/news-add',
        name: 'NewsAdd',
        component: NewsAdd
    },
    {
        path: '/news-manage/news-list',
        name: 'NewsList',
        component: NewsList
    },
    {
        path: '/product-manage/product-add',
        name: 'ProductAdd',
        component: ProductAdd
    },
    {
        path: '/product-manage/product-list',
        name: 'ProductList',
        component: ProductList
    },
    {
        path: '/user-manage/user-add',
        name: 'UserAdd',
        component: UserAdd
    },
    {
        path: '/user-manage/user-list',
        name: 'UserList',
        component: UserList
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
]

export default routers