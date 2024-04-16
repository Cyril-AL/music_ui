<template>
  <view class="account">
    <view class="avator" @click="loginIn"
      ><u--image
        shape="circle"
        :src="require('./images/avator.png')"
        width="80px"
        height="80px"
      ></u--image
    ></view>
    <view class="account_info">
      <view class="account_name">{{ userInfo.name }}</view>
      <view class="fans_info">
        <view>
          {{ userInfo.attention || 0 }}
          <span>关注</span>
        </view>
        <view>
          {{ userInfo.fans || 0 }}
          <span>粉丝</span>
        </view>
        <view>{{ userInfo.level }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      qrKey: {},
      name: "山林不向四季起誓_cyril",
      attention: 14012,
      fans: 55,
      level: "lv8",
    };
  },
  onLoad() {
    const userInfo = uni.getStorageSync("userInfo");
    if (userInfo !== "") {
      this.userInfo = userInfo;
      this.login(userInfo);
    }
  },
  methods: {
    loginIn() {
      let nowtime = Date.now();
      this.$Api.getKey(nowtime).then((res) => {
        if (res.statusCode === 200) {
          let result = res.data.data;
          let key = result.unikey;
          if (key) {
            this.$Api.getQrImg(key, true).then((val) => {
              if (val.statusCode === 200) {
                let result = val.data.data;
                let sginImgURL = result.qrimg;
                console.log(result, sginImgURL);

              }
            });
          }
        }
      });
      //调第一个接口拿key
      // let key = this.$Api.getKey(nowtime).data.data.unikey;
      // if (key) {
      //   //调第二个接口拿二维码图片
      //   let sginImgURL = this.$Api.getQrImg(key).data.data.qrimg;
      //   this.$store.state.signShow = true;
      //   this.$store.state.signURL = sginImgURL;
      //   // 800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功
      //   //每三秒check一次
      //   let check = setInterval(async () => {
      //     let nowtime2 = new Date().getTime();
      //     let res = await this.$Api.getQrLoginState(key, nowtime2).then();
      //     console.log(res.data.message, "---");
      //     if (res.data.code === 800) {
      //       alert(res.data.message);
      //       clearInterval(check);
      //     }
      //     if (res.data.code === 803) {
      //       alert(res.data.message);
      //       clearInterval(check);
      //     }
      //   }, 3000);
      // }
    },
  },
};
</script>

<style lang="less">
.account {
  width: 94%;
  height: 150px;
  margin-left: 3%;
  margin-top: 30px;
  position: relative;
  display: flex;
  justify-content: center;

  .avator {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    z-index: 999;

    img {
      border-radius: 50%;
    }
  }
  .account_info {
    width: 100%;
    height: 100px;
    background-color: white;
    position: absolute;
    bottom: 0;
    z-index: 1;
    border-radius: 10px;

    .account_name {
      margin: 10% 0 2% 0;
      display: flex;
      justify-content: center;
      font-weight: 700;
    }
    .fans_info {
      width: 50%;
      margin-left: 25%;
      font-size: 12px;
      display: flex;
      justify-content: space-around;
      color: #93919c;
      font-weight: 600;

      span {
        padding-left: 5px;
      }
    }
  }
}
</style>
