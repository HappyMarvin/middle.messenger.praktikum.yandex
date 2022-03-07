
import compileTemplate from './profileForm.pug';
import './profileForm.css';
import { Form, IFormInput, IFormProps } from '../../../utils/form';
import { Button } from '../../../components/button/button';

const formInputs: Record<string, IFormInput> = {
    'loginInput': {
        props: {
            placeholder: 'Логин',
            inputType: 'text',
            name: 'login',
            wrapperClass: 'form__text-input-wrapper',
            error: '',
            inputId: 'loginInput',
            value: 'Bogdan'
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
            value: 'PasswordBogdan'
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
            value: 'ey.bogdan@yazdes.ru'
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
            value: 'Bogdan'
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
            value: 'Ey'
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
            value: '+790070050'
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
            value: 'PasswordBogdan'
        },
        regExp: /^(?=^.{8,40}$)(?=.*[A-Z]).*$/
    },
    'avatar': {
        props: {
            placeholder: 'Аватар',
            inputType: 'text',
            name: 'avatar',
            wrapperClass: 'form__text-input-wrapper',
            error: '',
            inputId: 'avatarInput',
            value: 'https://YaBogdan.ru/me.jpg'
        },
        regExp: /^.{1,}$/
    },
}

export class ProfileForm extends Form {
    constructor(props: IFormProps) {
        super(props);
    }

    initChildren(): void {
        super.initChildren(formInputs);
        const button = new Button({
            text: 'Сохранить',
            className: 'form__button',
        });

        this.children.button = button;
    }

    render() {
        return this.compile(compileTemplate, { ...this.props })
    }
}