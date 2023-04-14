<template>
	<view>
		<view class="content"><myAccount /></view>
		<view><SongSheet></SongSheet></view>
	</view>
</template>

<script lang="ts">
import Vue from 'vue';
import myAccount from '../components/myAccount.vue';
import SongSheet from './pages/SongSheet.vue';

export default Vue.extend({
	data() {
		return {};
	},
	onLoad() {},
	methods: {},
	components: {
		myAccount,
		SongSheet
	}
});
</script>

<style></style>
