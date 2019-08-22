import { IObject } from "@/interface/global";
import qs from 'qs';
export function formatV2exUrl(url: string) {
  return 'https:' + url;
}


export function formatClassName(...args: string[]) {
  return args.join(' ');
}

export function formatPath(url: string, query?: IObject<string>) {
  if (query) {
    url += `?${qs.stringify(query)}`
  }
  return url;
}

export function getDetailId(url: string) {
  return parseInt(url.replace('/t/', '')).toString();
}