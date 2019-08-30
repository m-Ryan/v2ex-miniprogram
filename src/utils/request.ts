import Taro from '@tarojs/taro';
import { IObject } from 'src/interface/global';
import CookieStorage from './cookie-storage';
Taro.getStorageInfoSync()
class Request {
    constructor(baseUrl?: string) {
        if (baseUrl) {
            this.BASE_URL = baseUrl;
        }
    }
    private BASE_URL: string = '';

    private use<T>(
        url: string,
        method: 'GET' | 'POST',
        data?: IObject<any>,
        header?: IObject<string>
    ) {
        const httpUrl = url.startsWith('http') ? url : this.BASE_URL + url;

        const config: Taro.request.Param<any> = {
            url: httpUrl,
            method,
            header: {}
        };

        if (data) config.data = data;

        if (header) {
            config.header = {
                ...config.header,
                ...header
            };
        }
        if (CookieStorage.getCookie()) {
            config.header['v2ex-cookie'] = CookieStorage.getCookie();
        }

        return Taro.request<T>(config).then(res => {
            if (res.statusCode >= 200 && res.statusCode <= 300) {
                return res.data;
            }
            throw {
                message: (res.data as any).message,
                code: (res.data as any).statusCode
            }
        });
    }

    get<T>(url: string, params?: IObject<any>, header?: IObject<string>) {
        return this.use<T>(url, 'GET', params, header);
    }

    post<T>(url: string, data?: IObject<any>, header?: IObject<string>) {
        return this.use<T>(url, 'GET', data, header);
    }
}

export const request = new Request('https://www.maocanhua.cn');
// export const request = new Request('http://localhost:8843');
