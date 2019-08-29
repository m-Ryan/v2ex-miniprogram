export interface IV2exInfo {
    hot_nodes: IHotNodesItem[];
    new_nodes: INewNodesItem[];
    topic: ITopicItem[];
    list: IListItem[];
    user: { nickname: string; avatar: string };
    secondary_tabs: ITabItem[];
    tabs: ITabItem[];
}
export interface IHotNodesItem {
    url: string;
    name: string;
}
export interface INewNodesItem {
    url: string;
    name: string;
}
export interface ITopicItem {
    avatar: string;
    url: string;
    name: string;
}
export interface IListItem {
    title: string;
    url: string;
    user: IUser;
    tag: ITag;
    last_replay: ILast_replay;
    replay_count: string;
}
export interface IUser {
    avatar: string;
    name: string;
    url: string;
}
export interface ITag {
    name: string;
    url: string;
}
export interface ILast_replay {
    time: string;
    user_name: string;
    user_url?: string;
}
export interface ITabItem {
    name: string;
    url: string;
}
