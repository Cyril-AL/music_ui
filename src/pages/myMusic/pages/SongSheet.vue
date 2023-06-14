<template>
	<view class="content">
		<view class="content_menu" v-for="(item, index) in data">
			<view class="img_container"><img :src="item.value" alt="" /></view>
			<view class="menu_info">{{ item.label }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			data: [
				{ label: '最近播放', value: require('../../../static/myMusic/songSheet/recentlyPlayed.png') },
				{ label: '本地/下载', value: require('../../../static/myMusic/songSheet/downloadLocally.png') },
				{ label: '  云盘  ', value: require('../../../static/myMusic/songSheet/cloudDisk.png') },
				{ label: '  已购  ', value: require('../../../static/myMusic/songSheet/purchasedItems.png') },
				{ label: '我的好友', value: require('../../../static/myMusic/songSheet/myBuddy.png') },
				{ label: '收藏和赞', value: require('../../../static/myMusic/songSheet/collection.png') },
				{ label: '我的播客', value: require('../../../static/myMusic/songSheet/Signal.png') },
				{ label: '乐谜团', value: require('../../../static/myMusic/songSheet/aFanOfSomeone.png') }
			]
		};
	},
	methods: {}
};
</script>

<style lang="less">
.content {
	width: 94%;
	height: 160px;
	margin-top: 15px;
	margin-left: 3%;
	border-radius: 10px;
	background-color: white;
	display: flex;
	flex-wrap: wrap;

	.content_menu {
		width: 25%;
		height: 80px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.img_container {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 30px;
				height: 30px;
			}
		}

		.menu_info {
			color: #878787;
			font-size: 14px;
		}
	}
}
</style>
