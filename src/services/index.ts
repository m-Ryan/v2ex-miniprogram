import { request } from '@/utils/request';
import { IV2exInfo } from '@/interface/v2ex/info';
import { IV2exDetail } from '@/interface/v2ex/detail';
import { IV2exDetailReplay } from '@/interface/v2ex/detail-replay';
import { IV2exList } from '@/interface/v2ex/list';
import { IV2exNodeList } from '@/interface/v2ex/node-list';

export const services = {
  getHomeData() {
    return request.get<IV2exInfo>('/v2ex/info');
  },
  getDetailData(id: number) {
    return request.get<IV2exDetail>('/v2ex/detail', {
      id
    });
  },
  getDetailReplayData(id: number, page: number) {
    return request.get<IV2exDetailReplay>('/v2ex/detail-replay', {
      id,
      page
    });
  },
  getListData(page: number) {
    return request.get<IV2exList>('/v2ex/list', {
      page
    });
  },
  getNodeList(name: string, page: number) {
    return request.get<IV2exNodeList>('/v2ex/node-list', {
      name, 
      page
    });
  }
}
