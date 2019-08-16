import Taro from '@tarojs/taro';
import { IObject } from 'src/interface/global';

class Request {
    constructor(baseUrl?: string) {
        if (baseUrl) {
            this.BASE_URL = baseUrl;
        }
    }
    private BASE_URL: string = '';

    private use(
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

        return Taro.request(config).then(res => {
            return res.data;
        });
    }

    get(url: string, params?: IObject<any>, header?: IObject<string>) {
        return this.use(url, 'GET', params, header);
    }

    post(url: string, data?: IObject<any>, header?: IObject<string>) {
        return this.use(url, 'GET', data, header);
    }
}

export const request = new Request('http://localhost:3000');
