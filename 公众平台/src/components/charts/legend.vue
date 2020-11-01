<template>
  <div class="legend">
    <span v-for="(item, index) in legendData" :key="index">
      <i
        class="legend-color"
        :class="{ echartLine: item.type && item.type == 'line' }"
        :style="{ borderColor: legendColor[index] }"
      ></i
      >{{ item.text ? item.text : item }}
    </span>
  </div>
</template>

<script>
export default {
  name: "legend",
  props: {
    legendColor: {
      default: function() {
        return ["#00c6ff", "#32eac5", "#ff8400"];
      }
    },
    legendData: {
      default: function() {
        return ["发电量", "利用小时数"];
      }
    }
  }
};
</script>

<style scoped>
.legend-color {
  border: 1px solid #fff;
  /* border-image-source: linear-gradient(90deg, #2edaff 0%, #0072ff 100%); */
  border-radius: 3px;
  width: 15px;
  height: 5px;
  display: inline-block;
  margin: 0 10px;
}
.echartLine {
  height: 3px;
  border-radius: 0;
  border: none;
  border-top: 1px solid;
  /* border-top: 1px dashed; */
}
.legend {
  text-align: right;
}
.legend span {
  font-size: 14px;
  color: #737373;
  display: inline-block;
  margin: 0 5px;
  line-height: 30px;
}
</style>
