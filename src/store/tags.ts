import { observable } from 'mobx';
import { ITagItem } from '../interface/user';
export interface ITagStore {
  hot: ITagItem[],
  new: ITagItem[]
}
export const tags = observable({
    tags: {
      hot: [],
      new: []
    },
    setHotTags(tags: ITagItem[]) {
      this.tags.hot = tags
    },
    setNewTags(tags: ITagItem[]) {
      this.tags.new = tags
    },
    get newNode() {
      return JSON.stringify(this.tags.new[0])
    }
});
