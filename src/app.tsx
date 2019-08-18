import '@tarojs/async-await';
import Taro, { Component, Config } from '@tarojs/taro';
import Index from './pages/index';

import './app.scss';
import { PRIMARY_COLOR } from './constants';
import { Provider } from '@tarojs/mobx';
import { store } from './store';
import { View } from '@tarojs/components';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        pages: ['pages/index/index', 'pages/list/index', 'pages/user/index'],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black',
        },
        tabBar: {
            color: '#333',
            selectedColor: PRIMARY_COLOR,
            list: [
                {
                    pagePath: 'pages/index/index',
                    text: '首页',
                    iconPath: 'images/home.png',
                    selectedIconPath: 'images/home.png',
                },
                {
                    pagePath: 'pages/user/index',
                    text: '列表',
                    iconPath: 'images/home.png',
                    selectedIconPath: 'images/home.png',
                },
                {
                    pagePath: 'pages/list/index',
                    text: '我的',
                    iconPath: 'images/home.png',
                    selectedIconPath: 'images/home.png',
                },
            ],
            backgroundColor: '#fff',
        },
    };

    componentDidMount() {}

    componentDidShow() {}

    componentDidHide() {}

    componentDidCatchError() {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return (
            <View>
              <Provider store={store}>
                <Index />
              </Provider>
            </View>
        );
    }
}

Taro.render(<App />, document.getElementById('app'));
