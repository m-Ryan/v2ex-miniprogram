import Taro, { Component, Config } from '@tarojs/taro';
import { View, Input, Image, Navigator } from '@tarojs/components';
import styles from './index.module.scss';
import { services } from '@/services';
import { observer, inject } from '@tarojs/mobx';
import { ComponentType } from 'react';
import { store } from '../../store/index';
import { ListItem } from '@/components/list-item';
import { ITagItem } from '@/interface/user';
import { IStoreUser } from '@/store/user';
import { IV2exInfo } from '@/interface/v2ex/info';
import { AtTabs, AtTabsPane } from 'taro-ui'
import { BindThis } from '@/utils/bind-this';
import { formatV2exUrl, getDetailId, formatPath, getNodeName } from '@/utils/util';
import { Pages } from '@/constants';

interface IState {
  data: IV2exInfo,
  inited: boolean,
  currentTab: number
}
interface IProps {
  user: IStoreUser,
  tags: ITagItem
}

@inject('user')
@inject('tags')
@observer
@BindThis()
class Index extends Component<IProps, IState> {
  state: IState = {
    data: {
      hot_nodes: [],
      new_nodes: [],
      list: [],
      topic: []
    },
    inited: false,
    currentTab: 1
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
      Taro.showLoading({
        title: '正在加载数据'
      })
      const data = await services.getHomeData();
      store.tags.setNewTags(data.hot_nodes);
      this.setState({
        data,
        inited: true
      })
    } catch (error) {
      console.log(error);
    }
    finally {
      Taro.hideLoading()
    }
  }

  onChangeTab(index: number) {
    this.setState({
      currentTab: index
    })
  }

  render() {
    const { data, inited, currentTab } = this.state;

    const renderList = data.list.map((item, index) => <ListItem data={item} key={index} />)
    const renderTopic = data.topic.map((item, index) => {
      return (
        <Navigator url={formatPath(Pages.DetailIndex, {
          id: getDetailId(item.url)
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
    if (!inited) return null;
    return (
      <View className={styles.container}>
        <AtTabs current={currentTab} tabList={[{ title: '最新' }, { title: '推荐' }]} onClick={this.onChangeTab}>
          <AtTabsPane current={currentTab} index={0} >
            <View className={styles.tab1}>
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
