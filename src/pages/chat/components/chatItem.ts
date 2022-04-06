import compileTemplate from './chatItem.pug';
import './chatItem.css';
import Block from '../../../utils/block';

export interface IChatItemProps {
    name: string;
    text: string;
    time: string;
    count: number;
    our?: boolean;
}

export class ChatItem extends Block {
    constructor(props: IChatItemProps) {
        super(props);
    }

    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}