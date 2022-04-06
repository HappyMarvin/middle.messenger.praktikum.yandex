import Block from '../../utils/block';
import compileTemplate from './form-avatar.pug';
import './form-avatar.css';
import { RESOURSEC_URL } from '../../utils/http';

export interface IFromAvatarProps {
    src?: string;
    events?: any;
}


export class FromAvatar extends Block {
    constructor(props: IFromAvatarProps) {
        if (!props.src) {
            props.src = "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1"
        } else {
            props.src = RESOURSEC_URL + props.src;
        }
        props.src = "url('" + props.src + "')"
        super(props);
    }

    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}