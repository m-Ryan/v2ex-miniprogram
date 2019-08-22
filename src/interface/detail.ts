export interface IDetail { title: string; desc: string; tags: ITagsItem[]; user: IUser; time: string; read_count: string; content: string; replay: IReplay; } 
interface ITagsItem { text: string; href: string; } interface IUser { name: string; url: string; avatar: string; } 
interface IReplay { list: IReplayListItem[]; page_count: number; } 
export interface IReplayListItem { user: IUser; content: string; floor_num: string; love_num: number; time: string; }