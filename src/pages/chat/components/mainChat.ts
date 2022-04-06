import compileTemplate from './mainChat.pug';
import './mainChat.css';
import Block, { IBlockProps, IChildren } from '../../../utils/block';
import { ChatItem } from './chatItem';
import { ChatForm } from './chatForm';
import { NewChatForm } from '../../../components/new-chat-form/new-chat-form';
import chatsController from '../../../controllers/chats-controller';
import { IMessage, IStoreData, store, withAllStore } from '../../../utils/store';
import { ChatMessage } from './chatMessage';
import messageController from '../../../controllers/message-controller';
import { isEqual } from '../../../utils/helpers';
import { AddUserPopup } from './addUserPopup';
import { Button } from '../../../components/button/button';
import { DeleteUserPopup } from './deleteUserPopup';

export interface IChat {
    id: number
    title: string
    avatar: string
}

export interface IMainChatProps extends IBlockProps, IStoreData {

}

class MainChat extends Block {
    constructor(props: IMainChatProps) {
        super(props);
        chatsController.getChats()
            .then(async (chats: IChat[]) => {
                if (chats.length) {
                    const chat = chats[0];
                    const data = await chatsController.getToken(chat.id);
                    messageController.connect({
                    chatId: chat.id,
                    userId: this.props.currentUser.id,
                    token: data.token
                    })
                }
            });
    }

    initChildren(): void {
        if (this.props?.chatList) {
            this.children.chatItems = this.props?.chatList.map((chat: IChat) => {
                return new ChatItem({
                    name: chat.title,
                    id: chat.id,
                    events: {
                        'click': (e: Event) => this.onChatClick(e, chat)
                    }
                });
            })
        }
        if (this.props?.messages) {
            this.children.chatMessages = this.props?.messages.map((message: IMessage) => {
                return new ChatMessage({
                    text: message.content,
                    isOur: message.user_id === this.props.currentUser.id
                })
            })
        }
        const chatForm = new ChatForm({
            title: 'Сообщение',
        });

        const newChatForm = new NewChatForm({});
        const addUserPopup = new AddUserPopup({
            users: this.props?.foundedUsers,
            isOpen: this.props?.isOpenPopups?.addUsersPopup,
            onAddUser: this.onAddUser
        })

        const deleteUserPopup = new DeleteUserPopup({
            users: this.props?.chatUsers,
            isOpen: this.props?.isOpenPopups?.deleteUsersPopup,
            onDelUser: this.onDeleteUser
        })

        const addUserButton = new Button({
            text: 'Добавить пользователя',
            className: 'main-chat__add-user-button',
            type: 'button',
            events: {
                'click': this.onOpenAddUser
            }
        })

        const deleteUserButton = new Button({
            text: 'Удалить пользователя',
            className: 'main-chat__del-user-button',
            type: 'button',
            events: {
                'click': () => this.onOpenDelUser()
            }
        })
        
        this.children.deleteUserButton = deleteUserButton;
        this.children.addUserButton = addUserButton;
        this.children.addUserPopup = addUserPopup;
        this.children.deleteUserPopup = deleteUserPopup;
        this.children.newChatForm = newChatForm;
        this.children.chatForm = chatForm;
    }

    async componentDidUpdate(oldProps: any, newProps: any): Promise<boolean> {
        if (oldProps.chatList && newProps.chatList && !isEqual(oldProps.chatList, newProps.chatList)) {
            const data = await chatsController.getToken(this.props.activeChat.activeChatId);
            messageController.connect({
                chatId: this.props.activeChat.activeChatId,
                userId: this.props.currentUser.id,
                token: data.token
            })
        }
        return true
    }

    onOpenAddUser() {
        store.set('isOpenPopups', {
            addUsersPopup: true
        })
    }

    onOpenDelUser = () => {
        chatsController.getUsers(this.props.activeChat.activeChatId);
        store.set('isOpenPopups', {
            deleteUsersPopup: true
        })
    }

    onAddUser = (users: number[]) => {
        chatsController.addUsers({
            users,
            chatId: this.props.activeChat.activeChatId
        })
    }

    onDeleteUser = (users: number[]) => {
        chatsController.deleteUsers({
            users,
            chatId: this.props.activeChat.activeChatId
        })
    }

    async onChatClick(e: Event, chat: IChat) {
        e.preventDefault();
        e.stopPropagation();
        if(e.target instanceof HTMLButtonElement) {
            await chatsController.delete(chat.id);
        } else {
            const data = await chatsController.getToken(chat.id);
            messageController.connect({
                chatId: chat.id,
                userId: this.props.currentUser.id,
                token: data.token
            })
            store.set('activeChat', {
                chatName: chat.title
            })
        }
    }

    onAddMessage(message: string) {
        messageController.addMessage(message);
    }

    render() {
        return this.compile(compileTemplate, {...this.props})
    }
}

export default withAllStore(MainChat)