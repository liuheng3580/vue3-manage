<template>
    <el-aside :width="sideWidth" class="flex  flex-col">
        <el-menu :default-active="defaultActive" :collapse-transition="false" class="flex-1" router :collapse="isCollapse"
            @open="handleOpen" @close="handleClose">
            <SubMenu :menuArr="menuArr" />
        </el-menu>

        <div class="h-10 text-center cursor-pointer border-r border-r-[#dcdfe6]" @click="handleCollapseClick">
            <el-icon>
                <component :is="iconName" />
            </el-icon>
        </div>
    </el-aside>
</template>

<script setup lang='ts'>
import {
    Menu as IconMenu,
    Location,
    Expand,
    Fold
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
defineOptions({
    name: 'SideMenu'
})
const routeInfo = useRoute()
const menuArr = [
    {
        name: '首页',
        path: '/index',
        icon: Location
    },
    {
        name: '个人中心',
        path: '/center',
        icon: IconMenu
    },
    {
        name: '用户管理',
        path: '/user-manage',
        icon: Location,
        children: [
            {
                name: '添加用户',
                path: '/user-manage/user-add',
                icon: Location
            },
            {
                name: '用户列表',
                path: '/user-manage/user-list',
                icon: Location
            }
        ]
    },
    {
        name: '新闻管理',
        path: '/news-manage',
        icon: Location,
        children: [
            {
                name: '创建新闻',
                path: '/news-manage/news-add',
                icon: Location
            },
            {
                name: '新闻列表',
                path: '/news-manage/news-list',
                icon: Location
            }
        ]
    },
    {
        name: '产品管理',
        path: '/product-manage',
        icon: Location,
        children: [
            {
                name: '添加产品',
                path: '/product-manage/product-add',
                icon: Location
            },
            {
                name: '产品列表',
                path: '/product-manage/product-list',
                icon: Location
            }
        ]
    },
]
const isCollapse = ref(false)
const defaultActive = computed(() => {
    return routeInfo.path
})
const sideWidth = computed(() => {
    return isCollapse.value ? '64px' : '200px'
})
const iconName = computed(() => {
    return isCollapse.value ? Fold : Expand
})
const handleCollapseClick = () => {
    isCollapse.value = !isCollapse.value
}
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>
