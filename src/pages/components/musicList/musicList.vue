<template>
  <view class="content">
    <view class="title_bar" ref="titleBar">
      <view
        ><img
          @click="backFunClick"
          :src="require('../../../static/myMusic/return.png')"
          alt=""
      /></view>
      <view class="bar_name">{{ titleName }}</view>
      <view>
        <img
          class="search"
          :src="require('../../../static/myMusic/Search.png')"
          alt=""
        />
        <img
          class="menu"
          :src="require('../../../static/myMusic/rightMenu.png')"
          alt=""
        />
      </view>
    </view>

    <view class="info">
      <view class="titlebar">
        <view class="title_info">
          <img
            class="fengmian"
            :src="require('../images/FavoriteMusicCover.png')"
            alt=""
          />
          <view class="title">
            <view class="title_label">我喜欢的音乐</view>
            <view class="title_value">
              <img :src="require('../images/avator.png')" />
              山林不向四季起誓_cyril
              <img
                class="tomyInfo"
                :src="require('../../../static/myMusic/return.png')"
                alt=""
              />
            </view>
          </view>
        </view>
        <view class="functionBtn">
          <view class="btn" v-for="(item, index) in buttonList">
            <img class="logo" :src="item.logo" alt="" />
            <view class="label">{{ item.label }}</view>
          </view>
        </view>
      </view>

      <view :class="isFixed ? 'celling' : 'playerAll'">
        <view class="backColorLine" />
        <img
          :src="require('../../../static/myMusic/songSheet/Play.png')"
          alt=""
        />
        <view class="boFangAll"
          >播放全部 <span>({{ musicListData.length }})</span></view
        >
        <view class="backColor" />
      </view>

      <view class="music_list">
        <view
          @click="clickList(item)"
          class="content_menu"
          v-for="(item, index) in musicListData"
        >
          <view
            :class="index === selected ? 'menu_front_selected' : 'menu_front'"
          >
            <view class="sort">{{ index + 1 }}</view>
            <view class="menu_info">
              <view class="name">{{ item.musicName }}</view>
              <view class="author">{{ item.author }}</view>
            </view>
          </view>

          <view class="menu_behind">
            <img :src="require('../images/play.png')" alt="" />
            <img
              :src="require('../../../static/myMusic/rightMenu.png')"
              alt=""
            />
          </view>
        </view>
      </view>
    </view>

    <u-popup :show="show" @close="close" @open="open">
      <view style="height: 100vh"
        ><MusicPlayback
          :musicProps="clickData"
          :musicList="musicListData"
          @musicPlayToList="musicPlayToList"
          @prevMusicHandle="prevMusicHandle"
          @nextMusicHandle="nextMusicHandle"
      /></view>
    </u-popup>
  </view>
</template>

<script>
import MusicPlayback from "./MusicPlayback.vue";
import UPopup from "@/uni_modules/uview-plus/components/u-popup/u-popup.vue";

