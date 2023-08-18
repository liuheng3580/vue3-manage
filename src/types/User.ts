

import type { ICenterRuleForm } from './Center'
import type { LoginRuleForm } from './Login'



export type IUserForm = ICenterRuleForm & Pick<LoginRuleForm, 'password'>

export type IUser = ICenterRuleForm & { id: number, password: string }



export type UserRoleType = '1' | '2'

export interface ICurEditUser {
    id: number
    role: UserRoleType;
    password: string
    introduction: string
    username: string
}