<template>
  <div class="stationText">
    <p>{{ title }}</p>
    <p v-if="type == 'date'" :class="['baseline_text', className]">
      <span>{{ value | formatGridtime }}</span>
    </p>
    <p v-else-if="type == 'text'" :class="['baseline_text', className]">
      <el-tooltip class="item" effect="dark" :content="value" placement="top"
        ><span>{{ value }}</span></el-tooltip
      >
    </p>
    <p v-else class="numcls">
      <span :class="['num', className]">{{ value }}</span
      ><label>{{ unit }}</label>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "装机容量"
    },
    value: {
      default: "0"
    },
    unit: {
      default: ""
    },
    type: {
      //传入date格式化时间----2018年8月
      default: ""
    },
    className: {
      default: "f_green"
    }
  },
  filters: {
    formatGridtime(times) {
      var time = new Date(times);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      return year + "年" + month + "月";
    }
  }
};
</script>

<style lang="scss" scoped>
.stationText {
  padding-left: 18px;
  p{
     color: #656565;
  }
  span {
    // background-image: none;
    font-size: 20px;
    font-family: DINOT;
    margin-right: 10px;
  }
  .numcls {
    /*height: 38px;*/
    display: flex;
    align-items: flex-end;
    span{
      font-family:"DINOT" !important;
      font-size: 30px;
      color: #1bac6b;
    }
  }
  .num {
    // display: inline-block;
    // height: 38px;
    // vertical-align: bottom;
    font-size: 20px;
    font-family: "微软雅黑" !important;
    //   color: #1aac6b !important;
  }
  .baseline_text span {
    height: 38px;
    display: flex;
    align-items: flex-end;
    font-family: "微软雅黑";
    // overflow: hidden;
    // text-overflow:ellipsis;
    // white-space: nowrap;
  }
}
.stationText:last-child {
  .baseline_text span {
    padding-top: 12px;
  }
}
.f_blue {
  background-image: linear-gradient(to bottom, #00e7ff, #00b5ff 40%, #0083ff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.f_green {
  background-image: linear-gradient(to bottom, #26ead1, #2ad4a1 40%, #2dc076);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.f_orange_g {
  background-image: linear-gradient(to bottom, #ff8400, #fb5e00);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.f_grey {
  background-image: linear-gradient(to bottom, #b6caf5, #7487ae);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
