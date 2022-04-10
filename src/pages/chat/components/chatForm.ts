
import compileTemplate from './chatForm.pug';
import './chatForm.css';
import { Form, IFormInput } from '../../../utils/form';
import { Button } from '../../../components/button/button';
import { MessageInput } from './messageInput';
import messageController from '../../../controllers/message-controller';

interface IChatFormProps {
    title: string;
    events?: any
}

const formInputs: Record<string, IFormInput> = {
    'messageInput': {
        props: {
            placeholder: 'Сообщение',
            inputType: 'text',
            name: 'message',
            wrapperClass: 'chat-form__text-input-wrapper',
            error: '',
            inputId: 'messageInput',
            value: ''
        },
        regExp: /^.{1,}$/
    }
}

export class ChatForm extends Form {
    constructor(props: IChatFormProps) {
        super(props);
    }

    initChildren(): void {
        super.initChildren(formInputs, MessageInput);
    }

    onSubmit(e: Event): void {
        super.onSubmit(e);
        if (this.valid) {
            const message = this.getAllInputValues().message;
            messageController.addMessage(message as string);
        }
    }

    render() {
        return this.compile(compileTemplate, { ...this.props })
    }
}