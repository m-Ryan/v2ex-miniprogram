export type IV2exDetailReplay = IRootObjectItem[]; 
interface IRootObjectItem { user: IUser; content: string; floor_num: number; love_num: string; time: string; } 
interface IUser { name: string; url: string; avatar: string; }