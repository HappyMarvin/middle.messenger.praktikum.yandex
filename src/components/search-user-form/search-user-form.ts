
import compileTemplate from './search-user-form.pug';
import './search-user-form.css';
import { Form, IFormInput, IFormProps } from '../../utils/form';
import chatsController from '../../controllers/chats-controller';
import { IAddChatData } from '../../api/chats-api';
import usersController from '../../controllers/users-controller';

interface ISearchUserFormProps extends IFormProps  {
}

const formInputs: Record<string, IFormInput> = {
    'searchInput': {
        props: {
            placeholder: 'Найти пользователя.',
            inputType: 'text',
            name: 'search',
            wrapperClass: 'form__text-input-wrapper',
            error: '',
            inputId: 'searchInput',
            value: ''
        },
        noValidate: true
    }
}

export class SearchUserForm extends Form {
    constructor(props: ISearchUserFormProps) {
        super(props);
    }

    onSubmit(e: Event): void {
        super.onSubmit(e);
        const target = e.target as HTMLFormElement;
        if (this.valid) {
            usersController.search(target.search.value as string);
        }
    };

    initChildren(): void {
        super.initChildren(formInputs);
    }

    render() {
        return this.compile(compileTemplate, { ...this.props })
    }
}