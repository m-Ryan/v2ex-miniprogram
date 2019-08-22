import { request } from '@/utils/request';
import { IDetail, IReplayListItem } from '@/interface/detail';

export const services = {
  getHomeData() {
    return request.get('/v2ex/info');
  },
  getDetailData(id: number) {
    return request.get<IDetail>('/v2ex/detail', {
      id
    });
  },
  getDetailReplayData(id: number, page: number) {
    return request.get<IReplayListItem[]>('/v2ex/detail-replay', {
      id,
      page
    });
  }
}
