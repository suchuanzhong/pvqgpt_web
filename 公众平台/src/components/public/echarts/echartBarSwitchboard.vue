<template>
  <div>
    <div class="legend-list">
      <ul>
        <li
          v-for="(item, idx) in dataArr"
          :key="idx"
          @click="toggleSelect(item, idx)"
          :class="{ default: !item.selected, floatRight: idx % 2 === 0 }"
        >
          <div class="flex">
            <i
              class="icon-legend"
              :style="{
                backgroundColor: theme[idx],
                'background-image':
                  'linear-gradient(to right, ' +
                  theme[idx] +
                  ' ,' +
                  theme2[idx] +
                  ')'
              }"
            ></i>
            <span>{{ item.name }}</span>
            <big>{{ item.value }}</big>
          </div>
        </li>
      </ul>
    </div>
    <div :id="ids" style="width:100%;height:100%"></div>
  </div>
</template>
<script>
export default {
  props: {
    ids: {
      default: "pie"
    },
    unit: {
      default: "(MW)"
    },
    theme: {
      default: function() {
        return ["#ffd200", "#19b197", "#12c9fe"];
      }
    },
    theme2: {
      default: function() {
        return ["#e2980a", "#1da63b", "#5085f2"];
      }
    },

    centerObj: {
      default: function() {
        return {
          name: "总装机",
          value: ""
        };
      }
    },
    dataObj: {
      default: function() {
        return [
          {
            name: "第一批次",
            value: 100
          },
          {
            name: "第二批次",
            value: 231
          },
          {
            name: "第三批次",
            value: 1233
          }
        ];
      }
    }
  },
  data() {
    return {
      dataArr: [],
      selected: [],
      mychart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      var xdata = JSON.parse(JSON.stringify(this.dataObj));
      this.dataArr = xdata.map(item => {
        var data = item;
        data.selected = true;
        return data;
      });
      this.drawChart();
    });
  },
  methods: {
    toggleSelect(data, index) {
      // this.$emit("clickPieLegend", data, index);
      this.dataArr[index].selected = !data.selected;
      this.drawChart();
    },
    drawChart() {
      let mychart = this.$echarts.init(document.getElementById(this.ids));
      let echarts = this.$echarts;
      let ydata = [];
      let color = this.theme;
      let xdata = this.dataArr;
      this.selected = [];

      xdata.forEach((item, i) => {
        if (item.selected) {
          this.selected.push(item.name);
          ydata.push({
            value: item.value,
            name: item.name,
            itemStyle: {
              normal: {
                borderColor: "#ffffff",
                borderWidth: 6,
                color: new echarts.graphic.LinearGradient(
                  1,
                  0,
                  0,
                  0,
                  [
                    {
                      offset: 1,
                      color: this.theme[i]
                    },
                    {
                      offset: 0,
                      color: this.theme2[i]
                    }
                  ],
                  false
                )
              }
            }
          });
        }
      });
      let option = {
        backgroundColor: "rgba(255,255,255,1)",
        graphic: {
          elements: [
            {
              type: "image",
              z: 3,
              style: {
                image: "/img/circle.png",
                width: 148,
                height: 148
              },
              left: "6.8%",
              top: "22.2%",
              // position: [100, 100]
            },
            {
              type: "text",
              z: 3,
              style: {
                width: 148,
                text: this.centerObj.name,
                color: "#666666",
                textAlign: "center",
                fontSize: 16
              },
              left: "20%",
              top: "38%",
              // position: [100, 100]
            },
            {
              type: "text",
              z: 3,
              style: {
                text: this.centerObj.value,
                fontSize: 24,
                // textAlign: "center",
                fontFamily: "euro_regular",
                color: "#333"
              },
              
              left: "50px",
              top: "50%",
              // position: [100, 100]
            }
          ]
        },
        color: color,
        legend: {
          orient: "vartical",
          x: "left",
          top: "center",
          // left: 'right',
          left: "20%",
          bottom: "0%",
          data: xdata,
          selected: this.selected,
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 16,
          show: false,
          formatter: function(name) {
            return "" + name;
          }
        },

        series: [
          {
            type: "pie",
            clockwise: false, //饼图的扇区是否是顺时针排布
            minAngle: 5, //最小的扇区角度（0 ~ 360）
            radius: ["53%", "64%"],
            center: ["28%", "48%"],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            itemStyle: {
              //图形样式
              normal: {
                borderColor: "#ffffff",
                borderWidth: 6
              }
            },
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: "{text|{b}}\n{c} ({d}%)",
                rich: {
                  text: {
                    color: "#66666",
                    fontSize: 14,
                    align: "center",
                    verticalAlign: "middle",
                    padding: 8
                  },
                  value: {
                    color: "#8693F3",
                    fontSize: 24,
                    align: "center",
                    verticalAlign: "middle"
                  }
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: 24
                }
              }
            },
            data: ydata
          }
        ],
        title: {
          show: true,
          text: this.unit,
          left: "58%",
          top: "18%",
          textStyle: {
            fontWeight: "normal",
            fontSize: 14,
            color: "#000000"
          }
        }
      };
      mychart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.legend-list {
  display: flex;
  position: absolute;
  top: 58%;
  left: 230px;
  z-index: 99;
  transform: translate(0, -50%);
  li {
    display: block;
    /*width: 25%;*/
    margin: 20px 0;
    cursor: pointer;

    .flex {
      display: flex;
      /*width: 100%;*/
      i,
      span,
      big {
        vertical-align: middle;
      }
      big {
        color: #1bac6b;
        font-size: 14px;
        font-weight: bolder;
        padding-left: 12px;
      }
      span {
        color: #666;
        width: 4em;
        margin-left: 10px;
        font-size: 14px;
      }
      i.icon-legend {
        margin-top: 8px;
        display: inline-block;
        height: 6px;
        border-radius: 3px;
        width: 20px;
      }
    }
    &.default {
      i.icon-legend {
        background: #999999 !important;
      }
      big {
        color: #999 !important;
      }
    }
    /*&:nth-of-type(2n + 1) {*/
    /*  margin-right: 25%;*/
    /*}*/
    /*&:nth-of-type(2n) {*/
    /*  margin-left: 25%;*/
    /*}*/
  }
}
</style>
