import Vue from "vue";
import App from "./App";
import "./uni.promisify.adaptor";
import uviewPlus from "@/uni_modules/uview-plus";
import Api from "@/requests/api";

Vue.config.productionTip = false;

Vue.prototype.$Api = Api;

App.mpType = "app";

const app = new Vue({
  ...App,
});

app.$mount();
app.use(uviewPlus);
