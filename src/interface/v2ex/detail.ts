export interface IV2exDetail { title: string; desc: string; tags: ITagsItem[]; time: string; user: IUser; content: string; replay: IReplay; }
interface ITagsItem { name: string; href: string; }
interface IUser { name: string; url: string; avatar: string; }
interface IReplay { list: IListItem[]; page_count: number; }
interface IListItem { user: IUser; content: string; floor_num: number; love_num: string; time: string; }