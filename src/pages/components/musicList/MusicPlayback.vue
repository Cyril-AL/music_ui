<template>
  <view class="content">
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
    <view class="music_cover"></view>
    <view class="music_funtionBtn">
      <view class="funtionBtn">
        <img class="xh_img" :src="require('../images/循环06.png')" alt="" />
        <img class="sys_img" :src="require('../images/上一首.png')" alt="" />
        <img @click="playMusic" class="bf_img" :src="playImage" alt="" />
        <img class="xys_img" :src="require('../images/下一首.png')" alt="" />
        <img class="lb_img" :src="require('../images/列表菜单.png')" alt="" />
      </view>
    </view>
  </view>
</template>

<script>
let music = null;
music = uni.createInnerAudioContext();

export default {
  data() {
    return {
      show: false,
      isPlaying: false,
    };
  },
  props: {
    musicProps: {},
  },
  computed: {
    playImage() {
      return this.isPlaying
        ? "/static/components/暂停.png"
        : "/static/components/播放器.png";
    },
  },
  mounted() {
    console.log("App onLaunch");
  },
  methods: {
    backListClick() {
      this.$emit("musicPlayToList", this.show);
    },
    playMusic() {
      music.src = this.musicProps.musicUrl;
      this.isPlaying = this.isPlaying === false;
      if (this.isPlaying) {
        music.play();
      } else {
        music.stop();
      }

      music.onPlay(() => {
        console.log("开始播放");
      });
      music.onPause(() => {
        console.log("开始暂停");
      });
    },
  },
};
</script>

<style lang="less">
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  background: linear-gradient(to bottom, #090909, #454746, #060606);

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
  }

  .music_funtionBtn {
    width: 100%;
    height: 150px;
    border-top: 1px red solid;

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
}
</style>
