const BASE_URL = "http://localhost:3000"; //公共请求头
const TOKEN = uni.getStorageSync("TOKEN");

//请求api组件封装
const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: (res) => {
        if (
          res.data.code === 200 ||
          res.data.code === 0 ||
          res.data.code === 1204
        ) {
          resolve(res);
        } else {
          uni.showModal({
            title: "提示",
            showCancel: false,
            content: res.data.message,
            success(res) {
              if (res.confirm) {
                uni.navigateBack({});
              } else {
              }
            },
          });
        }
      },
      fail(error) {
        reject(error);
      },
    });
  });
};

export default { request };
