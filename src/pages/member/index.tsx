import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { inject } from '@tarojs/mobx';

import styles from './index.module.scss';
import { formatV2exUrl } from '@/utils/util';
import { store } from '@/store';
import { AtList, AtListItem } from "taro-ui"
import dayjs from 'dayjs';
import { services } from '@/services';


interface IProps {
	user: typeof store.user
}

interface IState {
	userInfo: typeof store.user.data | null
}

@inject('user')
export default class Index extends Component<IProps, IState> {

	config: Config = {
		navigationBarTitleText: '个人中心',
	};

	state: IState = {
		userInfo: null
	}

	async componentWillMount() {
		let user = this.props.user.data;
		if (this.$router.params.url) {
			user = await services.getUserInfo({
				nickname: this.$router.params.url
			});
			Taro.setNavigationBarTitle({
				title: user.nickname
			})
		}
		this.setState({
			userInfo: user
		})
	}

	render() {
		const { userInfo } = this.state;
		if (!userInfo) return;
		const registerTime = dayjs(userInfo.register_time).format('YYYY-MM-DD HH:mm:ss');
		const renderWidgets = userInfo.widgets.map(item=>{
			return (
				<View>
					<AtListItem 
						title={item.name}
						thumb={formatV2exUrl(item.url)}
					/>
				</View>
			)
		})
		return (
			<View className={styles.container}>

				<View className={styles.listItem}>
					<View className={styles.avatar} ><Image src={formatV2exUrl(userInfo.avatar)} mode="widthFix" /></View>
					<View className={styles.content}>
						<View className={styles.nickname}>{ userInfo.nickname }</View>
						<View className={styles.bigger}>{ userInfo.bigger }</View>
					</View>
				</View>

				<AtList>
					<AtListItem 
					title='注册时间' 
					note={registerTime}
						iconInfo={{
							size:
								25, color: '#78A4FA', value: 'calendar',
						}}
					/>
					<AtListItem 
						title={`V2EX 第 ${userInfo.register_rank} 号会员`}
						iconInfo={{
							size: 25,
							color: '#FF4949', value: 'credit-card',
						}}
					/>
					<AtListItem 
					title={`今日活跃度排名 ${userInfo.active_rank}`}
						iconInfo={{
							size: 25,
							color: '#FF4949', value: 'bookmark',
						}}
					/>
					{ renderWidgets }
				</AtList>

			</View>
		);
	}
}