export default {
  data() {
    return {
      titleName: "歌单",
      show: false, //播放器popup状态
      clickData: {}, //当前播放
      isFixed: false,
      selected: 999,
      buttonList: [
        {
          label: "分享",
          logo: require("../images/share.png"),
        },
        {
          label: "评论",
          logo: require("../images/comments.png"),
        },
        {
          label: "收藏",
          logo: require("../images/collection.png"),
        },
      ],
      musicListData: [
        {
          musicName: "没有人不比我快乐",
          author: "Fine乐团",
          coverImg: require("@/static/audio/There is no one who is happier than me.png"),
          musicUrl: "/static/audio/ThereIsNoOneWhoIsHappierThanMe.mp3",
        },
        {
          musicName: "New Boy",
          author: "房东的猫,陈婧霏",
          coverImg: require("@/static/audio/NewBoy.png"),
          musicUrl: "/static/audio/New Boy.mp3",
        },
        {
          musicName: "得不到你",
          author: "Fine乐团",
          coverImg: require("@/static/audio/Can't get you.png"),
          musicUrl: "/static/audio/Can't get you.mp3",
        },
        {
          musicName: "城市动物园 (live版)",
          author: "房东的猫",
          coverImg: require("@/static/audio/City Zoo.png"),
          musicUrl: "/static/audio/City Zoo.mp3",
        },
        {
          musicName: "I Need a Doctor",
          author: "Skylar Grey Eminem Dr. Dre",
          coverImg: require("@/static/audio/I Need a Doctor.png"),
          musicUrl:
            "/static/audio/Skylar Grey Eminem Dr. Dre - I Need a Doctor.mp3",
        },
        {
          musicName: "沉醉于风中",
          author: "S.E.N.S",
          coverImg: require("@/static/audio/Indulge in the wind.png"),
          musicUrl: "/static/audio/Indulge in the wind.mp3",
        },
        {
          musicName: "光よ、ふたたび",
          author: "矢野立美",
          coverImg: require("@/static/audio/Human light.png"),
          musicUrl: "/static/audio/Human light.mp3",
        },
        {
          musicName: "天涯",
          author: "群星",
          coverImg: require("@/static/audio/End of the world.png"),
          musicUrl: "/static/audio/End of the world.mp3",
        },
        {
          musicName: "Past Lives",
          author: "Slushii",
          coverImg: require("@/static/audio/Past Lives.png"),
          musicUrl: "/static/audio/Slushii - Past Lives.mp3",
        },
        {
          musicName: "山鬼",
          author: "洛尘鞅_",
          coverImg: require("@/static/audio/Mountain ghosts.png"),
          musicUrl: "/static/audio/Mountain ghosts.mp3",
        },
        {
          musicName: "陌上花开（Cover 小爱的妈）",
          author: "玄觞",
          coverImg: require("@/static/audio/Flowers bloom on the stranger.png"),
          musicUrl: "/static/audio/Flowers bloom on the stranger.mp3",
        },
        {
          musicName: "好几年",
          author: "许晴",
          coverImg: require("@/static/audio/For several years.png"),
          musicUrl: "/static/audio/For several years.mp3",
        },
      ],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  onLoad() {
    this.$Api.getPlatList("32953014").then(
      (res) => {
        console.log(res);
      },
      (err) => {}
    );
  },
  methods: {
    backFunClick() {
      uni.switchTab({
        url: "/pages/myMusic/index",
      });
    },
    //打开播放器popup
    open() {
      this.show = true;
    },
    //关闭播放器popup
    close() {
      this.show = false;
    },
    //点击列表事件
    clickList(item) {
      this.show = true;
      this.clickData = item;
    },
    //播放器返回列表 val:popup打开状态 item:当前播放音乐
    musicPlayToList(item) {
      this.selected = this.musicListData.findIndex(
        (x) => x.musicName === item.musicName
      );
      this.show = false;
    },
    //判断滚动吸顶
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = 160 <= scrollTop;
    },
    //上一首 val=上一首音乐数据 status=当前播放模式 0-列表循环 1-随机播放
    prevMusicHandle(val, status) {
      let musicIndex = this.musicListData.findIndex(
        (x) => x.musicName === val.musicName
      );
      if (status === 0) {
        this.clickData =
          musicIndex === 0
            ? this.musicListData[this.musicListData.length - 1]
            : this.musicListData[musicIndex - 1];
      } else {
        this.clickData =
          this.musicListData[
            Math.floor(Math.random() * this.musicListData.length)
          ];
      }
    },
    //下一首 val=下一首音乐数据 status=当前播放模式 0-列表循环 1-随机播放
    nextMusicHandle(val, status) {
      let musicIndex = this.musicListData.findIndex(
        (x) => x.musicName === val.musicName
      );
      if (status === 0) {
        this.clickData =
          musicIndex === this.musicListData.length - 1
            ? this.musicListData[0]
            : this.musicListData[musicIndex + 1];
      } else {
        this.clickData =
          this.musicListData[
            Math.floor(Math.random() * this.musicListData.length)
          ];
      }
    },
  },
  components: {
    UPopup,
    MusicPlayback,
  },
};
</script>

<style lang="less">
.content {
  width: 100%;
  height: 100%;

  .title_bar {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 14px;
    background-color: #8d4c4a;
    position: fixed;
    z-index: 99;

    img {
      width: 25px;
      height: 25px;
      padding-left: 5px;
      cursor: pointer;
    }

    .bar_name {
      margin-left: 20px;
    }
    .search {
      width: 20px;
      height: 20px;
      padding-right: 5px;
    }
    .menu {
      width: 20px;
      height: 20px;
      padding-right: 10px;
    }
  }

  .info {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;

    .titlebar {
      width: 100%;
      height: 160px;
      padding-top: 40px;
      background-color: #8d4c4a;

      .title_info {
        width: 100%;
        height: 80px;
        display: flex;
        padding-top: 10px;
        padding-left: 15px;

        .fengmian {
          width: 80px;
          height: 80px;
        }

        .title {
          color: white;
          padding-left: 10px;
          padding-top: 10px;

          .title_label {
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 1px;
          }
          .title_value {
            color: #edcfc7;
            font-size: 10px;
            letter-spacing: 1px;
            padding-top: 5px;
            display: flex;
            align-items: center;

            .tomyInfo {
              width: 15px;
              height: 15px;
              transform: rotateY(180deg);
            }

            img {
              width: 22px;
              height: 22px;
              border-radius: 50%;
              padding-right: 5px;
            }
          }
        }
      }

      .functionBtn {
        width: 100%;
        height: 40px;
        color: white;
        display: flex;
        justify-content: space-around;
        padding-top: 15px;

        .btn {
          height: 40px;
          width: 30%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;

          .logo {
            width: 14px;
            height: 14px;
            padding-right: 10px;
          }

          .label {
            padding-bottom: 2px;
          }
        }
      }
    }

    .celling {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      background-color: #8d4c4a;
      position: fixed;
      top: 40px;

      img {
        width: 22px;
        height: 22px;
        padding-left: 10px;
        z-index: 90;
      }

      .backColorLine {
        width: 100%;
        height: 40px;
        position: absolute;
        background-color: #f1f0f5;
        border-radius: 20px 20px 0 0;
        z-index: 0;
      }

      .boFangAll {
        font-size: 15px;
        font-weight: 700;
        padding-left: 5px;
        z-index: 90;

        span {
          font-size: 12px;
          font-weight: 500;
          padding-left: 5px;
        }
      }
    }

    .playerAll {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      background-color: #8d4c4a;
      position: relative;

      img {
        width: 22px;
        height: 22px;
        padding-left: 10px;
        z-index: 90;
      }

      .backColorLine {
        width: 100%;
        height: 40px;
        position: absolute;
        background-color: #f1f0f5;
        border-radius: 20px 20px 0 0;
        z-index: 0;
      }

      .boFangAll {
        font-size: 15px;
        font-weight: 700;
        padding-left: 5px;
        z-index: 90;

        span {
          font-size: 12px;
          font-weight: 500;
          padding-left: 5px;
        }
      }
    }

    .music_list {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;

      .content_menu {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .menu_front_selected {
          height: 100%;
          display: flex;
          align-items: center;
          color: #f64842;

          .sort {
            padding: 0 15px 0 10px;
          }

          .name {
            font-size: 15px;
            font-weight: 400;
            padding-bottom: 2px;
          }

          .author {
            font-size: 12px;
          }
        }

        .menu_front {
          height: 100%;
          display: flex;
          align-items: center;

          .sort {
            padding: 0 15px 0 10px;
            color: #979797;
          }

          .name {
            font-size: 15px;
            font-weight: 400;
            padding-bottom: 2px;
          }

          .author {
            font-size: 12px;
            color: #979797;
          }
        }

        .menu_behind {
          display: flex;
          align-items: center;

          img {
            width: 20px;
            height: 20px;
            padding-right: 15px;
          }
        }
      }
    }
  }
}
</style>
