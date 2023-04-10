<template>
	<view class="content"><myAccount></myAccount></view>
</template>

<script lang="ts">
import Vue from 'vue';
import myAccount from '../components/myAccount.vue';

export default Vue.extend({
	data() {
		return {
			title: '贾亦凡'
		};
	},
	onLoad() {},
	methods: {},
	components: {
		myAccount: myAccount
	}
});
</script>

<style></style>
