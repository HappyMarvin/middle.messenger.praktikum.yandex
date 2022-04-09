import Block from '../../utils/block';
import compileTemplate from './form.pug';
import './form.css';
import { Button } from '../../utils/comp/button';

interface IFormProps {
    title: string;
    events?: {
        click: () => void;
    }
}

export class Form extends Block {
    constructor(props: IFormProps) {
        super(props);

    }

    initChildren(): void {
        this.children.button = new Button({
            label: 'click it!'
        });
    }

    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}