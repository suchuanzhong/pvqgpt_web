<template>
  <div class="barHeight">
    <div :id="ids" class="full"></div>
    <div :id="ids+'bg'" class="full full-bg"></div>
  </div>

</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    ids: {
      default: "echartsBar"
    },
   
    showTimeLine: {
      default: true
    },

    data: {
      default: function() {
        return {
          series: [{
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: 500,
              edgeLength: 10
            },
            roam: true,
            label: {
              normal: {
                show: true
              }
            },
            data: [{
              "name": "新冠肺炎愈后一般6个月内不会再得",
              "value": 2373,
              "symbolSize": 48,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#1e90ff",
                  "color": "#1e90ff"
                }
              }
            }, {
              "name": "女篮两连胜后大喊武汉加油",
              "value": 5449,
              "symbolSize": 73,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#7b68ee",
                  "color": "#7b68ee"
                }
              }
            }, {
              "name": "火神山医院开微博",
              "value": 2289,
              "symbolSize": 67,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#00fa9a",
                  "color": "#00fa9a"
                }
              }
            }, {
              "name": "医疗队女队员集体理平头和光头",
              "value": 2518,
              "symbolSize": 50,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                    "shadowColor": "#ffd700",
                   "color": "#ffd700"
                }
              }
            }, {
              "name": "缅怀疫情中逝去的人们",
              "value": 4730,
              "symbolSize": 88,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
            "shadowColor": "#6b8e23",
                  "color": "#6b8e23"
                }
              }
            }, {
              "name": "妨害疫情防控的违法行为",
              "value": 1952,
              "symbolSize": 55,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#ff00ff",
                  "color": "#ff00ff"
                }
              }
            }, {
              "name": "66岁重症患者8天快速康复",
              "value": 926,
              "symbolSize": 70,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#3cb371",
                  "color": "#3cb371"
                }
              }
            }, {
              "name": "别让快递小哥一直等在寒风中",
              "value": 4536,
              "symbolSize": 67,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#b8860b",
                  "color": "#b8860b"
                }
              }
            }, {
              "name": "湖北以外地区新增病例数连降5天",
              "value": 750,
              "symbolSize": 47,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#ff7f50",
                  "color": "#ff7f50"
                }
              }
            }, {
              "name": "女儿写给战疫一线爸爸的信",
              "value": 493,
              "symbolSize": 82,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#30e0e0",
                  "color": "#30e0e0"
                }
              }
            }, {
              "name": "青海连续3天无新增病例",
              "value": 385,
              "symbolSize": 59,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#0780cf",
                  "color": "#0780cf"
                }
              }
            }, {
              "name": "辽宁再派1000名医护人员驰援武汉",
              "value": 4960,
              "symbolSize": 90,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#765005",
                  "color": "#765005"
                }
              }
            }, {
              "name": "抗击新型肺炎第一线",
              "value": 8694000,
              "symbolSize": 134,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#e75840",
                  "color": "#e75840",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                }
              }
            }, {
              "name": "12项疫情防控惠民政策",
              "value": 5668,
              "symbolSize": 75,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#26ccd8",
                  "color": "#26ccd8",
                }
              }
            }, {
              "name": "战疫一线的别样团圆",
              "value": 339,
              "symbolSize": 68,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor":"#3685fe",
                  "color": "#3685fe",
                }
              }
            }, {
              "name": "31省区市心理援助热线",
              "value": 671,
              "symbolSize": 62,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#9977ef",
                  "color": "#9977ef",
                }
              }
            }, {
              "name": "元宵节亮灯为武汉加油",
              "value": 27000,
              "symbolSize": 114,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor":"#f5616f",
                  "color": "#f5616f",
                }
              }
            }, {
              "name": "抗击新型肺炎我们在行动",
              "value": 10777000,
              "symbolSize": 130,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#87cefa",
                  "color": "#87cefa",
                }
              }
            }, {
              "name": "疫情中的逆行者",
              "value": 92000,
              "symbolSize": 123,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#f9e264",
                  "color": "#f9e264",
                }
              }
            }, {
              "name": "一张图看懂新冠肺炎",
              "value": 20000,
              "symbolSize": 141,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 100,
                  "shadowColor": "#50c48f",
                  "color": "#50c48f",
                }
              },

            }]
          }]
        }
      }
    }
  },
  mounted() {
    this.initEcharts(this.data.series,);
  },
  methods: {
    initEcharts(series) {
      this.mychart = this.$echarts.init(document.getElementById(this.ids));
      // let echarts = this.$echarts;
      let option = {
        // 图表标题
        title: {
          show:true,//显示策略，默认值true,可选为：true（显示） | false（隐藏）
          text: '',//主标题文本，'\n'指定换行
          x: 'center',        // 水平安放位置，默认为左对齐，可选为：
          // 'center' ¦ 'left' ¦ 'right'
          // ¦ {number}（x坐标，单位px）
          y: 'bottom',             // 垂直安放位置，默认为全图顶端，可选为：
          // 'top' ¦ 'bottom' ¦ 'center'
          // ¦ {number}（y坐标，单位px）
          //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc',    // 标题边框颜色
          borderWidth: 0,         // 标题边框线宽，单位px，默认为0（无边框）
          padding: 5,             // 标题内边距，单位px，默认各方向内边距为5，
                                  // 接受数组分别设定上右下左边距，同css
          itemGap: 10,            // 主副标题纵向间隔，单位px，默认为10，
          textStyle: {
            fontSize: 18,
            fontWeight: 'bolder',
            color: '#eee'        // 主标题文字颜色
          },
          subtextStyle: {
            color: '#aaa'        // 副标题文字颜色
          }
        },
        // backgroundColor: '#000',
        tooltip: {},
        animationDurationUpdate: function(idx) {
          // 越往后的数据延迟越大
          return idx * 100;
        },
        animationEasingUpdate: 'bounceIn',
        color: ['#fff', '#fff', '#fff'],
        series:series
      };
      this.mychart.setOption(option)
      }

  }
};
</script>
<style scoped>
  .barHeight {
    width: 100%;
    min-height:393px ;
    position: relative;
  }
  .full {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 9;
  }
  .full-bg {
    position: absolute;
    z-index: 0;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
  }
</style>
