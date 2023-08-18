import { IUser } from "@/types/User";

// login
export interface ILoginParams {
    username: string;
    password: string
}

export type User = {
    avatar: string;
    gender: '1' | '2';
    introduction: string;
    role: '1' | '2';
    username: string;
}
export interface ILoginBack {
    token: string,
    user: Partial<User>
}


// 用户

export interface IUserParams {
    pageSize: number;
    pageNum: number;
}

export interface IUserListBack {
    pageSize: number;
    pageNum: number;
    total: number;
    list: IUser[];
}

export interface IUpdateUserParams {
    introduction: string;
    role: '1' | '2';
    username: string;
    password: string
}