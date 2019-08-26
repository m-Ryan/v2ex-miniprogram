export interface IV2exList { page_count: number; list: IListItem[]; } 
interface IListItem { title: string; url: string; tag: ITag; user: IUser; last_replay: ILast_replay; replay_count: string; } 
interface ITag { name: string; url: string; } 
interface IUser { avatar: string; name: string; name_url: string; } 
interface ILast_replay { time: string; user_name: string; user_name_url?: string; }