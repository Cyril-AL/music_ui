<template>
	<view class="content">
		<view class="titlebar">
			<view class="title_bar">
				<view><img @click="backFunClick" :src="require('../../../static/myMusic/返回.png')" alt="" /></view>
				<view class="bar_name">歌单</view>
				<view>
					<img class="search" :src="require('../../../static/myMusic/搜索.png')" alt="" />
					<img class="menu" :src="require('../../../static/myMusic/右侧菜单.png')" alt="" />
				</view>
			</view>
			<view class="title_info">
				<img class="fengmian" :src="require('../images/喜欢的音乐封面.png')" />
				<view class="title">
					<view class="title_label">我喜欢的音乐</view>
					<view class="title_value">
						<img :src="require('../images/avator.png')" />
						山林不向四季起誓_cyril
						<img class="tomyInfo" :src="require('../../../static/myMusic/返回.png')" alt="" />
					</view>
				</view>
			</view>
			<view class="functionBtn"></view>
		</view>
		<view class="music_list">
			<view class="content_menu" v-for="(item, index) in musicListData">
				<!-- <view class="img_container"><img :src="item.coverImg" alt="" /></view> -->
				<view class="menu_front">
					<view class="sort">{{index + 1}}</view>
					<view class="menu_info">{{ item.musicName }}</view>
				</view>
				
				<view class="menu_behind">2</view>
			</view>
		</view>
	</view>
</template>

<script>
import back_img from '../../../static/myMusic/返回.png';
import search_img from '../../../static/myMusic/搜索.png';
import menu_img from '../../../static/myMusic/右侧菜单.png';

export default {
	data() {
		return {
			musicListData: [
				{
					musicName: '没有人不比我快乐',
					author: 'Fine乐团',
					coverImg: require('../assets/没有人不比我快乐.png'),
					musicUrl: '../assets/Fine乐团 - 没有人不比我快乐.mp3'
				},
				{
					musicName: 'New Boy',
					author: '房东的猫,陈婧霏',
					coverImg: require('../assets/NewBoy.png'),
					musicUrl: '../assets/房东的猫,陈婧霏 - New Boy.mp3'
				},
				{
					musicName: '得不到你',
					author: 'Fine乐团',
					coverImg: require('../assets/得不到你.png'),
					musicUrl: '../assets/Fine乐团 - Fine乐团 - 得不到你.mp3'
				},
				{
					musicName: '城市动物园 (live版)',
					author: '房东的猫',
					coverImg: require('../assets/城市动物园.png'),
					musicUrl: '../assets/房东的猫 - 城市动物园 (live版).mp3'
				}
			]
		};
	},
	methods: {
		backFunClick() {
			uni.switchTab({
				url: '/pages/myMusic/index'
			});
		}
	}
};
</script>

<style lang="less">
.content {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	.titlebar {
		width: 100%;
		height: 200px;
		background-image: linear-gradient(to bottom, #8d4c4a, rgba(174, 104, 104, 0.8));

		.title_bar {
			width: 100%;
			height: 40px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: white;
			font-size: 14px;

			img {
				width: 25px;
				height: 25px;
				padding-left: 5px;
				cursor: pointer;
			}

			.bar_name {
				margin-left: 20px;
			}

			.search {
				width: 20px;
				height: 20px;
				padding-right: 5px;
			}
			.menu {
				width: 20px;
				height: 20px;
				padding-right: 10px;
			}
		}
	}

	.title_info {
		width: 100%;
		height: 80px;
		display: flex;
		padding-top: 10px;
		padding-left: 15px;

		.fengmian {
			width: 80px;
			height: 80px;
		}

		.title {
			color: white;
			padding-left: 10px;
			padding-top: 10px;

			.title_label {
				font-size: 14px;
				font-weight: 500;
				letter-spacing: 1px;
			}
			.title_value {
				color: #edcfc7;
				font-size: 10px;
				letter-spacing: 1px;
				padding-top: 5px;
				display: flex;
				align-items: center;

				.tomyInfo {
					width: 15px;
					height: 15px;
					transform: rotateY(180deg);
				}

				img {
					width: 22px;
					height: 22px;
					border-radius: 50%;
					padding-right: 5px;
				}
			}
		}
	}

	.functionBtn {
	}
	
	.music_list {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		
		.content_menu {
			width: 100%;
			height: 60px;
			border-bottom: 1px solid red;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.menu_front {
				height: 100%;
				display: flex;
				align-items: center;
				color: #979797;
				
				.sort{
					padding: 0 10px 0 10px;
				}
			}
		}
	}
}
</style>
