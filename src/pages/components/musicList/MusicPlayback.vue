<template>
  <view class="musicPlayBack_content">
    <view class="titlebar">
      <view>
        <img
          class="back_img"
          @click="backListClick"
          :src="require('../images/向下箭头.png')"
          alt=""
        />
      </view>
      <view class="music_info">
        <view class="name">{{ musicProps.musicName }}</view>
        <view class="author">{{ musicProps.author }}</view>
      </view>
      <view
        ><img
          class="share_img"
          :src="require('@/static/audio/分享.png')"
          alt=""
      /></view>
    </view>
    <view class="music_cover">
      <view class="zhizhen">
        <img class="zz" src="../../../static/myMusic/指针.png" alt="" />
      </view>
      <view class="album_art">
        <img class="fm" :src="musicProps.coverImg" alt=""
      /></view>
    </view>
    <view class="music_funtionBtn">
      <view class="progress-bar">
        <view class="progress-bg"></view>
        <view class="progress-indicator"></view>
        <view class="progress-pointer"></view>
      </view>
      <view class="funtionBtn">
        <img @click="loopHandle" class="xh_img" :src="loopImage" alt="" />
        <img
          @click="prevMusic"
          class="sys_img"
          :src="require('../images/上一首.png')"
          alt=""
        />
        <img @click="playMusic" class="bf_img" :src="playImage" alt="" />
        <img
          @click="nextMusic"
          class="xys_img"
          :src="require('../images/下一首.png')"
          alt=""
        />
        <img
          @click="expandListHandle"
          class="lb_img"
          :src="require('../images/列表菜单.png')"
          alt=""
        />
      </view>
    </view>

    <u-popup :show="isExpand" @open="open" @close="close" :round="10">
      <view class="expandList">
        <view v-for="(item, index) in musicList">
          <view class="container" @click="popupCutSong(item)">
            <view
              :class="
                item.musicName === musicProps.musicName
                  ? 'left_selectedContainer'
                  : 'left_container'
              "
            >
              <view class="sort">{{ index + 1 }}</view>
              <view class="name">{{ item.musicName }}</view>
            </view>
            <view
              :class="
                item.musicName === musicProps.musicName
                  ? 'right_selectedContainer'
                  : 'right_container'
              "
              ><span>{{ item.author }}</span>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import UPopup from "@/uni_modules/uview-plus/components/u-popup/u-popup.vue";

let music = null;
music = uni.createInnerAudioContext();

export default {
  components: { UPopup },
  data() {
    return {
      isExpand: false, //是否打开播放器内列表
      isPlaying: false,
      loopType: 0, //0=>列表循环 1=>随机播放
    };
  },
  props: {
    musicProps: {},
    musicList: [],
  },
  computed: {
    playImage() {
      return this.isPlaying
        ? "/static/components/暂停.png"
        : "/static/components/播放器.png";
    },
    loopImage() {
      return this.loopType === 0
        ? "/static/components/列表循环.png"
        : "/static/components/随机播放.png";
    },
  },
  mounted() {
    console.log("准备播放");
    music.src = this.musicProps.musicUrl;
    this.isPlaying = true;
    music.play();
  },
  methods: {
    //返回列表
    backListClick() {
      this.$emit("musicPlayToList", this.musicProps);
    },
    //展开播放器内列表信息
    expandListHandle() {
      this.isExpand = true;
      console.log(this.isExpand);
    },
    //打开内列表popup
    open() {
      console.log("打开");
    },
    //关闭内列表popup
    close() {
      this.isExpand = false;
      console.log("关闭");
    },
    //音乐播放
    playMusic() {
      music.src = this.musicProps.musicUrl;
      this.isPlaying = this.isPlaying === false;
      if (this.isPlaying) {
        music.play();
      } else {
        music.pause();
      }

      music.onPlay(() => {
        //播放监听事件
        console.log("开始播放");
        this.isPlaying = true;
      });
      music.onPause(() => {
        //暂停监听
        console.log("暂停");
        this.isPlaying = false;
      });
      music.onStop(() => {
        //暂停监听
        console.log("停止");
      });
      music.onEnded((x) => {
        console.log(x, "音乐播放结束");
      });
    },
    //上一首
    prevMusic() {
      this.$emit("prevMusicHandle", this.musicProps, this.loopType);
    },
    //下一首
    nextMusic() {
      this.$emit("nextMusicHandle", this.musicProps, this.loopType);
    },
    //播放模式
    loopHandle() {
      this.loopType === 0 ? (this.loopType = 1) : (this.loopType = 0);
    },
    //popup中切换歌曲
    popupCutSong(val) {
      music.src = val.musicUrl;
      this.musicProps = val;
      music.play();
      this.isExpand = false;
    },
  },
};
</script>

