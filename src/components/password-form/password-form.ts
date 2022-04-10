
import compileTemplate from './password-form.pug';
import './password-form.css';
import { Form, IFormInput } from '../../utils/form';
import { Button } from '../button/button';
import { TextError } from '../text-error/text-error';

interface IPasswordFormProps {
    title: string;
    onSubmit: any;
    events?: any;
}

const formInputs: Record<string, IFormInput> = {
    'oldPassword': {
        props: {
            placeholder: 'Старый пароль',
            inputType: 'password',
            name: 'oldPassword',
            wrapperClass: 'form-password__text-input-wrapper',
            error: '',
            inputId: 'oldPassword',
            value: ''
        },
        regExp: /^(?=^.{8,40}$)(?=.*[A-Z]).*$/
    },
    'newPassword': {
        props: {
            placeholder: 'Новый пароль',
            inputType: 'password',
            name: 'newPassword',
            wrapperClass: 'form-password__text-input-wrapper',
            error: '',
            inputId: 'newPassword',
            value: ''
        },
        regExp: /^(?=^.{8,40}$)(?=.*[A-Z]).*$/
    },
    'newPassword2': {
        props: {
            placeholder: 'Новый пароль (ещё раз)',
            inputType: 'password',
            name: 'newPassword2',
            wrapperClass: 'form-password__text-input-wrapper',
            error: '',
            inputId: 'newPassword2',
            value: ''
        },
        regExp: /^(?=^.{8,40}$)(?=.*[A-Z]).*$/
    },
}

export class PasswordForm extends Form {
    constructor(props: IPasswordFormProps) {
        props.title = 'Изменить пароль';
        super(props);
    }

    onSubmit(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
        super.onSubmit(e);
        const data = this.getAllInputValues();
        if (this.valid) {
            this.props.onSubmit(data);
        }
    };

    initChildren(): void {
        super.initChildren(formInputs);
        const button = new Button({
            text: 'Сохранить пароль',
            className: 'form-password__button'
        });

        this.children.button = button;
    }

    render() {
        return this.compile(compileTemplate, { ...this.props })
    }
}