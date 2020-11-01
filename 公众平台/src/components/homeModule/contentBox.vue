<template>
  <div class="content-box" :id="id">
    <canvas
      :id="'cavans' + id"
      :width="canvasWidth"
      :height="canvasHeight"
      class="canvasbox"
    ></canvas>
    <div
      class="box-title"
      :style="{
        lineHeight:
          canvasWidth * 0.04 > 52 ? canvasWidth * 0.04 + 'px' : 52 + 'px'
      }"
    >
      {{ title }}
    </div>
    <div style="padding: 60px 20px 20px">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      default: "contentBox"
    },
    title: {
      default: ""
    }
  },
  data() {
    return {
      canvasWidth: 0,
      canvasHeight: 10
    };
  },
  created() {},
  methods: {
    initBG() {
      var el = document.getElementById("cavans" + this.id);
      var w = el.clientWidth,
        h = el.clientHeight;
      var ctx = el.getContext("2d");
      // var _this=this;
      var top = (w * 0.04 > 52 ? w * 0.04 : 52) / 2;
      drowArr([
        [0, top],
        [w - 20, top],
        [w, top + 20],
        [w, h],
        [20, h],
        [0, h - 20],
        [0, top]
      ]);
      drawImages(40, 5);
      function drowArr(arr) {
        //画菱形
        ctx.beginPath();
        for (var i = 0; i < arr.length; i++) {
          if (i == 0) {
            ctx.moveTo(arr[0][0], arr[0][1]);
          } else {
            ctx.lineTo(arr[i][0], arr[i][1]);
          }
        }
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "rgba(0,186,255,1)";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }
      function drawImages(x, y) {
        var imgs = document.createElement("img");
        imgs.width = w * 0.4;
        imgs.src = "/img/contentBox/title-bg.png";
        imgs.onload = function() {
          ctx.drawImage(imgs, x, y, w * 0.4, top * 2);
        };
      }
    }
  },
  mounted() {
    this.canvasWidth = document.getElementById(this.id).clientWidth;
    this.canvasHeight = document.getElementById(this.id).clientHeight;
    var that = this;
    this.$nextTick(function() {
      that.initBG();
    });
  }
};
</script>
<style scoped>
.content-box {
  min-height: 100px;
  width: 100%;
  position: relative;
  background-color: #fff;
}
.canvasbox {
  position: absolute;
  z-index: 0;
}
.box-title {
  position: absolute;
  z-index: 9;
  text-align: center;
  width: 40%;
  left: 40px;
  top: 0;
  font-size: 24px;
  /* font-style: italic; */
  font-family: "MStiffHeiPRC-Bold";
  color: #00baff;
  background-color: #fff;
  background-image: url("../../../public/img/index/rectBox.png");
  background-size: 100% 100%;
}
</style>
