import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import emptyIcon from '@/images/empty.png';
export function EmptyIcon() {
    return (
        <View className={styles.empty}>
            <Image mode={'widthFix'} src={emptyIcon} />
            <View className={styles.text}>暂无数据</View>
        </View>
    );
}
