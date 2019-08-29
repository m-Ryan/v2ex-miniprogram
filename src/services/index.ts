import { request } from '@/utils/request';
import { IV2exInfo, IListItem } from '@/interface/v2ex/info';
import { IV2exDetail } from '@/interface/v2ex/detail';
import { IV2exDetailReplay } from '@/interface/v2ex/detail-replay';
import { IV2exList } from '@/interface/v2ex/list';
import { IV2exNodeList } from '@/interface/v2ex/node-list';
import { IV2exUserInfo } from '@/interface/v2ex/user-info';

export const services = {
    getTabData(tab: string = '') {
        return request.get<IV2exInfo>('/v2ex/tab', {
            tab,
        });
    },
    getDetailData(id: number) {
        return request.get<IV2exDetail>('/v2ex/detail', {
            id,
        });
    },
    getDetailReplayData(id: number, page: number) {
        return request.get<IV2exDetailReplay>('/v2ex/detail-replay', {
            id,
            page,
        });
    },
    getListData(page: number) {
        return request.get<IV2exList>('/v2ex/list', {
            page,
        });
    },
    getNodeList(name: string, page: number) {
        return request.get<IV2exNodeList>('/v2ex/node-list', {
            name,
            page,
        });
    },
    getUserInfo(options: { nickname?: string; cookie?: string }) {
        return request.get<IV2exUserInfo>('/v2ex/user-info', options);
    },
    getCollection(cookie: string) {
        return request.get<IListItem[]>('/v2ex/collection', {
            cookie,
        });
    },
    setCollection(url: string, referer_id: number | string) {
        return request.get<IListItem[]>('/v2ex/set-collection', {
            url,
            referer_id,
        });
    },
    setIgnore(url: string, referer_id: number | string) {
        return request.get<IListItem[]>('/v2ex/set-ignore', {
            url,
            referer_id,
        });
    },
};
