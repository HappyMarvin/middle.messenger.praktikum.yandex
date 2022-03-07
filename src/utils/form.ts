import { ITextInputProps, TextInput } from "../components/textInput/textInput";
import Block from "./block";


export interface IFormProps {
    title: string;
    className?: string;
    events?: Record<string, any>
}


export interface IFormInput {
    regExp?: RegExp;
    component?: Block;
    props: ITextInputProps;
}

export class Form extends Block {
    inputs: Record<string, IFormInput>;
    constructor(props: IFormProps) {
        if (!props.events) {
            props.events = {};
        }
        props.events.submit = (e: Event) => {
                e.preventDefault();
                this.onSubmit(e);
        };
        super(props);
    }

    initChildren(formInputs: Record<string, IFormInput>, inputComponent: any = TextInput): void {
        this.inputs = this.createInputs(formInputs, inputComponent);
        for (let input in this.inputs) {
            this.children[input] = this.inputs[input].component as Block;
        }
    }

    createInputs(inputs: Record<string, IFormInput>, inputComponent: any = TextInput): any {
        for (let key in inputs) {
            inputs[key].component = new inputComponent(inputs[key].props);
        }
        return inputs;
    }

    componentDidMount(props: any): void {
        this.addInputsEvents();
    }

    checkInput(e: Event | null, input: IFormInput, inputElement: HTMLInputElement) {
        if (input.regExp?.test(inputElement.value) && input.props.error === '') {
            return true
        }
        if (!input.regExp?.test(inputElement.value) && input.props.error !== '') {
            return false
        }
        let result = false;
        if (input.regExp?.test(inputElement.value)) {
            input.component?.setProps({
                ...input.props,
                error: ''
            })
            input.props.error = '';
            this.addInputValidation(input);
            result = true;
        } else if (!input.regExp?.test(inputElement.value)) {
            input.component?.setProps({
                ...input.props,
                error: 'Неверный формат'
            })
            input.props.error = 'Неверный формат';
            this.addInputValidation(input);
        }
        if (e?.type === 'input' || e?.type === 'focus'  || e?.type === 'blur') {
            const el = document.getElementById(input.props.inputId) as HTMLInputElement;
            el.focus();
            el.selectionStart = el.value.length;
        }
        return result
    }

    addInputEvent(input: IFormInput) {
        const inputElement = document.getElementById(input.props.inputId) as HTMLInputElement;
        inputElement.addEventListener('input', (e) => {
            input.props.value = (e.target as HTMLInputElement).value;
        })
        this.addInputValidation(input);
    }

    addInputsEvents() {
        for (let key in this.inputs) {
            const input = this.inputs[key]
            this.addInputEvent(input);
        }
    }

    addInputValidation(input: IFormInput) {
        const inputElement = document.getElementById(input.props.inputId) as HTMLInputElement;
        inputElement?.addEventListener('focus', (e) => {
            this.checkInput(e, input, inputElement);
        });
        inputElement.addEventListener('input', (e) => {
            input.props.value = (e.target as HTMLInputElement).value;
            this.checkInput(e, input, inputElement);
        })
        inputElement.addEventListener('blur', (e) => {
            input.props.value = (e.target as HTMLInputElement).value;
            this.checkInput(e, input, inputElement);
        })
    }


    onSubmit(e: Event) {
        e.preventDefault;
        const valid = this.checkAllInputs()
        if (!valid) {
            console.log('Форма заполнена не верно!');
        } else {
            console.log(this.getAllInputValues());
        }
    }

    checkAllInputs() {
        let result = true;
        for (let input in this.inputs) {
            const el = document.getElementById(this.inputs[input].props.inputId) as HTMLInputElement;
            if (!this.checkInput(null, this.inputs[input], el)) {
                result = false;
            };
        }
        return result;
    }

    getAllInputValues(): Record<string, string>[] {
        const values = []
        for (let input in this.inputs) {
            const value = this.inputs[input].props.value;
            const name = this.inputs[input].props.name;
            values.push({
                name,
                value
            })
        }
        return values
    }
}