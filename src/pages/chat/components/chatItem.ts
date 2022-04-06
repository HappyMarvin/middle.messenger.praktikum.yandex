import compileTemplate from './chatItem.pug';
import './chatItem.css';
import Block, { IBlockProps } from '../../../utils/block';

export interface IChatItemProps extends IBlockProps {
    name: string;
    our?: boolean;
    id: number;
}

export class ChatItem extends Block {
    constructor(props: IChatItemProps) {
        super(props);
    }

    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}