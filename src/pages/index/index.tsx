import Taro, { Component, Config } from '@tarojs/taro';
import { View, Input } from '@tarojs/components';
import styles from './index.module.scss';
import {services} from '@/services';
import { observer, inject } from '@tarojs/mobx';
import { ComponentType } from 'react';
import { store } from '../../store/index';
import { ListItem } from '@/components/list-item';
import { ITagItem } from '@/interface/user';
import { IStoreUser } from '@/store/user';

interface IState {
  list: [],
  inited: boolean
}
interface IProps {
  user: IStoreUser,
  tags: ITagItem
}

@inject('user')
@inject('tags')
@observer
class Index extends Component<IProps, IState> {
  state: IState = {
    list: [],
    inited: false
  }
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '首页',
    };

    async componentWillMount() {
        try {
            const data = await services.getHomeData();
            store.tags.setNewTags(data.hot_nodes);
            this.setState({
              list: data.list,
              inited: true
            })
        } catch (error) {
            console.log(error);
        }
    }

    componentDidShow() {}

    componentDidHide() {}

    render() {
      const { list, inited } = this.state;
      const renderList =  inited && list.map((item, index)=><ListItem data={item} key={index} />)
        return (
            <View className={styles.container}>
                <View className={styles.search}>
                  <Input type="text" className={styles.input} />
                </View>
                <View className={styles.list}>
                  { renderList }
                </View>
            </View>
        );
    }
}

export default Index as ComponentType;
