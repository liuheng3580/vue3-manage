<template>
    <el-page-header :icon="null">
        <template #title>
            <span>企业门户网站管理系统</span>
        </template>
        <template #content>
            <span class="text-large font-600 mr-3">首页</span>
        </template>
    </el-page-header>
    <el-card shadow="always" class="my-6">
        <el-row>
            <el-col :span="2">
                <el-avatar :src="userAvatar" :size="70" />
            </el-col>
            <el-col :span="22" class="flex items-center">
                欢迎{{ userInfo.username }}回来,{{ stateText }}
            </el-col>
        </el-row>
    </el-card>

    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>公司产品</span>
            </div>
        </template>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
                <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </el-card>
</template>

<script setup lang='ts'>
import { userStore } from '@/store/userStore';
const userInfo = userStore().userInfo
const userAvatar = computed(() => userInfo.avatar!.startsWith('blob') ? userInfo.avatar : 'http://localhost:8111' + userInfo.avatar)

const stateText = computed(() => new Date().getHours() > 12 ? '喝杯咖啡提下神吧' : '又是充满希望的一天')

</script>
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>