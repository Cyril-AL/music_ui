import Vue from "vue";
import App from "./App";
import "./uni.promisify.adaptor";
import uviewPlus from "@/uni_modules/uview-plus";
import Api from "@/requests/api";
import store from "@/store/index";

Vue.config.productionTip = false;

Vue.prototype.$Api = Api;
Vue.prototype.$store = store;

App.mpType = "app";

const app = new Vue({
  ...App,
});

app.$mount();
app.use(uviewPlus);
