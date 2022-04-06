import Block from '../../utils/block';
import compileTemplate from './textInput.pug';
import './textInput.css';

export interface ITextInputProps {
    placeholder:string;
    inputType: string;
    name: string;
    wrapperClass:string;
    error: string;
    inputId: string;
    value: string;
    events?: any;
    disabled?: boolean;
}

export class TextInput extends Block {
    constructor(props: ITextInputProps) {
        super(props);
    }
    value: any;
    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}