<template>
    <el-page-header :icon="null">
        <template #title>
            <span>用户管理</span>
        </template>
        <template #content>
            <span class="text-large font-600 mr-3">添加用户</span>
        </template>
    </el-page-header>
    <el-form ref="userFormRef" :model="userForm" :rules="userRules" label-width="120px" status-icon class="mt-8">
        <el-form-item label="用户名" prop="username" placeholder="请输入用户名">
            <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password" placeholder="请输入密码">
            <el-input type="password" v-model="userForm.password" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
            <el-select v-model="userForm.gender" placeholder="请选择角色" class="w-full">
                <el-option v-for="item in Object.keys(UserGender)" :key="item" :label="item"
                    :value="UserGender[item as keyof typeof UserGender]" />
            </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="role">
            <el-select v-model="userForm.role" placeholder="请选择角色" class="w-full">
                <el-option v-for="item in Object.keys(UserRole)" :key="item" :label="item"
                    :value="UserRole[item as keyof typeof UserRole]" />
            </el-select>
        </el-form-item>
        <el-form-item label="个人简介" prop="introduction">
            <el-input v-model="userForm.introduction" type="textarea" placeholder="请输入个人简介" />
        </el-form-item>
        <el-form-item label="个人简介" prop="introduction">
            <ImageUpload :imageUrl="userForm.avatar" @onUploadChange="onUploadChange" />
        </el-form-item>
        <el-form-item>
            <el-button :loading="loading" type="primary" @click="handleAddUserClick(userFormRef)">添加用户</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang='ts'>
import { CREATE_USER } from '@/api/apis/user.api';
import { IUserForm } from '@/types/User';
import { UserGender, UserRole } from '@/enum/index'
import { ElMessage, type FormInstance, type FormRules, type UploadRawFile } from 'element-plus';

const userFormRef = ref<FormInstance>()
const userForm = reactive<IUserForm>({
    username: '',
    password: '',
    gender: '1',
    introduction: '',
    avatar: '',
    role: '1'
})
const loading = ref<boolean>(false)
const userRules = reactive<FormRules<IUserForm>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    gender: [
        {
            required: true,
            message: '请选择性别',
            trigger: 'change',
        },
    ],
    role: [
        {
            required: true,
            message: '请选择角色',
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

const onUploadChange = (url: string, file: UploadRawFile) => {
    userForm.avatar = url
    userForm.file = file
}

const handleAddUserClick = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            try {
                loading.value = true
                const formData = new FormData()
                for (const key in userForm) {
                    formData.append(key, userForm[key as keyof IUserForm])
                }
                const res = await CREATE_USER(formData)
                if (res.data) {
                    ElMessage({
                        type: 'success',
                        message: '添加成功'
                    })
                    userForm.avatar = ''
                    userFormRef.value!.resetFields()
                }
            } catch (error) {
                ElMessage({
                    type: 'error',
                    message: '添加失败'
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
</script>