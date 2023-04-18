import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import uviewPlus from '@/uni_modules/uview-plus'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
app.use(uviewPlus)