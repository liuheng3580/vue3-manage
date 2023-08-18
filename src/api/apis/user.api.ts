

import request from "../http";
import { IUserParams, User, IUserListBack, IUpdateUserParams } from "../type";

// 上传更新
export const UPLOAD = (data: FormData) => {
    return request<User>('/api/user/upload', {
        method: 'post', data, headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

// 创建用户
export const CREATE_USER = (data: FormData) => {
    return request<User>('/api/user/create', {
        method: 'post', data, headers: {
            "Content-Type": "multipart/form-data"
        }
    })

}


// 获取用户列表
export const GET_USER_LIST = (params: IUserParams) => {
    return request<IUserListBack>('/api/user/list', {
        params
    })
}


// 删除用户
export const DELETE_USER = (id: number) => {
    return request<boolean>('/api/user/delete', {
        params: { id }
    })
}


// 更新用户
export const UPDATE_USER = (data: IUpdateUserParams) => {
    return request<boolean>('/api/user/update', {
        data,
        method: 'post'
    })
}


