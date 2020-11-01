<template>
  <div class="head-box">
    <!-- <div class="head_nav" v-show="isShow" @click="jumpToBase"></div> -->
    <div class="title">{{baseName}}</div>
    <!-- <div
      class="weather-box"
      v-show="isShow"
      :class="{weather0:currentWeather == '3',weather1:currentWeather == '2',weather2:currentWeather == '1',weather3:currentWeather == '4'}"
    >
      <span>{{currentTemp}}</span>
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      default: false
    },
    currentTemp: {
      default: "21°"
    },
    currentWeather: {
      default: "1"
    }
  },
  data() {
    return {
      baseName:""
    };
  },
  mounted(){
    this.baseName = baseName;
  },
  methods: {
    jumpToBase(){
      this.$router.push('/stationDes');
    }
  }
};
</script>
<style lang="less">
.head-box {
  position: relative;
  .head_nav{
    width: 0.3rem;
    height: 0.28rem;
    background: url('../../assets/img/homeNav.png') no-repeat;
    background-size: 100%;
    position: absolute;
    top: 0.1rem;
    left: 0.16rem;
  }
  .title {
    font-family: "pingfang-blod";
    font-size: 0.2rem;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
    height: 0.5rem;
    line-height: 0.5rem;
  }
  .weather-box {
    position: absolute;
    top: 0.1rem;
    right: 0.4rem;
    width: 0.38rem;
    height: 0.3rem;
    span {
      color: #eff3f6;
      font-size: 0.18rem;
      line-height: 0.3rem;
      padding-left: 0.35rem;
      display: inline-block;
      font-family: "PingFang-SC-Regular";
    }
  }
  .weather0 {
    background: url("../../../static/img/rainbg.png") center no-repeat;
    background-size: 0.4rem 0.4rem;
  }
  .weather1 {
    background: url("../../../static/img/cloudybg.png") center no-repeat;
    background-size: 0.4rem 0.4rem;
  }
  .weather2 {
    background: url("../../../static/img/sunnybg.png") center no-repeat;
    background-size: 0.4rem 0.4rem;
  }
  .weather3 {
    background: url("../../../static/img/snowbg.png") center no-repeat;
    background-size: 0.4rem 0.4rem;
  }
}
</style>
