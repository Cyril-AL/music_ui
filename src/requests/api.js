import request from "./http";

const api = request;

export default {
  // 获取登录二维码key
  getKey: (timestamp) => {
    return api.request("/login/qr/key?timestamp=" + timestamp, "GET");
  },
  getQrImg: (key, qrimg) => {
    return api.request("/login/qr/create", "GET", { key: key, qrimg: qrimg });
  },
  getQrLoginState: (key, timestamp) => {
    return api.request(
      "/login/qr/check?key=" + key + "&timestamp=" + timestamp,
      "GET",
    );
  },

  //获取我最喜欢的音乐列表
  getPlatList: () => {
    return api.request("/personalized/newsong", "GET");
  },
};
