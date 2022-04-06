import BaseAPI from "./base-api";

export interface ISignUpData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface ISignInData {
    login: string;
    password: string;
}


export default class AuthApi extends BaseAPI {
    constructor() {
        super('/auth');
    }
    read = undefined;
    update = undefined;
    delete = undefined;
    create = undefined;

    signUp(data: ISignUpData): Promise<unknown> {
        return this.http.post('/signup', data);
    }

    signIn(data: ISignInData): Promise<unknown> {
        return this.http.post('/signin', data);
    }

    logOut(): Promise<unknown> {
        return this.http.post('/logout');
    }

    getUserData() {
        return this.http.get('/user');
    }
}