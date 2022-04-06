import BaseAPI from "./base-api";

export interface IUserApiUpdateProfile {
    firstName: string
    secondName: string
    displayName: string
    login: string
    email: string
    phone: string
}

export interface IUserApiUpdatePassword {
    oldPassword: string;
    newPassword: string
}

export interface IUpdateProfile {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}


export default class UserApi extends BaseAPI {
    constructor() {
        super('/user');
    }
    read = undefined;
    update = undefined;
    delete = undefined;
    create = undefined;

    async updateAvatar(data: FormData) {
        return await this.http.put('/profile/avatar', data, 'multipart/form-data');
    }

    async updatePassword(data: IUserApiUpdatePassword) {
        return await this.http.put('/password', data);
    }

    async updateProfile(data: IUpdateProfile) {
        return await this.http.put('/profile', data);
    }

    async search(login: string) {
        return await this.http.post('/search', {login});
    }
}