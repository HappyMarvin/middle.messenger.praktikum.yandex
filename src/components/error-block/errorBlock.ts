import Block from '../../utils/block';
import compileTemplate from './errorBlock.pug';
import './errorBlock.css';
import { Link } from '../link/link';

export interface IErrorBlockProps {
    error: string;
    text: string;
}

export class ErrorBlock extends Block {
    constructor(props: IErrorBlockProps) {
        super(props);
    }

    initChildren(): void {
        const link = new Link({
            link: './../login/login.html',
            text: 'К чатам',
        });

        this.children.link = link;
    }

    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}