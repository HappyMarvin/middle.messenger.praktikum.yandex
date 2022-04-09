import { Router } from './../utils/router';
import './index.css'
import SignUpForm from './sign-up/signUpForm';
import LoginForm from './login/loginForm';
import ProfileForm from './profile/profileForm';
import MainChat from './chat/components/mainChat';
import { ErrorBlock } from '../components/error-block/errorBlock';
import authController from '../controllers/auth-controller';

export const router = new Router('#app');

document.addEventListener('DOMContentLoaded', () => {
    router.use('/sign-up/', SignUpForm);
    router.use('/sign-in/', LoginForm);
    router.use('/profile/', ProfileForm);
    router.use('/', MainChat);
    router.use('*', ErrorBlock, {
        error: '404',
        text: 'Не туда попали.'
    });
    router.start();
    authController.getUserData();
})

