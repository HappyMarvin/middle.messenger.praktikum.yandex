
import compileTemplate from './signUpForm.pug';
import './signUpForm.css';
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

export class SignUpForm extends Form {
    constructor(props: IFormProps) {
        super(props);
    }

    initChildren(): void {
        super.initChildren(formInputs);
        const button = new Button({
            text: 'Зарегистрироваться',
            className: 'form__button',
        });
        const link = new Link({
            link: './../login/login.html',
            text: 'Войти',
            className: 'form__link'
        });

        this.children.button = button;
        this.children.link = link;
    }

    render() {
        return this.compile(compileTemplate, { ...this.props })
    }
}