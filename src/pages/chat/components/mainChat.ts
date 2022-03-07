import compileTemplate from './mainChat.pug';
import './mainChat.css';
import Block from '../../../utils/block';
import { ChatItem } from './chatItem';
import { ChatForm } from './chatForm';

export interface IMainChatProps {

}

export class MainChat extends Block {
    constructor(props: IMainChatProps) {
        super(props);
    }

    initChildren(): void {
        const chatItem = new ChatItem({
            count: 0,
            name: 'Mike',
            text: 'Hello!',
            time: '12:53'
        });
        const chatForm = new ChatForm({
            title: 'Сообщение'
        });

        this.children.chatItem = chatItem;
        this.children.chatForm = chatForm;
    }

    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}