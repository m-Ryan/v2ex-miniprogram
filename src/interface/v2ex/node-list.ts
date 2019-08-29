export interface IV2exNodeList {
    slogans: string;
    relative: IRelativeItem[];
    page_count: number;
    list: INodeListItem[];
    avatar: string;
}
interface IRelativeItem {
    url: string;
    name: string;
    avatar: string;
}
export interface INodeListItem {
    title: string;
    url: string;
    user: IUser;
    last_replay: ILast_replay;
    replay_count: number;
    tag: undefined;
}
interface IUser {
    avatar: string;
    name: string;
    url: string;
}
interface ILast_replay {
    time: string;
    user_name: string;
    user_url: string;
}
