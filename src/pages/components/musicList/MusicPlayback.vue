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
        <img
          :class="isPlaying ? 'running' : 'pause'"
          :src="musicProps.coverImg"
          alt=""
      /></view>
    </view>
    <view class="music_funtionBtn">
      <view class="progress-bar">
        <view class="startTime">{{ musicStartTime }}</view>
        <u-line-progress
          :percentage="precent"
          :showText="false"
          height="3"
          activeColor="#f64842"
        ></u-line-progress>
        <!--        <view class="progress-bg"></view>-->
        <!--        <view class="progress-indicator"></view>-->
        <!--        <view class="progress-pointer"></view>-->
        <view class="endTime">{{ musicEndTime }}</view>
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
import ULineProgress from "@/uni_modules/uview-plus/components/u-line-progress/u-line-progress.vue";

let AudioContext = uni.createInnerAudioContext();
export default {
  components: { ULineProgress, UPopup },
  data() {
    return {
      isExpand: false, //是否打开播放器内列表
      isPlaying: false,
      loopType: 0, //0=>列表循环 1=>随机播放
      musicEndTime: "00:00", //音乐结束时间
      musicStartTime: "00:00", //音乐开始时间
      precent: 0,
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
    AudioContext.src = this.musicProps.musicUrl;
    let intervalID = setInterval(() => {
      if (AudioContext.duration !== 0) {
        clearInterval(intervalID);
        let time = AudioContext.duration.toFixed(0);
        let min = Math.floor(time / 60);
        let second = time % 60;
        this.musicEndTime =
          (min > 10 ? min : "0" + min) +
          ":" +
          (second > 10 ? second : "0" + second);
      } else this.musicEndTime = "00:00";
    }, 500);
    this.isPlaying = true;
    AudioContext.play();

    //音频播放进度更新事件
    AudioContext.onTimeUpdate(() => {
      let time = AudioContext.currentTime.toFixed(0);
      let min = Math.floor(time / 60);
      let second = time % 60;
      if (time) {
        this.musicStartTime =
          (min >= 10 ? min : "0" + min) +
          ":" +
          (second >= 10 ? second : "0" + second);
      }

      let endTime =
        AudioContext.duration.toFixed(0) - AudioContext.currentTime.toFixed(0);
      let endMin = Math.floor(endTime / 60);
      let endSecond = endTime % 60;
      if (endTime) {
        this.musicEndTime =
          (endMin >= 10 ? endMin : "0" + endMin) +
          ":" +
          (endSecond >= 10 ? endSecond : "0" + endSecond);
      }
      this.precent = (AudioContext.currentTime / AudioContext.duration) * 100;
    });

    //播放监听事件
    AudioContext.onPlay(() => {
      // console.log("播放事件监听");
    });
    //暂停监听
    AudioContext.onPause(() => {
      console.log("暂停事件监听");
    });
    //暂停监听
    AudioContext.onStop(() => {
      console.log("停止事件监听");
    });
    AudioContext.onEnded((x) => {
      // console.log(x, "音乐播放自然结束事件监听");
      this.$emit("prevMusicHandle", this.musicProps, this.loopType);
    });
  },
  methods: {
    //返回列表
    backListClick() {
      this.$emit("musicPlayToList", this.musicProps);
    },
    //展开播放器内列表信息
    expandListHandle() {
      this.isExpand = true;
    },
    //打开内列表popup
    open() {
      this.isExpand = true;
    },
    //关闭内列表popup
    close() {
      this.isExpand = false;
    },
    //音乐播放
    playMusic() {
      AudioContext.src = this.musicProps.musicUrl;
      this.isPlaying = this.isPlaying === false;
      if (this.isPlaying) {
        AudioContext.play();
      } else {
        AudioContext.stop();
      }
    },
    //上一首
    prevMusic() {
      AudioContext.stop();
      this.$emit("prevMusicHandle", this.musicProps, this.loopType);
    },
    //下一首
    nextMusic() {
      AudioContext.stop();
      this.$emit("nextMusicHandle", this.musicProps, this.loopType);
    },
    //播放模式
    loopHandle() {
      this.loopType === 0 ? (this.loopType = 1) : (this.loopType = 0);
    },
    //popup中切换歌曲
    popupCutSong(val) {
      AudioContext.src = val.musicUrl;
      this.musicProps = val;
      AudioContext.play();
      this.isExpand = false;
    },
  },
  watch: {
    musicProps: {
      handler(new__, old__) {
        let intervalID = setInterval(() => {
          if (AudioContext.duration !== 0) {
            clearInterval(intervalID);
            let time = AudioContext.duration.toFixed(0);
            let min = Math.floor(time / 60);
            let second = time % 60;
            this.musicEndTime =
              (min > 10 ? min : "0" + min) +
              ":" +
              (second > 10 ? second : "0" + second);
          } else this.musicEndTime = "00:00";
        }, 500);
        this.isExpand = false;
        AudioContext.src = new__.musicUrl;
        AudioContext.play();
      },
    },
    isPlaying: {
      handler(new__, old__) {},
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

      img {
        border-radius: 50%;
        margin-left: 44px;
        margin-top: 44px;
        animation: 20s revolve linear infinite;
      }
      .running {
        animation-play-state: running;
      }
      .pause {
        animation-play-state: paused;
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
      margin-left: 72px;
      height: 2px;
      width: 60%;
      cursor: pointer;
      background: #aaa;
      color: white;

      .startTime {
        position: absolute;
        left: -50px;
      }

      .endTime {
        position: absolute;
        right: -50px;
      }

      .progress-bg {
        position: absolute;
        left: 0;
        height: 5px;
        width: 100%;
        background-color: hsla(0deg 83.4% 10.73% / 20%);
      }

      .progress-indicator {
        position: absolute;
        left: 0;
        height: 5px;
        width: 100%;
        transform-origin: 0 0;
        transform: scaleX(0);
        background-color: #00a1d6;
      }

      .progress-pointer {
        position: absolute;
        left: 0;
        height: 5px;
        width: 5px;
        border-radius: 50%;
        background-color: #d0dadd;
      }
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
