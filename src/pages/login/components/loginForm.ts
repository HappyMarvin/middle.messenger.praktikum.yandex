
import compileTemplate from './loginForm.pug';
import './loginForm.css';
import { Form, IFormInput } from '../../../utils/form';
import { Button } from '../../../components/button/button';
import { Link } from '../../../components/link/link';

interface IFormProps {
    title: string;
    events?: any
}

const formInputs: Record<string, IFormInput> = {
    'loginInput': {
        props: {
            placeholder: 'Логин',
            inputType: 'text',
            name: 'login',
            wrapperClass: 'form__text-input-wrapper',
            error: '',
            inputId: 'loginInput',
            value: ''
        },
        regExp: /^(?=^.{3,20}$)(?=.*[A-Za-z]).*$/
    },
    'passwordInput': {
        props: {
            placeholder: 'Пароль',
            inputType: 'password',
            name: 'password',
            wrapperClass: 'form__text-input-wrapper',
            error: '',
            inputId: 'passwordInput',
            value: ''
        },
        regExp: /^(?=^.{8,40}$)(?=.*[A-Z]).*$/
    }
}

export class LoginForm extends Form {
    constructor(props: IFormProps) {
        super(props);
    }

    initChildren(): void {
        super.initChildren(formInputs);
        const button = new Button({
            text: 'Авторизоваться',
            className: 'form__button'
        });
        const link = new Link({
            link: './../sign-up/signUp.html',
            text: 'Нет аккаунта?',
            className: 'form__link'
        });

        this.children.button = button;
        this.children.link = link;
    }

    render() {
        return this.compile(compileTemplate, { ...this.props })
    }
}