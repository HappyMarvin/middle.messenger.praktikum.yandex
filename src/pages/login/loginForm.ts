
import compileTemplate from './loginForm.pug';
import './loginForm.css';
import { Form, IFormInput } from '../../utils/form';
import { Button } from '../../components/button/button';
import { Link } from '../../components/link/link';
import AuthController from '../../controllers/auth-controller'
import { ISignInData } from '../../api/auth-api';
import { TextError } from '../../components/text-error/text-error';
import { IErrorSignIn, withSignInError } from '../../utils/store';

interface IFormProps extends IErrorSignIn {
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

class LoginForm extends Form {
    constructor(props: IFormProps) {
        props.title = 'Логин';
        super(props);
    }

    onSubmit(e: Event): void {
        super.onSubmit(e);
        const data = this.getAllInputValues();
        if (this.valid) {
            AuthController.signIn(data as unknown as ISignInData);
        }
    };

    initChildren(): void {
        super.initChildren(formInputs);
        const button = new Button({
            text: 'Авторизоваться',
            className: 'form__button'
        });
        const link = new Link({
            link: './../sign-up/',
            text: 'Нет аккаунта?',
            className: 'form__link'
        });

        const loginError = new TextError({
            text: this.props?.errorSignIn,
            className: 'form__link'
        });

        this.children.loginError = loginError;
        this.children.button = button;
        this.children.link = link;
    }

    render() {
        return this.compile(compileTemplate, { ...this.props })
    }
}

export default withSignInError(LoginForm);