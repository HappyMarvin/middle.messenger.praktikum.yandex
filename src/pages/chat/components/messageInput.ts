import compileTemplate from './messageInput.pug';
import './messageInput.css';
import Block from '../../../utils/block';

export interface IMessageInput {
    placeholder:string;
    name: string;
    error: string;
    inputId: string;
    value: string;
    events?: any;
}

export class MessageInput extends Block {
    constructor(props: IMessageInput) {
        super(props);
    }

    value: any;
    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}