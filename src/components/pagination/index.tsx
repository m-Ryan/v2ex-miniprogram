import Taro, { Component } from '@tarojs/taro';
import { View, Input } from '@tarojs/components';
import styles from './index.module.scss';
import { formatClassName } from '@/utils/util';
import { throttle } from '@/utils/throttle';
import { BaseEventOrig } from '@tarojs/components/types/common';

type IProps = {
  current: number;
  total: number;
  onChange: (page: number) => void
}

type IState = {
  searchPage: string
}


export class Pagination extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      searchPage: '1'
    }
  }

  @throttle(1000)
  onPrev() {
    if (this.props.current <= 1) return;
    this.props.onChange(this.props.current - 1);
  }

  @throttle(1000)
  onNext() {
    if (this.props.current >= this.props.total) return;
    this.props.onChange(this.props.current + 1);
  }

  onChangeSearhValue(e: BaseEventOrig<{
    value: string;
    cursor: number;
    keyCode: number;
  }>) {
    this.setState({searchPage: e.detail.value});
  }

  onSearch() {
    const { onChange, total } = this.props;
    const searchPage = parseInt(this.state.searchPage);
    if (searchPage > total) {
      Taro.showToast({
        title: '搜索页数大于总页数',
        icon: 'none'
      })
      return;
    }
    onChange(searchPage)
  }

  render() {
    const { current, total } = this.props;
    const { searchPage } = this.state;
    const onlyOne = total === 1;
    const isLast = current === total;
    const isFirst = current === 1;
    const renderPagination = (
      <View className={styles.pagination}>
        <View className={isFirst ? formatClassName(styles.prev, styles.disableIcon) : styles.prev} onClick={()=>this.onPrev()}>
          <View className={styles.icon}></View>
        </View>
        <View className={styles.content}>
          <View className={onlyOne ? styles.current : formatClassName(styles.current, styles.active)}>
            {current}
          </View>
          <View className={styles.spacer}>/</View>
          <View className={styles.total}>
            {total}
          </View>
          {
            total > 0
            ? (
              <View className={styles.search}>
                <Input type="digit" className={styles.input} value={ searchPage } onInput={(e)=>this.onChangeSearhValue(e)}/>
                <View className={styles.goBtn} onClick={()=>this.onSearch()}>GO</View>
              </View>
              )
            : null
          }
        </View>
        <View className={isLast ? formatClassName(styles.next, styles.disableIcon) : styles.next} onClick={()=>this.onNext()}>
          <View className={styles.icon}></View>
        </View>
      </View>
    )
    return renderPagination;
  }
}
