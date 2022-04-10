import { IFormInput } from "../../utils/form";

const profileInputs: Record<string, IFormInput> = {
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
    'displayNameInput': {
        props: {
            placeholder: 'Отображаемое имя',
            inputType: 'text',
            name: 'display_name',
            wrapperClass: 'form__text-input-wrapper',
            error: '',
            inputId: 'displayNameInput',
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
    'avatarInput': {
        props: {
            placeholder: 'Аватар',
            inputType: 'file',
            name: 'avatar',
            wrapperClass: 'form__text-input-wrapper',
            error: '',
            inputId: 'avatarInput',
            value: '',
        },
        noValidate: true
    },
}

export default profileInputs;