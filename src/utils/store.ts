
import { IChat } from '../pages/chat/components/mainChat';
import Block from './block';
import EventBus from './event-bus';
import { set } from './helpers';

export interface IStoreData {
    currentUser?: IUser;
    errorSignIn?: IErrorSignIn;
    errorSignUp?: IErrorSignUp;
    chatList?: IChat[];
    activeChat?: IActiveChat;
    messages?: IMessage[];
    foundedUsers?: IUser[];
    chatUsers?: IUser[];
    isOpenPopups?: IIsOpenPopups
}

export interface IIsOpenPopups {
    addUsersPopup: boolean,
    deleteUsersPopup: boolean,
}

export interface IActiveChat {
    activeChatId: number,
    token: string,
    chatName: string
}

export interface IMessage {
    chat_id: number;
    content: string;
    id: number;
    time: string;
    user_id: number;
}

export interface IUser {
    id: string,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string
}

export interface IErrorSignIn {
    errorSignIn: string
}

export interface IErrorSignUp {
    errorSignIn: string
}

export enum StoreEvents {
    Updated = 'updated',
}

export class Store extends EventBus {
    private state: IStoreData = {};
  
    public getState() {
      return this.state;
    }
  
    public set(path: keyof IStoreData, value: unknown) {
            set(this.state, path, value);
            this.emit(StoreEvents.Updated);
      };
  }
  
export const store = new Store();

export const withStore = (mapStateToProps: (state: IStoreData) => Record<string, unknown> | any) => (Component: typeof Block) => {
    return class extends Component {
        constructor(props: any) {
        const state = store.getState();        
          super({...props, ...mapStateToProps(state)});
            store.on(StoreEvents.Updated, () => {
                const newState = store.getState()
                this.setProps({...mapStateToProps(newState)});
            });
        }
    } 
}

export const withUser = withStore(state => ({...state.currentUser}));
export const withSignInError = withStore(state => ({errorSignIn: state.errorSignIn}));
export const withSignUpError = withStore(state => ({errorSignUp: state.errorSignUp}));
export const withAllStore= withStore(state => state);