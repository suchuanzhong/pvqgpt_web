<template>
  <div :class="['box_rec', bgColor]">
    <img :src="urlImg" alt="" />
    <div class="right_text">
      <div  class="title">
        <span>{{title }}</span>
      </div>
      <span class="title1">{{ titleTwo }}</span>
    </div>
  </div>
</template>

<script>
/**
 * // 引用需在父组件设置 .box_rec的宽和上下padding（如：width: 340px; padding: 43px 0;）
 */
// import countToCompent from '@/components/countToCompent'
export default {
  props: {
    imgName: {
      default: "eval_1"
    },
    title: {
      default: "组件技术 "
    },
    value: {
      default: 0
    },
    titleTwo: {
      default: "逐年提高"
    },
    decimals: {
      //保留小数位数
      default: 0
    },
    bgColor: {
      default: "risingOf"
    },
    ispercent: {
      default: false
    },
    type: {
      default: "number"
    }
  },
  components: {
    // countToCompent
  },
  computed: {
    urlImg() {
      return "/img/index/" + this.imgName + ".png";
    },
    getVal() {
      return this.value.toString().replace(/%/, "");
    }
  },

 
};
</script>
<style lang="scss">
// .box_rec{
//     .number span{
//         font-family: 'DINOT';
//     }
// }
</style>

<style lang="scss" scoped>
.risingOf {
  background: url("/img/index/risingOf.png") no-repeat;
  .title {
    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF;
  }
}
.cost {
  background: url("/img/index/cost.png") no-repeat;
  .title {
    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF;
  }
}
.elctricityPrices {
  background: url("/img/index/elctricityPrices.png") no-repeat;
  .title {
    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF;
  }
}
.box_rec {
  width: 100%;
  // height: 86px;
  padding: 12% 0;
  background-size: 100% 100%;
  position: relative;
  img {
    width: 48px;
    display: block;
    position: absolute;
    top: 12px;
    left:16px;
  }
  .title {
    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF;
    position: absolute;
    bottom: 26px;
    left: 28%;
  }
  .title1 {
    position: absolute;
    bottom: 24px;
    right: 20px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-style: italic;
    color: #FFFFFF;
  }

}
@media screen and (max-width: 1200px) {
  .box_rec {
    width: 340px;
    padding: 43px 0;
  }
}
</style>
