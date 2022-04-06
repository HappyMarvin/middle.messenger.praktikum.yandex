
import compileTemplate from './signUpForm.pug';
import './signUpForm.css';
import { Form, IFormInput } from '../../utils/form';
import { Button } from '../../components/button/button';
import { Link } from '../../components/link/link';
import AuthController, { IControllerSignUpData } from '../../controllers/auth-controller'
import { IErrorSignUp, withSignUpError } from '../../utils/store';
import { TextError } from '../../components/text-error/text-error';

export interface IProfileFormProps extends IErrorSignUp {
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
    },
    'emailInput': {
        props: {
            placeholder: 'Почта',
            inputType: 'text',
            name: 'email',
            wrapperClass: 'form__text-input-wrapper',
            error: '',
            inputId: 'emailInput',
            value: ''
        },
        regExp: /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{1,})$/
    },
    'firstNameInput': {
        props: {
            placeholder: 'Имя',
            inputType: 'text',
            name: 'first_name',
            wrapperClass: 'form__text-input-wrapper',
            error: '',
            inputId: 'firstNameInput',
            value: ''
        },
        regExp: /^(([a-zA-ZА-Яа-я])|([a-zа-я]+))(\s)?([a-zа-я]*)$/
    },
    'secondNameInput': {
        props: {
            placeholder: 'Фамилия',
            inputType: 'text',
            name: 'second_name',
            wrapperClass: 'form__text-input-wrapper',
            error: '',
            inputId: 'secondNameInput',
            value: ''
        },
        regExp: /^(([a-zA-ZА-Яа-я])|([a-zа-я]+))(\s)?([a-zа-я]*)$/
    },
    'phoneInput': {
        props: {
            placeholder: 'Телефон',
            inputType: 'phone',
            name: 'phone',
            wrapperClass: 'form__text-input-wrapper',
            error: '',
            inputId: 'phoneInput',
            value: ''
        },
        regExp: /(?=^.{10,15}$)(^[+\d]\d+(?:[ ]\d+)*$)/
    },
    'passwordInput2': {
        props: {
            placeholder: 'Пароль (ещё раз)',
            inputType: 'password',
            name: 'password2',
            wrapperClass: 'form__text-input-wrapper',
            error: '',
            inputId: 'passwordInput2',
            value: ''
        },
        regExp: /^(?=^.{8,40}$)(?=.*[A-Z]).*$/
    },
}

class SignUpForm extends Form {
    constructor(props: IProfileFormProps) {
        props.title = 'Регистрация';
        super(props);
    }

    initChildren(): void {
        super.initChildren(formInputs);
        const button = new Button({
            text: 'Зарегистрироваться',
            className: 'form__button',
        });
        const link = new Link({
            link: './../sign-in/',
            text: 'Войти',
            className: 'form__link'
        });

        const SignUpTextError = new TextError({
            text: this.props?.errorSignUp,
            className: 'form__link'
        });

        this.children.signUpTextError = SignUpTextError;
        this.children.button = button;
        this.children.link = link;
    }

    async onSubmit(e: Event): Promise<void> {
        super.onSubmit(e);
        const data = this.getAllInputValues();
        if (this.valid) {
            AuthController.signUp(data as unknown as IControllerSignUpData);
        }
    }

    render() {
        return this.compile(compileTemplate, { ...this.props })
    }
}

export default withSignUpError(SignUpForm);