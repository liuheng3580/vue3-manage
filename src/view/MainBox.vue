<template>
    <el-container class="h-screen">
        <SideMenu />
        <el-container>
            <el-header class="w-full flex justify-between items-center">
                <TopHeader />
            </el-header>
            <el-main class="h-full">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang='ts'>
</script>
