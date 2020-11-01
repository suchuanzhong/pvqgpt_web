<template>
  <div id="app">
    <transition :name="'vux-pop-' + direction">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState } from "Vuex";
export default {
  name: "App",
  components: {},
  data() {
    return {
      direction: null
    };
  },
  watch: {
    //控制界面切换动画
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.direction = "in";
      } else if (to.meta.index < from.meta.index) {
        this.direction = "out";
      } else {
        this.direction = "";
      }
    }
  },
  computed: {}
};
</script>

<style lang='less'>
@import "./assets/css/common.less";
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "pingfang-regular", arial, "Microsoft Yahei", sans-serif;
  font-size: 0.16rem;
  background: #f8f7fc;
}
// 添加过度效果
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 250ms;
  height: 100%;
  width: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>


