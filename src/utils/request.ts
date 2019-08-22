import Taro from '@tarojs/taro';
import { IObject } from 'src/interface/global';

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
        };

        if (data) config.data = data;
        if (header) config.header = header;

        return Taro.request<T>(config).then(res => {
            return res.data;
        });
    }

    get<T>(url: string, params?: IObject<any>, header?: IObject<string>) {
        return this.use<T>(url, 'GET', params, header);
    }

    post<T>(url: string, data?: IObject<any>, header?: IObject<string>) {
        return this.use<T>(url, 'GET', data, header);
    }
}

export const request = new Request('http://localhost:3000');
