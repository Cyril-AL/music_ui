import request from "./http";

const api = request;

export default {
  getPlatList: (uid) => {
    return api.request("/user/playlist", "GET", { uid: uid });
  },
};
