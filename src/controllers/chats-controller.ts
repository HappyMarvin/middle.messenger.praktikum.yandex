import ChatsApi, { IAddChatData, IAddUsersChat } from "../api/chats-api";
import { IChat } from "../pages/chat/components/mainChat";
import { IUser, store } from "../utils/store";

export interface IGetTokenResponse {
    token: string
}

class ChatsController {
    private api: ChatsApi;

    constructor() {
        this.api = new ChatsApi();
    }

    async create(data: IAddChatData) {
        try {
            await this.api.create(data);
            this.getChats();
        } catch (e) {
            alert(e.reason);
        }
    }

    async getChats(): Promise<any> {
        try {
            const chatList: IChat[] = await this.api.read() as unknown as IChat[];
            if (chatList.length) {
                store.set('activeChat', {
                    chatName: chatList[0].title,
                    activeChatId: chatList[0].id
                })
            }
            store.set('chatList', chatList);
            return Promise.resolve(chatList);
        } catch (e) {
            console.error(e.reason);
        }
    }

    async delete(id: number) {
        try {
            await this.api.delete(id);
            this.getChats();
        } catch (e) {
            console.error(e.reason);
        }
    }

    async addUsers(data: IAddUsersChat) {
        try {
            await this.api.addUsers(data);
            alert('Пользовтели добавлены!')
            store.set('isOpenPopups', {
                addUsersPopup: false
            })
        } catch (e) {
            console.error(e.reason);
        }
    }

    async deleteUsers(data: IAddUsersChat) {
        try {
            await this.api.deleteUsers(data);
            alert('Пользовтели удалены!')
            store.set('isOpenPopups', {
                deleteUsersPopup: false
            })
        } catch (e) {
            console.error(e.reason);
        }
    }

    async getToken(id: number): Promise<any> {
        try {
            const data: IGetTokenResponse = await this.api.getToken(id);
            store.set('activeChat', {
                activeChatId: id,
                token: data.token
            })
            return data
        } catch (e) {
            console.error(e.reason);
        }
    }

    async getUsers(id: number): Promise<any> {
        try {
            const data: IUser[] = await this.api.getUsers(id);
            store.set('chatUsers', data)
            return data
        } catch (e) {
            console.error(e.reason);
        }
    }
}

export default new ChatsController();