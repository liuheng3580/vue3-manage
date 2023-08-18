export interface ICenterRuleForm {
    username: string;
    role: '1' | '2';
    gender: '1' | '2';
    introduction: string
    avatar: string;
    file?: any
    createdAt?: Date;
}