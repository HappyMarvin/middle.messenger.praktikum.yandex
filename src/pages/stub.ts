import compileTemplate from './stub.pug';
import './stub.css';
import Block from '../utils/block';

export interface ILinkProps {}

export class Stub extends Block {
    constructor(props: ILinkProps) {
        super(props);
    }

    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}