import Taro from '@tarojs/taro';
const COOKIE_KEY = 'v2ex-cookie'
export default class CookieStorage {

  static getCookie(): string {
    return Taro.getStorageSync(COOKIE_KEY);
  }

  static setCookie(value: string) {
    Taro.setStorage({
      key: COOKIE_KEY,
      data: value
    })
  }

  static clear() {
    Taro.setStorage({
      key: COOKIE_KEY,
      data: ''
    })
  }
}