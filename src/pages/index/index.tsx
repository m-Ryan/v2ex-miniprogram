import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';
import Api from '@/services';
import { observer, inject } from '@tarojs/mobx';
import { ComponentType } from 'react';

type PageStateProps = {
    session: {
        user: any;
        logged: Function;
        logout: Function;
    };
};

@inject('session')
@observer
class Index extends Component<PageStateProps> {
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
        console.log('this.props');
        console.log(this.props);
        try {
            const data = await Api.getHomeData();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    render() {
        return (
            <View className="index">
                <Text>Hello world!</Text>
            </View>
        );
    }
}

export default Index as ComponentType;
