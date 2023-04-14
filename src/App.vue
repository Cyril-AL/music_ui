<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	mpType: 'app',
	onLaunch() {
		console.log('App Launch launch');
	},
	onShow() {
		console.log('App Show');
	},
	onHide() {
		console.log('App Hide');
	}
});
</script>

<style lang="scss">
// @import 'uview-ui/theme.scss';
// @import '@/uni_modules/uni-scss/variables.scss';
/*每个页面公共css */
page {
	background-color: rgba(241, 240, 245, 1);
}
</style>
