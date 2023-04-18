<template>
	<view>
		<view class="content"><myAccount /></view>
		<view><SongSheet></SongSheet></view>
		<view><myFavoriteSong /></view>
	</view>
</template>

<script lang="ts">
import Vue from 'vue';
import myAccount from '../components/myAccount.vue';
import SongSheet from './pages/SongSheet.vue';
import myFavoriteSong from './pages/myFavoriteSong.vue';

export default Vue.extend({
	data() {
		return {};
	},
	onLoad() {},
	methods: {},
	components: {
		myAccount,
		SongSheet,
		myFavoriteSong
	}
});
</script>

<style></style>
