import { observable } from 'mobx';
import { IWxUser } from '@/interface/user';
export type IStoreUser = IWxUser | null
export const user = observable({
    data: null as IStoreUser,
    loggin(user: IWxUser) {
        this.data = user;
    },
    logout() {
        this.data = null;
    },
});
