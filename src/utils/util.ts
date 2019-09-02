import { IObject } from '@/interface/global';
import Taro from '@tarojs/taro';
import qs from 'qs';
export function formatV2exUrl(url: string) {
    if (url.startsWith('/static/img/')) {
        return `https://www.v2ex.com` + url;
    }
    return 'https:' + url;
}

export function formatClassName(...args: string[]) {
    return args.join(' ');
}

export function formatPath(url: string, query?: IObject<string>) {
    if (query) {
        url += `?${qs.stringify(query)}`;
    }
    return url;
}

export function getDetailId(url: string) {
    return parseInt(url.replace('/t/', '')).toString();
}

export function getNodeName(url: string) {
    return url.replace('/go/', '');
}

export function getTabUrl(url: string) {
    return url.replace(/\/\?tab=/, '');
}

export function getMemberUrl(url: string) {
    return url.replace('/member/', '');
}

export function getFavoriteUrl(url: string) {
    return url
        .replace('/favorite/topic/', '')
        .replace('/unfavorite/topic/', '');
}

export function sendStatisticalData(
    name: string,
    params?: IObject<string | number>
) {
    Taro.getApp().mtj.trackEvent(name, params);
}
