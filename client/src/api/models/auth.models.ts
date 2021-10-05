export interface LoginApiModel {
    userName: string;
    password: string;
}

export interface RegisterApiModel {
    email: string | null;
    mobileNumber: string | null;
    password: string;
    repeatPassword: string;
}

export interface ForgetPasswordApiModel {
    userName: string;
}
