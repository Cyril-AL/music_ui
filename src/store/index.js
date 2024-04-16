import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: { hasLogin: false, userInfo: {} },
  //登录
  login(state, user) {
    state.hasLogin = true;
    state.userInfo = user;
    uni.setStorage({
      key: "userInfo",
      data: user,
    });
    console.log("登陆成功");
  },
  logout(state, user) {
    state.hasLogin = false;
    state.userInfo = {};
    uni.removeSavedFile({
      key: "userInfo",
    });
    console.log("退出登录");
  },
  actions: {},
});

export default store;
