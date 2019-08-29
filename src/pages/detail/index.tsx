import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Image, ScrollView, RichText } from '@tarojs/components';
import styles from './index.module.scss';
import { Pages } from '@/constants';
import { services } from '@/services';
import {
    formatV2exUrl,
    formatPath,
    getMemberUrl,
    formatClassName,
} from '@/utils/util';
import { BindThis } from '@/utils/bind-this';
import { throttle } from '@/utils/throttle';
import { IV2exDetail } from '@/interface/v2ex/detail';

interface IState {
    data: IV2exDetail | null;
    currentPage: number;
}

@BindThis()
export default class Detail extends Component<IState> {
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '详情',
    };

    state: IState = {
        data: null,
        currentPage: 1,
    };

    async componentWillMount() {
        const id = parseInt(this.$router.params.id);
        const title = decodeURIComponent(this.$router.params.title);
        Taro.setNavigationBarTitle({
            title: title,
        });
        this.getDetail(id);
    }

    async getDetail(id: number) {
        Taro.showLoading({
            title: '加载中',
        });
        try {
            const data = await services.getDetailData(id);

            this.setState(
                {
                    data,
                    currentPage: data.replay.page_count,
                },
                () => {
                    Taro.hideLoading();

                    // 预加载下一页评论
                    this.getReplayData();
                }
            );
        } catch (error) {
            Taro.hideLoading();
            Taro.showToast({
                title: error.message,
                icon: 'none',
            });
        }
    }

    @throttle(1000)
    async getReplayData() {
        const { currentPage } = this.state;
        if (currentPage <= 1) return;

        try {
            const data = await services.getDetailReplayData(
                parseInt(this.$router.params.id),
                currentPage - 1
            );
            this.state.data!.replay.list = [
                ...data,
                ...this.state.data!.replay.list,
            ];
            this.setState({
                data: { ...this.state.data },
                currentPage: currentPage - 1,
            });
        } catch (error) {
            Taro.showToast({
                title: error.message,
                icon: 'none',
            });
        }
    }

    goUserInfo(url: string) {
        Taro.navigateTo({
            url: formatPath(Pages.MemberIndex, {
                url: getMemberUrl(url),
            }),
        });
    }

    async onCollected() {
        const { data } = this.state;

        // 由于接口可能会很慢，所以先给反馈
        const isCollected = data!.more_info.is_collected;
        data!.more_info.is_collected = !isCollected;
        this.setState({
            data: {
                ...data,
            },
        });

        try {
            await services.setCollection(
                data!.more_info.collection_url,
                this.$router.params.id
            );
            this.setState({
                data: {
                    ...data,
                },
            });
        } catch (error) {
            data!.more_info.is_collected = isCollected;
            this.setState({
                data: {
                    ...data,
                },
            });
            Taro.showToast({
                title: error.message,
                icon: 'none',
            });
        }
    }

    async onIgnore() {
        const { data } = this.state;

        // 由于接口可能会很慢，所以先给反馈
        const isIgnore = data!.more_info.is_ignore;
        data!.more_info.is_ignore = !isIgnore;
        this.setState({
            data: {
                ...data,
            },
        });

        try {
            await services.setIgnore(
                data!.more_info.ignore_url,
                this.$router.params.id
            );
            this.setState({
                data: {
                    ...data,
                },
            });
        } catch (error) {
            data!.more_info.is_ignore = isIgnore;
            this.setState({
                data: {
                    ...data,
                },
            });
            Taro.showToast({
                title: error.message,
                icon: 'none',
            });
        }
    }

    async onReplay() {
        Taro.showToast({
            title: '该功能有需要再做',
            icon: 'none',
        });
    }

    render() {
        const { data, currentPage } = this.state;
        if (!data) return null;
        const isEnd = currentPage <= 1;
        const replayList = [...data.replay.list].reverse();
        const renderReplayList = replayList.map(item => {
            return (
                <View className={styles.replayItem}>
                    <View className={styles.top}>
                        <Image
                            onClick={() => this.goUserInfo(item.user.url)}
                            src={formatV2exUrl(item.user.avatar)}
                            mode="widthFix"
                            className={styles.avatar}
                        />
                        <View>
                            <View className={styles.name}>
                                <Text className={styles.floor}>
                                    {item.floor_num}楼
                                </Text>
                                <Text>{item.user.name}</Text>
                            </View>
                            <View className={styles.date}>{item.time}</View>
                        </View>
                    </View>
                    <View className={styles.bottom}>{item.content}</View>
                </View>
            );
        });

        return (
            <ScrollView
                scrollY={true}
                className={styles.scrollview}
                onScrollToLower={this.getReplayData}
            >
                <View className={styles.container}>
                    <View className={styles.header}>
                        <View className={styles.title}>{data.title}</View>
                        <View className={styles.relativeInfo}>
                            {data.content}
                        </View>
                        <RichText
                            nodes={data.desc}
                            className={styles.desc}
                        ></RichText>
                    </View>

                    <View className={styles.replay}>
                        {renderReplayList}
                        {isEnd && (
                            <View className={styles.noMore}>
                                没有更多评论了
                            </View>
                        )}
                    </View>
                </View>
                <View className={styles.articleInfo}>
                    <View className={styles.left}>
                        {data.more_info.click_count && (
                            <View className={styles.text}>
                                {data.more_info.click_count}点击{' '}
                            </View>
                        )}
                        {data.more_info.collection_count && (
                            <View className={styles.text}>
                                {data.more_info.collection_count}收藏
                            </View>
                        )}
                        {data.more_info.thank_count && (
                            <View className={styles.text}>
                                {data.more_info.thank_count}感谢
                            </View>
                        )}
                    </View>
                    <View className={styles.right}>
                        <View
                            className={styles.btnItem}
                            onClick={this.onCollected}
                        >
                            <Text
                                className={formatClassName(
                                    data.more_info.is_collected
                                        ? 'icon anticon icon-heart'
                                        : 'icon anticon icon-hearto'
                                )}
                            ></Text>
                        </View>
                        <View
                            className={styles.btnItem}
                            onClick={this.onIgnore}
                        >
                            <Text
                                className={formatClassName(
                                    data.more_info.is_ignore
                                        ? 'icon anticon icon-closecircle'
                                        : 'icon anticon icon-closecircleo'
                                )}
                            ></Text>
                        </View>
                        <View
                            className={styles.btnItem}
                            onClick={this.onReplay}
                        >
                            <Text className="icon anticon icon-message1"></Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