<style lang="less">
.musicPlayBack_content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  background: linear-gradient(to bottom, #090909, #454746, #060606);
  overflow: hidden;

  .titlebar {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    .back_img {
      width: 20px;
      height: 20px;
      padding: 0 10px;
    }

    .music_info {
      display: flex;
      flex-wrap: wrap;

      .name {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 14px;
      }
      .author {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 12px;
        color: #b3b3b5;
      }
    }

    .share_img {
      width: 20px;
      height: 20px;
      padding-right: 10px;
    }
  }

  .music_cover {
    width: 100%;
    height: calc(100% - 200px);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: run 10s linear infinite paused;
    .zhizhen {
      width: 187px;
      height: 480px;
      margin-left: 171px;

      .zz {
        width: 170px;
      }
    }

    @keyframes revolve {
      25% {
        transform: rotate(90deg);
      }
      50% {
        transform: rotate(180deg);
      }
      75% {
        transform: rotate(270deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .album_art {
      background: url("../../../static/myMusic/黑胶.png");
      border-radius: 50%;
      height: 40%;
      width: 71%;
      background-size: cover;
      position: fixed;
      animation: 20s revolve linear infinite;
      img {
        border-radius: 50%;
        margin-left: 44px;
        margin-top: 44px;
      }
    }
  }

  .music_funtionBtn {
    width: 100%;
    height: 150px;
    .progress-bar {
      display: flex;
      align-items: center;
      position: relative;
      margin-left: 32px;
      height: 2px;
      width: 80%;
      cursor: pointer;
      background: #aaa;
    }
    .progress-bar .progress-bg {
      position: absolute;
      left: 0;
      height: 5px;
      width: 100%;
      background-color: hsla(0deg 83.4% 10.73% / 20%);
    }
    .progress-bar .progress-indicator {
      position: absolute;
      left: 0;
      height: 5px;
      width: 100%;
      transform-origin: 0 0;
      transform: scaleX(0);
      background-color: #00a1d6;
    }
    .progress-bar .progress-pointer {
      position: absolute;
      left: 0;
      height: 5px;
      width: 5px;
      border-radius: 50%;
      background-color: #d0dadd;
    }

    .funtionBtn {
      width: 100%;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .xh_img {
        width: 30px;
        height: 30px;
      }
      .sys_img {
        width: 30px;
        height: 30px;
      }
      .bf_img {
        width: 60px;
        height: 60px;
      }
      .xys_img {
        width: 30px;
        height: 30px;
      }
      .lb_img {
        width: 30px;
        height: 30px;
      }
    }
  }

  .expandList {
    width: 100%;
    height: 60vh;
    overflow-y: scroll;
    overflow-x: hidden;

    .container {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .left_selectedContainer {
        width: 70%;
        display: flex;
        justify-content: flex-start;
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
      }

      .left_container {
        width: 70%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .sort {
          padding: 0 15px 0 10px;
        }

        .name {
          font-size: 15px;
          font-weight: 400;
          padding-bottom: 2px;
        }
      }

      .right_selectedContainer {
        width: 20%;
        display: flex;
        justify-content: flex-start;
        font-size: 12px;
        color: #f64842;

        span {
          width: 70px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .right_container {
        width: 20%;
        display: flex;
        justify-content: flex-start;
        font-size: 12px;

        span {
          width: 70px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
