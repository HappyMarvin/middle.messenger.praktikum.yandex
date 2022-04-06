import UsersApi, { IUpdateProfile, IUserApiUpdatePassword } from "../api/users-api";
import { store } from "../utils/store";

export interface IControllerUpdatePasswordData extends IUserApiUpdatePassword {
    newPassword2: string;
}

class UsersController {
    private api: UsersApi;

    constructor() {
        this.api = new UsersApi();
    }

    async updateAvatar(data: FormData) {
        try {
            const userData = await this.api.updateAvatar(data);
            store.set('currentUser', userData)
        } catch (e) {
            console.error(e);
        }
    }

    async updatePassword(data: IControllerUpdatePasswordData) {
        const {newPassword2, ...updateData } = data;
        if (newPassword2 !== updateData.newPassword) {
            alert('Пароли не совпадают!');
            return
        }
        try {
            await this.api.updatePassword(updateData);
            alert('Пароль изменён!')
        } catch (e) {
            alert(e.reason);
        }
    }

    async updateProfile(data: IUpdateProfile) {
        try {
            await this.api.updateProfile(data);
            alert('Данные обновлены!')
        } catch (e) {
            alert(e.reason);
        }
    }

    async search(data: string) {
        try {
            const users = await this.api.search(data);
            store.set('foundedUsers', users)
        } catch (e) {
            console.error(e.reason);
        }
    }
}

export default new UsersController();