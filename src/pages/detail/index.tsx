import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import styles from './index.module.scss';
import { DEFAULT_TITLE } from '@/constants';
import { services } from '@/services';
import { formatV2exUrl } from '@/utils/util';
import { BindThis } from '@/utils/bind-this';
import { throttle } from '@/utils/throttle';
import { IV2exDetail } from '@/interface/v2ex/detail';

interface IState {
    data: IV2exDetail | null,
    currentPage: number
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
        navigationBarTitleText: DEFAULT_TITLE,
    };

    state: IState = {
        data: null,
        currentPage: 1
    }


    async componentWillMount() {
        const id = parseInt(this.$router.params.id);
        this.getDetail(id)
    }

    async getDetail(id: number) {
        const { currentPage } = this.state;
        try {
            const data = await services.getDetailData(id);
            
            this.setState({
                data,
                currentPage: currentPage + 1
            })
        } catch (error) {
            Taro.showToast({
                title: error.message,
                icon: "none"
            })
        }
    }

    @throttle(1000)
    async getReplayData() {
        const { currentPage, data } = this.state;
        if (data!.replay.page_count < currentPage) return;

        try {
            const data = await services.getDetailReplayData(parseInt(this.$router.params.id), currentPage);
            this.state.data!.replay.list = [...this.state.data!.replay.list, ...data];
            this.setState({
                data: {...this.state.data},
                currentPage: currentPage + 1
            })
        } catch (error) {
            Taro.showToast({
                title: error.message,
                icon: "none"
            })
        }
    }

    render() {
        const { data } = this.state;
        if (!data) return null;
        const renderReplayList = data.replay.list.map((item=> {
            return (
                <View className={styles.replayItem}>
                    <View className={styles.top}>
                        <Image src={formatV2exUrl(item.user.avatar)} mode="widthFix" className={styles.avatar} />
                        <View>
                            <View className={styles.name}>
                                <Text className={styles.floor}>{ item.floor_num }楼</Text>
                                <Text>{ item.user.name }</Text>
                            </View>
                            <View className={styles.date}>{ item.time }</View>
                        </View>
                    </View>
                    <View className={styles.bottom}>
                        { item.content }
                    </View>
                </View>
            )
        }))

        return (
            <ScrollView scrollY={true} className={styles.scrollview} onScrollToLower={this.getReplayData}>
                <View className={styles.container}>
                    <View className={styles.title}>{ data.title }</View>
                    <View className={styles.relativeInfo}>
                        { data.content }
                    </View>
                    <View className={styles.desc}>
                        { data.desc }
                    </View>

                    <View className={styles.replay}>
                        { renderReplayList }
                    </View>
                </View>
            </ScrollView>
        );
    }
}
