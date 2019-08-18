import { observable } from 'mobx';
import { IUser } from '@/interface/user';

export const session = observable({
    user: null,
    logged(user: IUser) {
        this.user = user;
    },
    logout() {
        this.user = null;
    },
});
