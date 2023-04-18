<template>
	<view class="account">
		<view class="account_info">
			<view class="account_name">{{ name }}</view>
			<view class="fans_info">
				<view>
					{{ attention }}
					<span>关注</span>
				</view>
				<view>
					{{ fans }}
					<span>粉丝</span>
				</view>
				<view>{{ level }}</view>
			</view>
		</view>
		<view class="avator"><u--image shape="circle" :src="require('./images/avator.png')" width="80px" height="80px"></u--image></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name: '山林不向四季起誓_cyril',
			attention: 14012,
			fans: 55,
			level: 'lv8'
		};
	}
};
</script>

<style lang="less">
.account {
	width: 94%;
	height: 150px;
	margin-left: 3%;
	margin-top: 30px;
	position: relative;
	display: flex;
	justify-content: center;

	.avator {
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: center;
		z-index: 999;

		img {
			border-radius: 50%;
		}
	}
	.account_info {
		width: 100%;
		height: 100px;
		background-color: white;
		position: absolute;
		bottom: 0;
		z-index: 1;
		border-radius: 10px;

		.account_name {
			margin: 10% 0 2% 0;
			display: flex;
			justify-content: center;
			font-weight: 700;
		}
		.fans_info {
			width: 50%;
			margin-left: 25%;
			font-size: 12px;
			display: flex;
			justify-content: space-around;
			color: #93919c;
			font-weight: 600;

			span {
				padding-left: 5px;
			}
		}
	}
}
</style>
