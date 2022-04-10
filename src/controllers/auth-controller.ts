import AuthApi, { ISignInData, ISignUpData } from "../api/auth-api";
import { router } from "../pages";
import { store } from "../utils/store";

export interface IControllerSignUpData extends ISignUpData {
    password2: string;
}

class AuthController {
    private api: AuthApi;

    constructor() {
        this.api = new AuthApi();
    }

    async signUp(data: IControllerSignUpData) {
        const {password2, ...signUpData } = data;
        if (password2 !== signUpData.password) {
            store.set('errorSignUp', 'Пароли не совпадают!')
            return
        }
        try {
            await this.api.signUp(signUpData);
            store.set('errorSignUp', '');
            this.getUserData();
        } catch (e) {
            store.set('errorSignUp', e.reason);
        }
    }

    async signIn(data: ISignInData) {
        try {
            await this.api.signIn(data);
            store.set('errorSignIn', '');
            router.go('/');
        } catch (e) {
            store.set('errorSignIn', e.reason);
        }
    }

    async logOut() {
        await this.api.logOut();
        router.go('/sign-in/');
    }

    async getUserData() {
        const currentRoute = router.getCurrentRoute();
        try {
            const response = await this.api.getUserData();
            store.set('currentUser', response);
            if (currentRoute === '/sign-in/' || currentRoute === '/sign-up/') {
                router.go('/');
            }
        } catch(e) {
            if (currentRoute !== '/sign-in/' && currentRoute !== '/sign-up/') {
                router.go('/sign-in/');
            }
        }
    }
}

export default new AuthController();