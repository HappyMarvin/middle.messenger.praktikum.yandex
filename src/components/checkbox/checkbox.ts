import Block, { IBlockProps } from '../../utils/block';
import compileTemplate from './checkbox.pug';
import './checkbox.css';

export interface ICheckboxProps extends IBlockProps {
    name: string;
    labelText: string;
    value: string;
}

export class Checkbox extends Block {
    constructor(props: ICheckboxProps) {
        super(props);   
    }

    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}