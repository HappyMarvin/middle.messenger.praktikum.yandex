import compileTemplate from './addUserPopup.pug';
import './addUserPopup.css';
import Block, { IBlockProps } from '../../../utils/block';
import { SearchUserForm } from '../../../components/search-user-form/search-user-form';
import { IUser, store } from '../../../utils/store';
import { Checkbox } from '../../../components/checkbox/checkbox';
import { Button } from '../../../components/button/button';

export interface IAddUserPopupProps extends IBlockProps {
    isOpen: boolean;
    users?: IUser[];
    onAddUser: any;
}

export class AddUserPopup extends Block {
    checkedUsers: string[];
    constructor(props: IAddUserPopupProps) { 
        super(props);
        this.checkedUsers = [];
    }

    initChildren(props: any): void {
        this.children.searchForm = new SearchUserForm({})   
        if (props?.users) {
            const userList = props?.users.map((user: IUser) => new Checkbox({
                labelText: user.login,
                name: 'founded-user',
                value: user.id,
                events: {
                    'click': (e: Event) => this.onCheckboxClick(e)
                }
            }))
            this.children.userList = userList;
        }  

        const addUserButton = new Button({
            text: 'Добавить',
            className: 'add-user-popup__button',
            type: 'button',
            events: {
                'click': () => {
                    props.onAddUser(this.checkedUsers)
                }
            }
        })
        const closeButton = new Button({
            text: 'x',
            className: 'add-user-popup__close-button',
            type: 'button',
            events: {
                'click': () => {
                    store.set('isOpenPopups', {
                        addUsersPopup: false
                    })
                }
            }
        })
        this.children.closeButton = closeButton;
        this.children.addUserButton = addUserButton;
    }

    onCheckboxClick = (e: Event) => {
        const target = e.target as HTMLInputElement
        if (target.type === 'checkbox') {
            e.stopPropagation();
            if (target.checked) {
                this.checkedUsers.push(target.value);
            } else {
                const result = this.checkedUsers.filter(value => value !== target.value);
                this.checkedUsers = result;
            }
        }
    }

    render() { 
        return this.compile(compileTemplate, {...this.props})
    }
}