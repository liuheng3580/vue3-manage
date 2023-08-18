import { ElMessage } from 'element-plus'
import axios, { AxiosRequestConfig, Method } from 'axios';

// 定义接口
interface PendingType {
    url?: string;
    method?: Method;
    params: any;
    data: any;
    cancel: (str: string) => void;
}
interface Result<T = any> {
    code: number;
    message: string;
    data: T;
}
// 取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken
const instance = axios.create({
    baseURL: '',
    withCredentials: false,
    timeout: 50000
});
// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
    for (const key in pending) {
        const item: number = +key;
        const list: PendingType = pending[key];
        // 当前请求在数组中存在时执行函数体
        if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
            // 执行取消操作
            list.cancel('操作太频繁，请稍后再试');
            // 从数组中移除记录
            pending.splice(item, 1);
        }
    }
};
instance.interceptors.request.use((request: any) => {
    removePending(request);
    request.cancelToken = new CancelToken((c) => {
        pending.push({ url: request.url, method: request.method, params: request.params, data: request.data, cancel: c });
    });
    request.headers['TOKEN'] = localStorage.getItem('token')
    return request;
},
    (error: any) => {
        return Promise.reject(error);
    });
instance.interceptors.response.use((response: any) => {
    removePending(response.config);
    const errorCode = response?.data?.code;
    if (errorCode != 1) {
        ElMessage({
            message: response.data.message || "网络错误",
            type: 'warning',
        })
    }
    return response.data
})

const request = <T>(url: string, option: AxiosRequestConfig): Promise<Result<T>> => {
    const { method = 'get', params, data, headers } = option;
    return new Promise<Result<T>>((resolve, reject) => {
        instance({
            url,
            method: method.toLowerCase(),
            headers,
            [method.toLowerCase() === 'get' ? 'params' : 'data']: params || data
        }).then((res: any) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })

}

export default request;