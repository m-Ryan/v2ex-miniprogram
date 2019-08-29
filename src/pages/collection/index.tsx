import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import {services} from '@/services';
import { observer, inject } from '@tarojs/mobx';
import { ComponentType } from 'react';
import { ListItem } from '@/components/list-item';
import { IStoreUser } from '@/store/user';
import { BindThis } from '@/utils/bind-this';
import { throttle } from '@/utils/throttle';
import CookieStorage from '@/utils/cookie-storage';
import { IListItem } from '@/interface/v2ex/info';

interface IState {
  data: IListItem[],
  inited: boolean,
}
interface IProps {
  user: IStoreUser
}

@inject('user')
@observer
@BindThis()
class Index extends Component<IProps, IState> {
  state: IState = {
    data: [],
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
        navigationBarTitleText: '收藏',
    };

    componentWillMount() {
      this.getPageList();
        
    }

    @throttle(1000)
    async getPageList() {
      Taro.showLoading({
        title: '正在加载数据'
      })
      try {
        const data = await services.getCollection(CookieStorage.getCookie());
        
        this.setState({
          data,
          inited: true
        }, ()=>{
          Taro.hideLoading();
        })
      } catch (error) {
          console.log(error);
          Taro.hideLoading();
      }
    }

  
    render() {
      const { data, inited } = this.state;
      const renderList =  inited && data.map((item, index)=><ListItem data={item} key={index} />);
      const renderContainer = 
        inited 
        ? (
          <View className={styles.container}>
                <View className={styles.list}>
                  { renderList }
                </View>
            </View>
        )
        : null;
        return renderContainer;
    }
}

export default Index as ComponentType;
