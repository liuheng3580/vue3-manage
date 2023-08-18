<template>
    <div class="flex items-center">
        <el-icon>
            <Menu />
        </el-icon>
        <span class=" inline-block ml-2">企业门户网站管理系统</span>
    </div>
    <div class="flex items-center">
        <span class="tracking-widest">欢迎{{ userInfo.username }}回来</span>
        <el-dropdown>
            <el-avatar :src="userAvatar" class="inline-block ml-2 outline-none" />
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="goCenter">个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleQuitClick">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

    </div>
</template>

<script setup lang='ts'>
import { Menu } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { userStore } from '@/store/userStore'


const navigate = useRouter()
const store = userStore()
const userInfo = store.userInfo
const userAvatar = computed(() => 'http://localhost:8111' + store.userInfo.avatar)
const handleQuitClick = () => {
    navigate.push('/login')
    localStorage.removeItem('token')
    store.setUser({})
}
const goCenter = () => {
    navigate.push('/center')
}
</script>
