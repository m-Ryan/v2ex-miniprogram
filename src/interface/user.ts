export interface ITagItem {
  name: string;
  url: string;
}

export interface IListItem {
  title: string;
  url: string;
  user: IUser;
  tag: ITagItem;
  last_replay: ILast_replay;
  replay_count: string | number;
}
export interface IUser { avatar: string; name: string; name_url: string; }
export interface ILast_replay { time: string; user_name?: string; user_url?: string; }
export interface IWxUser { nickName: string; avatarUrl: string; gender: number; province: string; city: string; }