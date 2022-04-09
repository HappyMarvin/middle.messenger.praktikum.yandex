
import compileTemplate from './profileForm.pug';
import './profileForm.css';
import { Form, IFormProps } from '../../utils/form';
import { Button } from '../../components/button/button';
import { Link } from '../../components/link/link';
import AuthController from '../../controllers/auth-controller'
import { IUser, withUser } from '../../utils/store';
import profileInputs from './profileInputs';
import usersController, { IControllerUpdatePasswordData } from '../../controllers/users-controller';
import { FromAvatar } from '../../components/form-avatar/form-avatar';
import { PasswordForm } from '../../components/password-form/password-form';
import { IUpdateProfile } from '../../api/users-api';

export interface IProfileFormProps extends IFormProps, IUser{

}

class ProfileForm extends Form {
    constructor(props: IProfileFormProps) {
        super(props);
    }

    initChildren(): void {
        super.initChildren(getProfileFormInputs(this.props));
        this.children.avatarInput.setProps({
            events: {
                change: (e: Event) => this.onUpdateAvatar(e)
            }
        })
        const button = new Button({
            text: 'Сохранить',
            className: 'form__button',
        });

        const avatarSubmit = new Button({
            text: 'Загрузить аватар',
            className: 'form__button',
            events: {
                click: (e: Event) => this.onUpdateAvatar(e)
            }
        });

        const logOutLink = new Link({
            link: '#',
            text: 'Выйти',
            className: 'form__link',
            events: {
                click: (e: Event) => this.onLogOut(e)
            }
        });

        const backLink = new Link({
            link: '../',
            text: 'Вернуться к чатам',
            className: 'form__link',
        });

        const formAvatar = new FromAvatar({
            src: this.props?.avatar
        });

        const passwordForm = new PasswordForm({
            title: 'Пароль',
            onSubmit: this.onUpdatePassword
        });

        this.children.passwordForm = passwordForm;
        this.children.formAvatar = formAvatar;
        this.children.avatarSubmit = avatarSubmit;
        this.children.backLink = backLink;
        this.children.logOutLink = logOutLink;
        this.children.button = button;
    }

    onLogOut = async (e: Event) => {
        e.preventDefault();
        await AuthController.logOut()
    }

    onSubmit(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
        super.onSubmit(e);
        const data = this.getAllInputValues();
        if (this.valid) {
            usersController.updateProfile(data as unknown as IUpdateProfile);
        }
    }

    onUpdateAvatar = async (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        const { files }: { files: FileList | null } = e.target as HTMLInputElement;
        if (!files?.length) {
            return;
        }
        const [file] = files;
        const formData = new FormData();
        formData.append('avatar', file);
        usersController.updateAvatar(formData)
    }

    onUpdatePassword = async (data: Record<string, unknown>) => {
        usersController.updatePassword(data as unknown as IControllerUpdatePasswordData)
    }

    render() {
        return this.compile(compileTemplate, { ...this.props })
    }
}

export default withUser(ProfileForm);

const getProfileFormInputs = (props: IProfileFormProps) => {
    profileInputs.loginInput.props.value = props?.login;
    profileInputs.emailInput.props.value = props?.email;
    profileInputs.phoneInput.props.value = props?.phone;
    profileInputs.firstNameInput.props.value = props?.first_name;
    profileInputs.secondNameInput.props.value = props?.second_name;
    profileInputs.displayNameInput.props.value = props?.display_name;
    return profileInputs;
}