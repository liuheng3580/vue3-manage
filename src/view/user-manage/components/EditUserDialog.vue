<template>
    <el-dialog :model-value="dialogVisible" title="编辑用户" @opened="onOpened" width="40%">
        <el-form ref="userFormRef" :model="userForm" :rules="userRules" label-width="120px" status-icon>
            <el-form-item label="用户名" prop="username" placeholder="请输入用户名">
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password" placeholder="请输入密码">
                <el-input type="password" v-model="userForm.password" />
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

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancelClick">取消</el-button>
                <el-button type="primary" @click="handelConfirmClick">
                    确认修改
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import type { FormInstance, FormRules } from 'element-plus'
import { ICurEditUser, IUserForm } from '@/types/User';
import { UserRole } from '@/enum/index'
import { UPDATE_USER } from '../../../api/apis/user.api';
import { ElMessage } from 'element-plus';

type EditForm = Pick<IUserForm, 'username' | 'password' | 'introduction' | 'role'>
const props = withDefaults(defineProps<{ dialogVisible: boolean, userInfo: ICurEditUser }>(), {

})
const emit = defineEmits<{
    'update:dialogVisible': [value: boolean],
    refresh: []
}>()

const userFormRef = ref<FormInstance>()
const userForm = reactive<ICurEditUser>({
    username: '',
    password: '',
    introduction: '',
    role: '1',
    id: 0
})

const userRules = reactive<FormRules<EditForm>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
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

})

const handleCancelClick = () => {
    emit('update:dialogVisible', false)
}

const onOpened = () => {
    userForm.username = props.userInfo.username
    userForm.password = props.userInfo.password
    userForm.introduction = props.userInfo.introduction
    userForm.role = props.userInfo.role
    userForm.id = props.userInfo.id
}
const handelConfirmClick = async () => {
    try {
        const res = await UPDATE_USER(userForm)
        if (res.code === 1) {
            ElMessage({
                type: 'success',
                message: '更新成功'
            })
            emit('refresh')
            handleCancelClick()
        }
    } catch (error) {
        console.log('error', error)
    }
}
</script>

