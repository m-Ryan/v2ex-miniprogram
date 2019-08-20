import { observable } from 'mobx';
import { ITagItem } from '../interface/user';
export interface ITagStore {
  hot: ITagItem[],
  new: ITagItem[]
}
export const tags = observable({
  data: {
      hot: [],
      new: []
    } as ITagStore,
    setHotTags(tags: ITagItem[]) {
      this.data.hot = tags
    },
    setNewTags(tags: ITagItem[]) {
      this.data.new = tags
    },
    get newNode() {
      return JSON.stringify(this.data.new[0])
    }
});
