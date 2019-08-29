import '@tarojs/async-await';
import Taro, { Component, Config } from '@tarojs/taro';
import Index from './pages/index';

import './app.scss';
import { Provider } from '@tarojs/mobx';
import { store } from './store';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


interface IAppState {
    hasLogin: boolean
}

class App extends Component<{}, IAppState> {
    state: IAppState = {
        hasLogin: false
    }

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        pages: ['pages/index/index', 'pages/list/index', 'pages/user/index', 'pages/member/index', 'pages/detail/index', 'pages/node-list/index', 'pages/collection/index'],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#2b7489',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'white',
        },
        tabBar: {
            borderStyle: 'black',
            color: '#333',
            selectedColor: '#2b7489',
            list: [
                {
                    pagePath: 'pages/index/index',
                    text: '首页',
                    iconPath: 'images/home.png',
                    selectedIconPath: 'images/home-active.png',
                },
                {
                    pagePath: 'pages/list/index',
                    text: '列表',
                    iconPath: 'images/more.png',
                    selectedIconPath: 'images/more-active.png',
                },
                {
                    pagePath: 'pages/user/index',
                    text: '我的',
                    iconPath: 'images/mine.png',
                    selectedIconPath: 'images/mine-active.png',
                },
            ],
            backgroundColor: '#fff',
        },
    };

    componentDidMount() {
        this.login()
    }

    async login() {
        try {
            // const data = await Taro.login();
            const res = await Taro.getSetting();
            console.log(res)
            this.setState({
                hasLogin: true
            })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidShow() {}

    componentDidHide() {}

    componentDidCatchError() {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        const  { hasLogin } = this.state;
        const renderPage = hasLogin ? <Index /> : null;
        return (
            <Provider store={store}>
                { renderPage }
            </Provider>
        );
    }
}

Taro.render(<App />, document.getElementById('app'));
