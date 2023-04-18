<template>
	<view class="content" @click="navigateList">
		<view class="left_container">
			<img :src="require('../../../static/myMusic/喜欢的音乐封面.png')" />
			<view class="left_info">
				<view class="left_title">我喜欢的音乐</view>
				<view class="left_value">787首</view>
			</view>
		</view>
		<view class="right_container">
			<view class="right_info">
				<img :src="require('../../../static/myMusic/心动.png')" />
				<span>心动模式</span>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		navigateList() {
			uni.navigateTo({
				url: '/pages/components/musicList/musicList'
			});
		}
	}
};
</script>

<style lang="less">
.content {
	width: 94%;
	height: 90px;
	margin-left: 3%;
	margin-top: 15px;
	position: relative;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	background-color: white;
	border-radius: 10px;

	.left_container {
		width: 65%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		.left_info {
			padding-left: 10px;
			.left_title {
				font-size: 16px;
				font-weight: 700;
				padding-bottom: 5px;
			}
			.left_value {
				font-size: 14px;
				color: #9c9c9e;
				padding-top: 5px;
			}
		}

		img {
			width: 65px;
			height: 65px;
			padding-left: 15px;
		}
	}

	.right_container {
		width: 35%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.right_info {
			width: 100px;
			height: 30px;
			color: #3e3d42;
			font-size: 14px;
			background-color: #f8f8fc;
			border-radius: 15px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border: 1px solid #f1f1f3;

			img {
				width: 15px;
				height: 15px;
				padding-left: 10px;
				padding-right: 5px;
			}
		}
	}
}
</style>
