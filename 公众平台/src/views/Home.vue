<template>
  <div style="height:100%;">
    <MyHeader class="white"></MyHeader>
    <router-view />
    <div class="scrollTop" v-if="scrollTop > 200" @click="scrollToTop(0)"></div>
    <div class="footer" v-if="$route.name !== '数字可视化'">
      <p>
        <span>版权所有：水电水利规划设计总院</span>
        <span>地址：北京西城区六铺炕北小街2号</span>
        <span>邮编：1000120</span>
        <span>总院电话：010-51973283</span>
      </p>
      <div class="footer-text-small">
        Copyright © 2012 www.creei.cn ALL Rights Reserved 京ICP备12033827号
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    MyHeader: resolve => {
      require(["@/components/public/header.vue"], resolve);
    }
  },
  data() {
    return {
      scrollTop: 0
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrollTop = document.documentElement.scrollTop;
    },
    scrollToTop(val) {
      // document.documentElement.scrollTop = val;
      this.scrollAnimation(this.scrollTop, val);
    },
    scrollAnimation(currentY, targetY = 0) {
      // 计算需要移动的距离
      let needScrollTop = targetY - currentY;
      let _currentY = currentY;
      setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10);
        _currentY += dist;
        window.scrollTo(_currentY, currentY);
        // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        if (needScrollTop > 10 || needScrollTop < -10) {
          this.scrollAnimation(_currentY, targetY);
        } else {
          window.scrollTo(_currentY, targetY);
        }
      }, 1);
    }
  }
};
</script>
<style lang="scss">
.footer {
  background: #2d2d2d;
  padding: 30px 0 35px;
  text-align: center;
  p {
    line-height: 2em;
    span {
      font-size: 14px;
      color: rgba($color: #fff, $alpha: 0.9);
      padding: 0 10px;
    }
  }
  .footer-text-small {
    color: rgba($color: #fff, $alpha: 0.5);
    font-size: 12px;
  }
}
.scrollTop {
  position: fixed;
  bottom: 200px;
  right: 50px;
  width: 56px;
  height: 56px;
  cursor: pointer;
  background: url(../assets/img/scrollTop.png);
  &:hover {
    background: url(../assets/img/scrollTop-act.png);
  }
}
</style>
