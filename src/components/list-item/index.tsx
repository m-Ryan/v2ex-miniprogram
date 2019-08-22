import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { IListItem } from '@/interface/user';
import styles from './index.module.scss';
import { formatV2exUrl, formatClassName, formatPath, getDetailId } from '@/utils/util';
import { BindThis } from '@/utils/bind-this';
import { Pages } from '@/constants';

type IProps  = {
  data: IListItem
}

@BindThis()
export class ListItem extends Component<IProps> {
  static options = {
    addGlobalClass: true
  }

  goDetail() {
    Taro.navigateTo({
      url: formatPath(Pages.DetailIndex, {
        page: getDetailId(this.props.data.url)
      }),
    })
  }

  render() {
    if (!this.props.data) return null;
      const item = this.props.data;
      
      return (
        <View className={styles.container} onClick={this.goDetail}>
          <Image src={formatV2exUrl(item.user.avatar)} mode="widthFix" className={styles.avatar} />
          <View className={styles.content}>
            <View className={styles.desc}>
              <View className={styles.left}>
                <View className={styles.tag}>{item.relative.name}</View>
                <Text className={styles.descItem}>
                  {item.user.name}
                </Text>
                <Text className={styles.descItem}>
                  {item.last_replay.time}
                </Text>
              </View>
              <View className={styles.right}>
                <Text className={formatClassName(styles.replayCount, "icon anticon icon-clockcircleo")} > {item.replay_count}</Text>
              </View>
            </View>
            <View className={styles.title}>
              {item.title}
            </View>
          </View>
        </View>
      )
  }
}
