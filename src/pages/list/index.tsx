import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { services } from '@/services';
import { observer, inject } from '@tarojs/mobx';
import { ComponentType } from 'react';
import { ListItem } from '@/components/list-item';
import { IStoreUser } from '@/store/user';
import { IV2exList } from '@/interface/v2ex/list';
import { BindThis } from '@/utils/bind-this';
import { throttle } from '@/utils/throttle';
import { Pagination } from '@/components/pagination';

interface IState {
    data: IV2exList;
    nextData: {
        data: IV2exList | null;
        page: number;
    };
    inited: boolean;
    page: number;
}
interface IProps {
    user: IStoreUser;
}

@inject('user')
@observer
@BindThis()
class Index extends Component<IProps, IState> {
    state: IState = {
        data: {
            page_count: 1,
            list: [],
        },
        nextData: {
            data: null,
            page: 0,
        },
        page: 1,
        inited: false,
    };
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '列表',
    };

    componentWillMount() {
        this.getPageList();
    }

    @throttle(1000)
    async getPageList() {
        const { nextData, page } = this.state;
        Taro.showLoading({
            title: '正在加载数据',
        });
        try {
            const data =
                nextData.page === page
                    ? nextData.data!
                    : await services.getListData(page);

            this.setState(
                {
                    data,
                    page,
                    inited: true,
                },
                () => {
                    Taro.hideLoading();
                    Taro.pageScrollTo({
                        scrollTop: 0,
                    });
                    // 预加载下一页
                    this.loadNextPage();
                }
            );
        } catch (error) {
            console.log(error);
            Taro.hideLoading();
            this.getPageList();
        }
    }

    onPageChange(page: number) {
        this.setState(
            {
                page,
            },
            () => {
                this.getPageList();
            }
        );
    }

    async loadNextPage() {
        const nextPage = this.state.page + 1;
        try {
            const data = await services.getListData(nextPage);
            this.setState({
                nextData: {
                    data,
                    page: nextPage,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { data, inited, page } = this.state;
        const renderList =
            inited &&
            data.list.map((item, index) => (
                <ListItem data={item} key={index} />
            ));
        const renderContainer = inited ? (
            <View className={styles.container}>
                <View className={styles.list}>{renderList}</View>
                <View className={styles.pagination}>
                    <Pagination
                        total={data.page_count}
                        current={page}
                        onChange={this.onPageChange}
                    ></Pagination>
                </View>
            </View>
        ) : null;
        return renderContainer;
    }
}

export default Index as ComponentType;
