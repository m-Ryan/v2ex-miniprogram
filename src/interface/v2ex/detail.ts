export interface IV2exDetail {
    title: string;
    desc: string;
    tags: ITagsItem[];
    time: string;
    user: IUser;
    content: string;
    more_info: IMore_info;
    replay: IReplay;
}
interface ITagsItem {
    name: string;
    href: string;
}
interface IUser {
    name: string;
    url: string;
    avatar: string;
}
interface IMore_info {
    is_collected: boolean;
    collection_url: string;
    is_ignore: boolean;
    ignore_url: string;
    click_count: number;
    collection_count: number;
    thank_count: number;
}
interface IReplay {
    list: IListItem[];
    page_count: number;
}
interface IListItem {
    user: IUser;
    content: string;
    floor_num: number;
    love_num: string;
    time: string;
}
