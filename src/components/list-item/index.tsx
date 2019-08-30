import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import styles from './index.module.scss';
import {
    formatV2exUrl,
    formatClassName,
    formatPath,
    getDetailId,
    getMemberUrl,
} from '@/utils/util';
import { BindThis } from '@/utils/bind-this';
import { Pages } from '@/constants';
import { IListItem } from '@/interface/v2ex/info';
import { INodeListItem } from '@/interface/v2ex/node-list';
import { ITouchEvent } from '@tarojs/components/types/common';

type IProps = {
    data: IListItem | INodeListItem;
};

@BindThis()
export class ListItem extends Component<IProps> {
    static options = {
        addGlobalClass: true,
    };

    goDetail() {
        Taro.navigateTo({
            url: formatPath(Pages.DetailIndex, {
                id: getDetailId(this.props.data.url),
                title: this.props.data.title,
            }),
        });
    }

    goUserInfo(event: ITouchEvent, url: string) {
        event.stopPropagation();
        Taro.navigateTo({
            url: formatPath(Pages.MemberIndex, {
                url: getMemberUrl(url),
            }),
        });
    }

    render() {
        if (!this.props.data) return null;
        const item = this.props.data;

        return (
            <View className={styles.container} onClick={this.goDetail}>
                <View className={styles.avatar}>
                    <Image
                        src={formatV2exUrl(item.user.avatar)}
                        mode="widthFix"
                    />
                </View>
                <View className={styles.content}>
                    <View className={styles.desc}>
                        <View className={styles.left}>
                            {item.tag && (
                                <View className={styles.tag}>
                                    {item.tag.name}
                                </View>
                            )}
                            <Text
                                onClick={(event: ITouchEvent) =>
                                    this.goUserInfo(event, item.user.url)
                                }
                                className={formatClassName(
                                    styles.descItem,
                                    styles.name
                                )}
                            >
                                {item.user.name}
                            </Text>
                            <Text
                                className={formatClassName(
                                    styles.descItem,
                                    styles.date
                                )}
                            >
                                {item.last_replay.time}
                            </Text>
                        </View>
                        <View className={styles.right}>
                            <Text
                                className={formatClassName(
                                    styles.replayCount,
                                    'icon anticon icon-message1'
                                )}
                            >
                                {' '}
                                {item.replay_count || 0}
                            </Text>
                        </View>
                    </View>
                    <View className={styles.title}>{item.title}</View>
                </View>
            </View>
        );
    }
}
