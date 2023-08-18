<template>
    <el-card class="box-card">
        <el-page-header :icon="null">
            <template #title>
                <span>用户管理</span>
            </template>
            <template #content>
                <span class="text-large font-600 mr-3">用户列表</span>
            </template>
        </el-page-header>
        <el-table :data="tableData" class="w-full mt-6">
            <el-table-column type="index" width="140" />
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="avatar" label="头像">
                <template #default="scope">
                    <el-avatar :src="'http://localhost:8111' + scope.row.avatar" :size="40" />
                </template>
            </el-table-column>
            <el-table-column prop="role" label="角色">
                <template #default="scope">
                    <el-tag :type="UserRoleTag[scope.row.role as UserRoleType]">{{ UserReserveRole[scope.row.role as
                        UserRoleType]
                    }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="handleEditRow(scope.row)">
                        编辑
                    </el-button>
                    <el-popconfirm title="确定要删除么" @confirm="handleDeleteRow(scope.row)" cancel-button-text="取消"
                        confirm-button-text="确认">
                        <template #reference>
                            <el-button link type="primary" size="small">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="mt-5 ml-auto w-fit" @current-change="onCurrentChange" :default-page-size="page.pageSize"
            background layout="prev, pager, next" :total="page.total" />
    </el-card>
    <EditUserDialog v-model:dialogVisible="dialogVisible" :userInfo="curUserInfo" @refresh="getUserList" />
</template>

<script setup lang='ts'>
import { DELETE_USER, GET_USER_LIST } from '@/api/apis/user.api';
import { IUser, UserRoleType, ICurEditUser } from '@/types/User';
import EditUserDialog from './components/EditUserDialog.vue'
import { ElMessage } from 'element-plus';
const tableData = ref<IUser[]>([])
const dialogVisible = ref<boolean>(false)
const curUserInfo = reactive<ICurEditUser>({
    username: '',
    password: '',
    role: '1',
    introduction: '',
    id: 0
})
const UserReserveRole = {
    '1': '管理员',
    '2': '编辑'
}

const UserRoleTag = {
    '1': 'success',
    '2': ''
}
const page = reactive({
    pageSize: 5,
    pageNum: 1,
    total: 0
})

const getUserList = async () => {
    try {
        const res = await GET_USER_LIST({ pageSize: page.pageSize, pageNum: page.pageNum })
        page.total = res.data.total
        tableData.value = res.data.list
    } catch (error) {
        console.log('error', error)
    }
}
const onCurrentChange = async (val: number) => {
    page.pageNum = val;
    await getUserList()
}

const handleEditRow = (row: IUser) => {
    dialogVisible.value = true
    curUserInfo.username = row.username
    curUserInfo.password = row.password
    curUserInfo.role = row.role
    curUserInfo.introduction = row.introduction
    curUserInfo.id = row.id
}
const handleDeleteRow = async (row: IUser) => {
    try {
        const res = await DELETE_USER(row.id)
        if (res.code == 1) {
            ElMessage({
                type: 'success',
                message: '删除成功'
            })
            await getUserList()
        }
    } catch (error) {
        console.log('error', error)
    }

}
onMounted(() => {
    getUserList()
})
</script>
