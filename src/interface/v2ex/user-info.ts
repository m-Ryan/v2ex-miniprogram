export interface IV2exUserInfo {
    avatar: string;
    nickname: string;
    bigger: string;
    widgets: IWidgetsItem[];
    register_rank: string;
    register_time: string;
    active_rank: string;
}
interface IWidgetsItem {
    name: string;
    url: string;
}
