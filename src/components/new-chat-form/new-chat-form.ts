
import compileTemplate from './new-chat-form.pug';
import './new-chat-form.css';
import { Form, IFormInput, IFormProps } from '../../utils/form';
import { Button } from '../button/button';
import chatsController from '../../controllers/chats-controller';
import { IAddChatData } from '../../api/chats-api';

interface INewChatFormProps extends IFormProps  {
}

const formInputs: Record<string, IFormInput> = {
    'titleInput': {
        props: {
            placeholder: 'Новый чат',
            inputType: 'text',
            name: 'title',
            wrapperClass: 'form__text-input-wrapper',
            error: '',
            inputId: 'titleInput',
            value: ''
        },
        regExp: /^(?=^.{3,20}$)(?=.*[A-Za-z]).*$/
    }
}

export class NewChatForm extends Form {
    constructor(props: INewChatFormProps) {
        super(props);
    }

    onSubmit(e: Event): void {
        super.onSubmit(e);
        const data = this.getAllInputValues();
        if (this.valid) {
            chatsController.create(data as unknown as IAddChatData);
        }
    };

    initChildren(): void {
        super.initChildren(formInputs);
        const button = new Button({
            text: 'Создать чат',
            className: 'form__button'
        });
        this.children.button = button;
    }

    render() {
        return this.compile(compileTemplate, { ...this.props })
    }
}