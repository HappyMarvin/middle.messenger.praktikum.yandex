import compileTemplate from './chatMessage.pug';
import './chatMessage.css';
import Block, { IBlockProps } from '../../../utils/block';

export interface IChatMessageProps extends IBlockProps {
    text: string;
    isOur: boolean;
}

export class ChatMessage extends Block {
    constructor(props: IChatMessageProps) {
        super(props);
    }

    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}