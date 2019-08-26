export interface IV2exInfo { hot_nodes: IHotNodesItem[]; new_nodes: INewNodesItem[]; topic: ITopicItem[]; list: IListItem[]; } 
interface IHotNodesItem { url: string; name: string; } 
interface INewNodesItem { url: string; name: string; } 
interface ITopicItem { avatar: string; url: string; name: string; } 
export interface IListItem { title: string; url: string; user: IUser; tag: ITag; last_replay: ILast_replay; replay_count: string; } 
interface IUser { avatar: string; name: string; name_url: string; } 
interface ITag { name: string; url: string; } 
interface ILast_replay { time: string; user_name: string; user_url?: string; }