

import { defineStore } from 'pinia'
import { User } from '../api/type';


const userInfo = JSON.parse(localStorage.getItem('userStore') || '{}')?.userInfo
export const userStore = defineStore('userStore', {
    state: () => ({
        isGetterRouter: false,
        userInfo: userInfo as Partial<User>
    }),
    persist: {
        key: 'userStore',
        storage: localStorage,
        paths: ['userInfo']
    },
    actions: {
        setRouterState(val: boolean): void {
            this.isGetterRouter = val
        },
        setUser(val: Partial<User>): void {
            this.userInfo = val
        },
    }
})
