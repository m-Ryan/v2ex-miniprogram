import Taro, { Component, Config } from '@tarojs/taro';
import { View, Image, Button, Textarea } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';

import styles from './index.module.scss';
import { formatV2exUrl, formatPath } from '@/utils/util';
import { store } from '@/store';
import { AtList, AtListItem, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import dayjs from 'dayjs';
import { BindThis } from '@/utils/bind-this';
import logoutIcon from '@/images/logout.png';
import { Pages } from '@/constants';


interface IProps {
	user: typeof store.user
}

interface IState {
	cookieValue: string;
	showModal: boolean;
}

@inject('user')
@observer
@BindThis()
export default class Index extends Component<IProps, IState> {
	state: IState = {
		cookieValue: '',
		showModal: false
	}

	config: Config = {
		navigationBarTitleText: '个人中心',
	};

	goCollection() {
    Taro.navigateTo({
      url: formatPath(Pages.CollectionIndex)
    })
	}

	setLogout() {
		this.props.user.logout();
	}

	async setLogin() {
		const { cookieValue } = this.state;

		if (!cookieValue) {
			Taro.showToast({
				title: 'cookie不能为空',
				icon: 'none'
			})
			return;
		}

		try {
			await this.props.user.login(cookieValue)
			this.setState({
				showModal: false
			})
		} catch (error) {
			Taro.showToast(error.message)
		}
	}

	renderLoginContent() {
		const { user } = this.props;
		const { avatar, nickname, bigger, register_time, widgets,register_rank, active_rank } = user.data!;

			const registerTime = dayjs(register_time).format('YYYY-MM-DD HH:mm:ss');
			const renderWidgets = widgets.map(item => {
				return (
					<View>
						<AtListItem
							title={item.name}
							thumb={formatV2exUrl(item.url)}
							arrow='right'
						/>
					</View>
				)
			})

			return (
				<View className={styles.container}>

					<View className={styles.listItem}>
						<View className={styles.avatar} ><Image src={formatV2exUrl(avatar)} mode="widthFix" /></View>
						<View className={styles.content}>
							<View className={styles.nickname}>{nickname}</View>
							<View className={styles.bigger}>{bigger}</View>
						</View>
					</View>

					<AtList>
						<AtListItem
							title='注册时间'
							note={registerTime}
							iconInfo={{
								size:
									25, color: '#9a6e3a', value: 'calendar',
							}}
						/>
						<AtListItem
							title={`V2EX 第 ${register_rank} 号会员`}
							iconInfo={{
								size: 25,
								color: '#FF4949', value: 'credit-card',
							}}
						/>
						<AtListItem
							title={`今日活跃度排名 ${active_rank}`}
							iconInfo={{
								size: 25,
								color: '#690', value: 'bookmark',
							}}
						/>
						<AtListItem
							title='收藏'
							onClick={this.goCollection}
							iconInfo={{
								size:
									25, color: '#07a', value: 'shopping-bag',
							}}
							arrow='right'
						/>
						{renderWidgets}
						<AtListItem
							onClick={this.setLogout}
							title='退出'
							thumb={logoutIcon}
							arrow='right'
						/>
					</AtList>

				</View>
			);
	}

	renderLogoutContent() {
		const { showModal, cookieValue } = this.state;
		return (
			<View className={styles.container}>
					<AtList>
						<AtListItem
							onClick={
								()=> this.setState({
									showModal: true
								})
							}
							title={`cookie 登录`}
							iconInfo={{
								size: 25,
								color: '#FF4949', value: 'credit-card',
							}}
						/>
					</AtList>

					<AtModal isOpened={showModal}>
						<AtModalHeader>登录</AtModalHeader>
						<AtModalContent>
							{showModal ? <Textarea maxlength={999} onInput={(event) => this.setState({ cookieValue: event.detail.value })} placeholder="此处粘贴cookie" placeholderStyle={'#999'} autoFocus value={cookieValue} /> : null}
						</AtModalContent>
						<AtModalAction> <Button onClick={() => { this.setState({ showModal: false }) }}>取消</Button> <Button onClick={this.setLogin}>确定</Button> </AtModalAction>
					</AtModal>
				</View>
		)
	}

	render() {

		const { user } = this.props;
		let showContent = null;
		if (!user.data) {
			showContent = this.renderLogoutContent()
		}
		else {
			showContent = this.renderLoginContent()
		}


		return <View>{ showContent }</View>;
	}
}
