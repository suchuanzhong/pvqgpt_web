<template>
  <div :class="['box_rec', bgColor]">
    <img :src="urlImg" alt="" />
    <div class="right_text">
      <p>{{ title }}</p>
      <div v-if="type == 'date'" class="number data_text">
        <span>{{ value | formatGridtime }}</span>
      </div>
      <div v-else class="number data_text">
        <span>{{ value | filterTwo }}</span>
      </div>
      <!-- <div v-else class="number"><countToCompent :endVal="getVal" :decimals="decimals" :startVal='0'></countToCompent><span v-if="ispercent">%</span></div> -->
      <span class="unit">{{ unit }}</span>
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
      default: "指标达标率"
    },
    value: {
      default: 0
    },
    unit: {
      default: ""
    },
    decimals: {
      //保留小数位数
      default: 0
    },
    bgColor: {
      default: "b_green"
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
  filters: {
    formatGridtime(times) {
      var time = new Date(times);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      return year + "年" + month + "月";
    },
    filterTwo(val) {
      let currentVal = val.toString();
      if (isNaN(currentVal)) return currentVal;
      else return Number(currentVal).toFixed(2);
    }
  }
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
.b_green {
  background: url("/img/index/box-green.png") no-repeat;
  .number,
  .unit {
    background-image: linear-gradient(to right, #1ab08b, #1ea73f);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.b_blue {
  background: url("/img/index/box-blue.png") no-repeat;
  .number,
  .unit {
    background-image: linear-gradient(#00e7ff, #00b5ff 40%, #0083ff);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.box_rec {
  width: 100%;
  // height: 86px;
  padding: 12% 0;
  background-size: 100% 100%;
  position: relative;
  img {
    width: 9.5%;
    display: block;
    position: absolute;
    top: 25.5%;
    left: 6.7%;
  }
  p {
    position: absolute;
    top: 0px;
    left: 27%;
    padding-right: 14px;
    font-size: 16px;
    background-color: #fff;
    // margin-bottom: 10px;
  }
  .number {
    font-size: 30px;
    position: absolute;
    bottom: 14px;
    left: 27%;
  }
  .unit {
    position: absolute;
    bottom: 20px;
    right: 40px;
  }
  .data_text {
    font-size: 28px;
    bottom: 18px;
  }
}
.right_text {
  p {
    color: #666;
  }
}
@media screen and (max-width: 1200px) {
  .box_rec {
    width: 340px;
    padding: 43px 0;
  }
}
</style>
