import Block from '../../utils/block';
import compileTemplate from './text-error.pug';
import './text-error.css';

export interface ITextError {
    text: string;
    className?: string;
    events?: any;
}

export class TextError extends Block {
    constructor(props: ITextError) {
        super(props);
    }

    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}