<template>
  <div class="pres">
    <template v-if="dataArr[actIndex] && dataArr[actIndex].data.length > 0">
      <div class="piePercent">
        <div
          v-for="(item, idx) in dataArr[actIndex].data"
          style="height:120px;width:25%;display:inline-block;margin-bottom:60px;"
          :key="idx"
        >
          <echartsPie
            v-if="showPie"
            :ids="'timepie' + idx"
            :dataObj="item"
          ></echartsPie>
        </div>
      </div>
      <div :id="ids" class="full"></div>
    </template>
    <template v-else>
      <div v-if="dataArr.length == 0 || !dataArr" class="no-data">暂无数据</div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      actIndex: 0,
      showPie: true
    };
  },
  components: {
    echartsPie: resolve => {
      require(["@/components/public/echarts/echartsPie.vue"], resolve);
    }
  },
  watch: {
    actIndex() {
      this.showPie = false;
      this.$nextTick(() => {
        this.showPie = true;
      });
    }
  },
  props: {
    ids: {
      default: "echartsBar"
    },
    theme: {
      default: function() {
        return ["#00a8f6", "#12c9fe"];
      }
    },
    xAxisName: {
      default: function() {
        return ["电站1", "电站2", "电站3"];
      }
    },
    dataArr: {
      default: function() {
        return [
          {
            year: "2015",
            data: [
              { name: "电站1", value: 60, unit: "%" },
              { name: "电站2", value: 65, unit: "%" },
              { name: "电站3", value: 63, unit: "%" },
              { name: "电站4", value: 63, unit: "%" },
              { name: "电站5", value: 63, unit: "%" },
              { name: "电站6", value: 63, unit: "%" }
            ]
          },
          {
            year: "2016",
            data: [
              { name: "电站1", value: 30, unit: "%" },
              { name: "电站2", value: 45, unit: "%" },
              { name: "电站3", value: 23, unit: "%" },
              { name: "电站4", value: 23, unit: "%" },
              { name: "电站5", value: 23, unit: "%" }
            ]
          },
          {
            year: "2017",
            data: [
              { name: "电站1", value: 64, unit: "%" },
              { name: "电站1", value: 35, unit: "%" },
              { name: "电站1", value: 33, unit: "%" }
            ]
          },
          {
            year: "2018",
            data: [
              { name: "电站1", value: 30, unit: "%" },
              { name: "电站1", value: 55, unit: "%" },
              { name: "电站1", value: 43, unit: "%" }
            ]
          }
        ];
      }
    }
  },
  mounted() {
    if (this.dataArr.length == 0 || !this.dataArr) {
      return false;
    } else {
      this.$nextTick(() => {
        this.initEcharts();
      });
    }
  },
  methods: {
    initEcharts() {
      let mychart = this.$echarts.init(document.getElementById(this.ids));
      let echarts = this.$echarts;
      let timeArr = [];

      for (var i = 0; i < this.dataArr.length; i++) {
        timeArr.push(this.dataArr[i].year);
      }

      mychart.setOption({
        baseOption: {
          timeline: {
            tooltip: false,
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 5000,
            left: "10%",
            right: "10%",
            bottom: 0,
            data: timeArr,
            lineStyle: {
              color: "#dadada",
              width: 1
            },
            symbolSize: 6,
            label: {
              color: "#666666",
              fontSize: 14,
              formatter: function(value) {
                var date = new Date(value);
                var texts = date.getFullYear();
                return texts;
              }
            },
            itemStyle: {
              color: "#Fff",
              borderColor: "#666",
              shadowBlur: 10,
              shadowColor: "#fff",
              borderWidth: 0.5
            },
            checkpointStyle: {
              symbolSize: 15,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#1da63b"
                },
                {
                  offset: 1,
                  color: "#19b197"
                }
              ]),
              borderWidth: 5,
              borderColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "#25c182" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fff" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            controlStyle: {
              color: "#aaaaaa",
              borderColor: "#aaaaaa"
            },
            emphasis: {
              label: {
                color: "#19b197",
                fontSize: 14
              },
              itemStyle: {
                color: "#19b197"
              },
              controlStyle: {
                color: "#19b197",
                borderColor: "#19b197",
                borderWidth: 1
              }
            }
          }
        }
      });
      let _this = this;
      mychart.on("timelinechanged", function(timeLineIndex) {
        _this.actIndex = timeLineIndex.currentIndex;
      });
    }
  }
};
</script>
<style lang="scss">
.piePercent {
  width: 100%;
  height: calc(100% - 60px);
  text-align: center;
  padding-top: 30px;
}
.full {
  width: 100%;
  height: 60px;
}
</style>
