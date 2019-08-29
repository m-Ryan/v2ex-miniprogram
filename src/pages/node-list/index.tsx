import Taro, { Component, Config } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import {services} from '@/services';
import { observer } from '@tarojs/mobx';
import { ComponentType } from 'react';
import { ListItem } from '@/components/list-item';
import { BindThis } from '@/utils/bind-this';
import { throttle } from '@/utils/throttle';
import { Pagination } from '@/components/pagination';
import { IV2exNodeList } from '@/interface/v2ex/node-list';
import { formatV2exUrl } from '@/utils/util';

interface IState {
  nodeName: string,
  nodePath: string,
  data: IV2exNodeList,
  nextData: {
    data: IV2exNodeList | null,
    page: number
  },
  inited: boolean,
  page: number
}
interface IProps {
 
}

@observer
@BindThis()
class Index extends Component<IProps, IState> {
  state: IState = {
    nodeName: decodeURIComponent(this.$router.params.name),
    nodePath: this.$router.params.path || '',
    data: {
      page_count: 1,
      list: [],
      slogans: '',
      avatar: '',
      relative: []
    },
    nextData: {
      data: null,
      page: 0
    },
    page: 1,
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
        navigationBarTitleText: '节点',
    };

    componentWillMount() {
      Taro.setNavigationBarTitle({
        title: this.state.nodeName
      })
      this.getPageList();
        
    }

    @throttle(1000)
    async getPageList() {
      const { nextData, page, nodePath } = this.state;
      Taro.showLoading({
        title: '正在加载数据'
      })
      try {
        const data = nextData.page === page ? nextData.data! : await services.getNodeList(nodePath, page);
        
        this.setState({
          data,
          page,
          inited: true
        }, ()=>{
          // 预加载下一页
          this.loadNextPage();
        })
      } catch (error) {
          console.log(error);
      }
      finally {
        Taro.hideLoading();
      }
    }

    onPageChange(page: number) {
      this.setState({
        page
      }, ()=> {
        this.getPageList();
      })
    }

    async loadNextPage() {
      const { page, nodePath } = this.state;
      const nextPage = page + 1;
      try {
        const data = await services.getNodeList(nodePath, nextPage);
        this.setState({
          nextData: {
            data,
            page: nextPage
          }
        })
      } catch (error) {
          console.log(error);
      }
    }

    render() {
      const { data, inited, page, nodeName } = this.state;
      const renderList =  inited && data.list.map((item, index)=><ListItem data={item} key={index} />);
      const renderContainer = 
        inited 
        ? (
          <View className={styles.container}>
            <View className={styles.header}>
              <View className={styles.avatar}><Image src={formatV2exUrl(data.avatar)} mode="widthFix" /></View>
              <View>
                <View className={styles.title}>
                  { nodeName }
                </View>
                <View className={styles.slogans}>
                  { data.slogans }
                </View>
              </View>
            </View>
            <View className={styles.list}>
              { renderList }
            </View>
            <View className={styles.pagination}>
              <Pagination 
                total={data.page_count} 
                current={page}
                onChange={this.onPageChange}
              >
              </Pagination>
            </View>
          </View>
        )
        : null;
        return renderContainer;
    }
}

export default Index as ComponentType;
