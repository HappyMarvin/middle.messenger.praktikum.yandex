import { IGetTokenResponse } from "../controllers/chats-controller";
import IChat from "../pages/chat/components/mainChat";
import { IUser } from "../utils/store";
import BaseAPI from "./base-api";

export interface IAddChatData {
    title: string;
}

export interface IAddUsersChat {
    "users": number[]
    "chatId": number
}


export default class ChatsApi extends BaseAPI {
    constructor() {
        super('/chats');
    }
    update = undefined;;

    async create(data: IAddChatData) {
        return await this.http.post('/', data);
    }

    async read(): Promise<typeof IChat[]> {
        return await this.http.get('/');
    }

    async delete(chatId: number) {
        return await this.http.delete('/', {chatId});
    }

    async getToken(id: number): Promise<IGetTokenResponse> {
        return await this.http.post(`/token/${id}`);
    }

    async addUsers(data: IAddUsersChat): Promise<IGetTokenResponse> {
        return await this.http.put(`/users`, data);
    }

    async deleteUsers(data: IAddUsersChat): Promise<IGetTokenResponse> {
        return await this.http.delete(`/users`, data);
    }

    async getUsers(chatId: number): Promise<IUser[]> {
        return await this.http.get(`/${chatId}/users`,);
    }
}