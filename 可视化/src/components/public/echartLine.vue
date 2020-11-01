<template>
  <div :id="ids" class="barHeight"></div>
</template>
<script>
// import EchartOption from "@/utils/initEcharts";
export default {
  props: {
    ids: {
      default: "LightSensors"
    },
    legend: {
      default: function() {
        return ["发电量", "利用小时数"];
      }
    },
    barOneData: {
      default: function() {
        return [10, 20, 30];
      }
    },
    Cumulative: {
      default: function() {
        return [10, 20, 30];
      }
    },
    year: {
      default: function() {
        return ["类目1", "类目2"];
      }
    },
    theme: {
      default: function() {
        return ["#2bdee5", "#00e862"];
      }
    },
    theme2: {
      default: function() {
        return ["#005a77", "#027a76"];
      }
    },
    max: {
      default: ""
    },
    title: {
      default: ""
    },
    barWidth: {
      default: 15
    }
  },
  	subText:{
			default:""
			},
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.targeEcharts();
    })
  },

  methods: {
    getMaxArr(arr){
      let max=Math.max(...arr);
      let maxArr=arr.map(num=>{
        return max
      })
      return maxArr;
    },
    targeEcharts(series) {
      let echarts = this.$echarts;
      this.mychart = echarts.init(document.getElementById(this.ids));
      let maxArr0=this.getMaxArr(this.barOneData),
        maxArr1=this.getMaxArr(this.Cumulative);
      
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          
        },
        title: {
          // text: 'Sales Revenue of CAN-LAX 2016-2017',
          text: this.title,
					left:18,
					top: 0,
					textStyle: {
					color: '#82c2eb',
					fontFamily:"PingFang SC",
					fontSize:12
					},
            subtext:this.subText,
					subtextStyle: {
							width:'100%',
							align:"center",
							color: '#82c2eb',
							fontFamily:"PingFang-SC",
							fontSize:12
						},
        },
      
        // title: EchartOption.title(this.title),
        legend: {
          data:['新增','累计'],
           icon:"circle",
          top: "0",
          textStyle: {
            color: "#82c2eb"
          },
          itemWidth: 6,
          itemHeight: 6
        },
        grid: {
          top: "16%",
          left: "6%",
          right: "10%",
          bottom: "16%",
          containLabel: true,
          show: false // 网格边框是否显示，上和右边框
        },
        xAxis: {
          type: "category",
          boundaryGap: true, // 坐标轴两边留白
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#82c2eb"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#023f66",
              opacity: 0.8,
              width: 1
            }
          },
          axisTick: {
            show: false
          },
          data: this.year
        },
        yAxis: [
          // 双y坐标轴
          { 
            name:'装机量(MV)',
            type: "value",
            axisLabel: {
             textStyle: {
										color: '#82c2eb',
										fontFamily: 'PingFang-SC',
										fontSize: 14,
									}
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#82c2eb"
                // fontSize:33
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "solid",
                width: 1,
                color: "#023f66",
                opacity: 0.8
              }
            },
            axisTick: {
              show: false
            }
          },
        //   {
        //     // name: '产值(单位)',
        //     //nameLocation: 'start',
        //     axisLabel: {
        //       formatter: "{value}",
        //       color: "#82c2eb",
        //       fontSize: 14
        //     },
        //     axisLine: {
        //       show: false,
        //       lineStyle: {
        //         color: "#82c2eb"
        //         // fontSize:33
        //       }
        //     },
        //     splitLine: {
        //       show: false
        //     },
        //     axisTick: {
        //       show: false
        //     },
        //     min: 0,
        //     max: 16, // growing rate upper limit
        //     type: "value",
        //     //top:10,
        //     inverse: false
        //   }
        ],

        series: [
          {
            name: "新增",
            type: "bar",
            color: "#00BFFF",
            //stack: '总量',
            barWidth: "8%",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#17e0be"
                  },
                  {
                    offset: 1,
                    color: "#17e0be"
                  }
                ])
                // barBorderRadius: 10,
              }
            },
            data: this.barOneData
          },
          {
            name: "累计",
            type: "bar",
            color: "#DC143C",
            //stack: '总量',
            barWidth: "8%",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#51a4ff"
                  },
                  {
                    offset: 1,
                    color: "#51a4ff"
                  }
                ])
                // barBorderRadius: 10,
              }
            },
            data: this.Cumulative
          },
          {
            name: "",
            type: "bar",
            color: "#00BFFF",
            //stack: '总量',
            tooltip:{
              show:false
            },
            barGap:'-215%',
            barWidth: "34%",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(18, 117, 179,0)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(18, 117, 179,.5)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(18, 117, 179,0)'
                  }
                ])
                // barBorderRadius: 10,
              }
            },
            data: maxArr0[0]>maxArr1[0]?maxArr0:maxArr1
          }
        ]
      };
      this.mychart.setOption(option);
    }
  }
};
</script>
<style scoped>
.barHeight {
  height: 180px;
  width: 100%;
}
</style>

