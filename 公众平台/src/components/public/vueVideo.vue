<template>
  <div>
    <video-player
      class="vjs-custom-skin"
      :options="playerOptions"
      :playsinline="true"
    ></video-player>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
// import "vue-video-player/src/custom-theme.css";
import "video.js/dist/video-js.css";
import "videojs-contrib-hls"; // 引入hls.js
export default {
  props: ["videourl", "videoType"],
  data() {
    return {
      playerOptions: {
        controls: true, //控制条
        language: "zh-CN",
        aspectRatio: "16:9",
        width: 400,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        autoplay: true,
        muted: true,
        loop: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "application/x-mpegURL",
            src: "" //m3u8的地址
          }
        ],
        poster: ""
      }
    };
  },
  components: {
    videoPlayer
  },
  created() {
    this.playerOptions.sources = [
      {
        type: this.videoType ? this.videoType : "application/x-mpegURL",
        src: this.videourl
      }
    ];
  },
  methods: {},
  filters: {
    // videourl (newurl) {
    //     // debugger
    //     return this.playerOptions.sources[0].src=newurl;
    // }
  }
};
</script>
