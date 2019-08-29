import { observable } from 'mobx';
import { IV2exUserInfo } from '@/interface/v2ex/user-info';
import { services } from '@/services';
import CookieStorage from '@/utils/cookie-storage';
import Taro from '@tarojs/taro';
export type IStoreUser = IV2exUserInfo | null
export const user = observable({
    data: null as IStoreUser,
    async login(cookie: string) {
       try {
        Taro.showLoading({
            title: '正在登录',
        })
        const userInfo = await services.getUserInfo({
            cookie
        })
        Taro.hideLoading();
        if (userInfo) {
            this.data = userInfo;
            CookieStorage.setCookie(cookie);
        } else {
            Taro.showToast({
                title: '登录失败',
                icon: 'none'
            })
        }
       } catch (error) {
           Taro.hideLoading();
           throw error;
       }
    },
    logout() {
        console.log('正在退出')
        CookieStorage.clear();
        this.data = null;
    },
});
