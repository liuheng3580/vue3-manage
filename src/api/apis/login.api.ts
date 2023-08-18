import request from "../http";
import { ILoginParams, ILoginBack } from "../type";



// 登录
export const LOGIN = (data: ILoginParams) => {
    return request<ILoginBack>('/api/user/login', { method: 'post', data })
}

// // 获取所有标签
// export const getAllTags = async (userId: string) => {
//     return request<IAllTagsBack>('/api/spf-cc/c/evaluation/home/findUserAndTgas', { params: { userId } });
// }