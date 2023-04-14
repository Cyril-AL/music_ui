<template>
	<view class="content" @click="clickOrder"></view>
</template>

<script>
export default {
	data() {
		return {
			data: [
				{ label: '最近播放', value: '最近播放' },
				{ label: '本地/下载', value: '本地下载' },
				{ label: '云盘', value: '云盘' },
				{ label: '已购', value: '已购项目' },
				{ label: '我的好友', value: '我的好友' },
				{ label: '收藏和赞', value: '收藏' },
				{ label: '我的播客', value: '信号' },
				{ label: '乐谜团', value: '粉丝' }
			]
		};
	},
	methods: {
		clickOrder() {
			var a = prompt('第一个');
			var b = prompt('第二个');
			console.log(a > b ? true : false);
			switch (a > b) {
				case true:
					window.alert('第一个大');
					break;
				case false:
					window.alert('第er大');
					break;
			}
		}
	}
};
</script>

<style lang="less">
.content {
	width: 94%;
	height: 200px;
	margin-top: 15px;
	margin-left: 3%;
	border-radius: 10px;
	background-color: white;
}
</style>
