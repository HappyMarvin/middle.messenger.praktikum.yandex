import compileTemplate from './404.pug';
import { ErrorBlock, IErrorBlockProps } from "../../components/error-block/errorBlock";
import Block from "../../utils/block";
import { Link } from '../../components/link/link';

export class NotFoundError extends Block {
    constructor(props: IErrorBlockProps) {
        super(props);
    }

    initChildren(): void {
        super.initChildren();
        const errorBlock = new ErrorBlock({
            error: '404',
            text: 'Не туда попали'
        });
        const link = new Link({
            link: './../login/login.html',
            text: 'К чатам',
        });

        this.children.link = link;
        this.children.errorBlock = errorBlock;
    }

    render() {
        return this.compile(compileTemplate, { ...this.props })
    }
}
