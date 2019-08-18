import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { IListItem } from '@/interface/user';
import styles from './index.module.scss';
import { formatV2exUrl } from '@/utils/util';


type IProps  = {
  data?: IListItem
}
export function ListItem(props: IProps) {
  if (!props.data) return null;
  const item = props.data;
  return (
    <View className={styles.container}>
      <Image src={formatV2exUrl(item.user.avatar)} mode="widthFix" className={styles.avatar} />
      <View className={styles.content}>
        <View className={styles.title}>
          {item.title}
        </View>
        <View className={styles.desc}>
          <View className={styles.tag}>{item.tag.text}</View>
          <Text className={styles.descItem}>
            {item.user.name}
          </Text>
          <Text className={styles.descItem}>
            {item.last_replay.time}
          </Text>
          <Text className={styles.descItem}>
            {item.replay_count}
          </Text>
        </View>
      </View>
    </View>
  )
}
