import Taro, { Component, Config } from '@tarojs/taro';
import { View, Image, Navigator } from '@tarojs/components';
import styles from './index.module.scss';
import { services } from '@/services';
import { observer, inject } from '@tarojs/mobx';
import { ComponentType } from 'react';
import { store } from '../../store/index';
import { ListItem } from '@/components/list-item';
import { IV2exInfo, ITabItem } from '@/interface/v2ex/info';
import { AtTabs, AtTabsPane } from 'taro-ui'
import { BindThis } from '@/utils/bind-this';
import { formatV2exUrl, getDetailId, formatPath, getNodeName, formatClassName, getTabUrl } from '@/utils/util';
import { Pages } from '@/constants';
import { EmptyIcon } from '@/components/empty';
import CookieStorage from '@/utils/cookie-storage';

interface IState {
  data: IV2exInfo,
  inited: boolean,
  currentTab: number,
  currentTabBar: number
}
interface IProps {
  user: typeof store.user
}

@inject('user')
@observer
@BindThis()
class Index extends Component<IProps, IState> {
  state: IState = {
    data: {
      hot_nodes: [],
      new_nodes: [],
      list: [],
      user: { nickname: '', avatar: ''},
      topic: [],
      tabs: [],
      secondary_tabs: []
    },
    inited: false,
    currentTab: 0,
    currentTabBar: 0
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

  componentWillMount() {
    this.getTabData();
  }

  async getTabData(tab: string = '') {
    try {
      Taro.showLoading({
        title: '正在加载数据'
      })
      const data = await services.getTabData(tab);
      if(CookieStorage.getCookie()) {
        this.props.user.login(CookieStorage.getCookie())
      }
      this.setState({
        data,
        inited: true
      }, ()=> {
        Taro.hideLoading()
      })
    } catch (error) {
      console.log(error);
      Taro.hideLoading();
    }
  }

  onChangeTab(index: number) {
    this.setState({
      currentTab: index
    })
  }

  onChangeTabBar(item: ITabItem, index: number) {
    this.setState({
      currentTabBar: index
    }, ()=> {
      this.getTabData(getTabUrl(item.url))
    })
  }

  render() {
    const { data, inited, currentTab, currentTabBar } = this.state;

    const renderList = data.list.length > 0 ? data.list.map((item, index) => <ListItem data={item} key={index} />) : <View> <EmptyIcon /></View>
    const renderTopic = data.topic.map((item, index) => {
      return (
        <Navigator url={formatPath(Pages.DetailIndex, {
          id: getDetailId(item.url),
          title: item.name
        })} className={styles.nodeItem} key={index}>
          <View className={styles.avatar} ><Image src={formatV2exUrl(item.avatar)} mode="widthFix" /></View>
          <View className={styles.title}>{item.name}</View>
        </Navigator>
      )
    })

    const renderHotNodes = data.hot_nodes.map((item, index) => {
      return (
        <Navigator url={formatPath(Pages.NodeListIndex, {
          path: getNodeName(item.url),
          name: item.name
        })} className={styles.tagItem} key={index}>
          {item.name}
        </Navigator>
      )
    })

    const renderNewNodeList = data.new_nodes.map((item, index) => {
      return (
        <Navigator url={formatPath(Pages.NodeListIndex, {
          path: getNodeName(item.url),
          name: item.name
        })} className={styles.tagItem} key={index}>
          {item.name}
        </Navigator>
      )
    })
    
    const renderTabBarList = data.tabs.map((item, index)=>{
      return <View onClick={()=>this.onChangeTabBar(item, index)} className={currentTabBar === index ? formatClassName(styles.scrollviewItem, styles.active) : styles.scrollviewItem}>{item.name}</View>
    });

    const renderSecondTabBarList =  data.secondary_tabs.length > 0 ? data.secondary_tabs.map((item)=>{
      return <Navigator url={formatPath(Pages.NodeListIndex, {
        path: getNodeName(item.url),
        name: item.name
      })} className={styles.scrollviewItem}>{item.name}</Navigator>
    }) : <View className={styles.scrollviewItem}>暂无子节点</View>;

    if (!inited) return null;
    return (
      <View className={styles.container}>
        <AtTabs current={currentTab} tabList={[{ title: '最新' }, { title: '推荐' }]} swipeable={false} onClick={this.onChangeTab}>
          <AtTabsPane current={currentTab} index={0} >
            <View className={styles.tab1}>
              <View className={styles.scrollTabbar}>
                 <View className={styles.tabbar}>{renderTabBarList }</View>
              </View>
              <View className={styles.scrollSecondTabbar}>
                 <View className={styles.secondtabbar}>{renderSecondTabBarList }</View>
              </View>
              <View className={styles.list}>
                {renderList}
              </View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={currentTab} index={1}>
            <View className={styles.tab2}>

              {/* 今日热议主题 */}
              <View className={styles.node}>
                <View className={styles.nodeTile}>
                  今日热议主题
                      </View>
                <View className={styles.nodeList}>
                  {renderTopic}
                </View>
              </View>

              {/* 热门节点 */}
              <View className={styles.node}>
                <View className={styles.nodeTile}>
                  热门节点
                      </View>
                <View className={styles.tagList}>
                  {renderHotNodes}
                </View>
              </View>

              {/* 最新节点 */}
              <View className={styles.node}>
                <View className={styles.nodeTile}>
                  最新节点
                      </View>
                <View className={styles.tagList}>
                  {renderNewNodeList}
                </View>
              </View>

            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

export default Index as ComponentType;
