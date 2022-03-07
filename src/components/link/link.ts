import Block from '../../utils/block';
import compileTemplate from './link.pug';
import './link.css';

export interface ILinkProps {
    link: string;
    text: string;
    className?: string;
}

export class Link extends Block {
    constructor(props: ILinkProps) {
        super(props);
    }

    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}