import { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import { View } from '@tarojs/components';
import {
    AtList,
    AtListItem,
    AtModal,
    AtModalHeader,
    AtModalContent,
    AtModalAction,
} from 'taro-ui';
import styles from './index.module.scss';
class Index extends Component {
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '关于我们',
    };

    componentWillMount() {
      
    }

    render() {
       
        return (
            <View className={styles.container}>
                <AtList>
                    <AtListItem
                        title={`github 地址`}
                        note="https://github.com/m-Ryan/v2ex-miniprogram"
                        iconInfo={{
                            size: 25,
                            color: '#000',
                            value: 'user',
                        }}
                    />
                   
                    <AtListItem
                        title={`声明`}
                        note="内容来源于V2ex，本小程序仅供学习交流使用"
                        iconInfo={{
                            size: 25,
                            color: '#917b11',
                            value: 'streaming',
                        }}
                    />
                   
                </AtList>

            </View>
        )
    }
}

export default Index as ComponentType;
