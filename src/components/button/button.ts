import Block from '../../utils/block';
import compileTemplate from './button.pug';
import './button.css';

export interface IButtonProps {
    text: string;
    className: string;
    events?: any;
}

export class Button extends Block {
    constructor(props: IButtonProps) {
        super(props);
    }

    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}