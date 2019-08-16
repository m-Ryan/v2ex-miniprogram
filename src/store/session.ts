import { observable } from 'mobx';
import { IUser } from '@/interface/user';

const session = observable({
    user: null,
    logged(user: IUser) {
        this.user = user;
    },
    logout() {
        this.user = null;
    },
});
export default session;
