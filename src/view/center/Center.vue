<template>
    <el-page-header :icon="null">
        <template #title>
            <span>企业门户网站管理系统</span>
        </template>
        <template #content>
            <span class="text-large font-600 mr-3">个人中心</span>
        </template>
    </el-page-header>
    <el-row class="my-8" :gutter="20">
        <el-col :span="8">
            <el-card shadow="always" class=" text-center">
                <el-avatar :src="userAvatar" :size="150" />
                <h1 class=" font-bold  text-xl">{{ user.userInfo.username }}</h1>
                <h3>{{ UserRole[user.userInfo.role as keyof typeof UserRole || '1'] }}</h3>
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-card shadow="always">
                <el-form ref="userFormRef" :model="userForm" :rules="userRules" label-width="120px" class="demo-ruleForm"
                    status-icon>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userForm.username" />
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="userForm.gender" value-key="label" class="w-full" placeholder="请选择性别">
                            <el-option v-for="item in genderArr" :key="item.label" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述" prop="introduction">
                        <el-input v-model="userForm.introduction" type="textarea" :rows="4" />
                    </el-form-item>
                    <el-form-item label="头像" prop="avatar">
                        <ImageUpload :imageUrl="userForm.avatar" @onUploadChange="onUploadChange" />
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" type="primary" @click="onUpdate(userFormRef)">更新</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang='ts'>
import { userStore } from '@/store/userStore';
import { UserRole } from '@/enum/index'
import type { FormInstance, FormRules, UploadRawFile } from 'element-plus'
import type { ICenterRuleForm } from '@/types/Center'
import { UPLOAD } from '@/api/apis/user.api';
import { ElMessage } from 'element-plus';


const user = userStore()
const { username, role, gender, introduction, avatar } = user.userInfo
const userFormRef = ref<FormInstance>()
const loading = ref<boolean>(false)

const userForm = reactive<ICenterRuleForm>({
    username: username || '',
    role: role || '1',
    gender: gender || '1',
    introduction: introduction || '',
    avatar: avatar || '',
})
const userAvatar = computed(() => userForm.avatar.startsWith('blob') ? userForm.avatar : 'http://localhost:8111' + userForm.avatar)
const genderArr = [
    {
        label: '男',
        value: '1'
    }, {
        label: '女',
        value: '2'
    }
]
const userRules = reactive<FormRules<ICenterRuleForm>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    gender: [
        {
            required: true,
            message: '请选择性别',
            trigger: 'change',
        },
    ],
    introduction: [
        { required: true, message: '请输入描述', trigger: 'blur' },
    ],
    avatar: [
        {
            required: true,
            message: '请上传头像',
            trigger: 'change',
        },
    ],
})
const onUpdate = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            try {
                loading.value = true
                const formData = new FormData()
                for (const key in userForm) {
                    formData.append(key, userForm[key as keyof ICenterRuleForm])
                }
                const res = await UPLOAD(formData)
                ElMessage({
                    type: 'success',
                    message: '更新成功'
                })
                user.setUser(res.data)
            } catch (error) {
                ElMessage({
                    type: 'success',
                    message: '更新失败'
                })
                console.log('error', error)
            } finally {
                loading.value = false
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

const onUploadChange = (url: string, file: UploadRawFile) => {
    userForm.avatar = url
    userForm.file = file
}

</script>

@/enum