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
      loopType: 0, //0=>列表循环 1=>随机播放
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
      this.$emit("musicPlayToList", this.show);
    },
    //音乐播放
    playMusic() {
      music.src = this.musicProps.musicUrl;
      this.isPlaying = this.isPlaying === false;
      if (this.isPlaying) {
        music.play();
      } else {
        music.stop();
      }

      music.onEnded((x) => {
        console.log(x, "音乐播放结束");
      });
    },
    //上一首
    prevMusic() {
      this.$emit("prevMusicHandle", this.musicProps);
    },
    //下一首
    nextMusic() {
      this.$emit("nextMusicHandle", this.musicProps);
    },
    //播放模式
    loopHandle() {
      this.loopType === 0 ? (this.loopType = 1) : (this.loopType = 0);
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
