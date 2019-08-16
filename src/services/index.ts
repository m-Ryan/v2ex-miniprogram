import { request } from '@/utils/request';

export default class Api {
    static getHomeData() {
        return request.get('/v2ex');
    }
}
