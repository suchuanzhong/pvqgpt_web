<template>
  <div class="barHeight">
    <div :id="ids" class="full" ></div>
    <div :id="ids+'bg'" class="full full-bg"></div>
  </div>
</template>
<script>
  export default {
    props: {
      ids: {
        default: "echarsREF"
      },
      rotate: {
        default: false
      },

      index: {
        default: 0
      },
      dataArr: {
        default: function() {
          return [
            {
              name: "单晶硅",
              type: "bar",
              yAxisIndex: 0,
              data: [5, 10, 0.301, 30, 0.39]
            },
            {
              name: "多晶硅",
              type: "bar",
              data: [5, 0.332, 0.301, 0.334]
            }

          ];
        }
      },
      theme: {
        default: function() {
          return [
            "#51a4ff",
            "#0066ff",
            "#17e0be",
            "#9ee596",
            "#f2ff06",
            "#f0aef9",
            "#17595a",
            "#004d21",
            "#9c8300",
            "#62915a",
            "#9fa603",
            "#7c5a81"
          ];
        }
      },
      max: {
        default: ""
      },
      title: {
        default: ""
      },
      barWidth: {
        default:26
      },
      subText:{
        default:""
      },
      unit: {
        default: function() {
          return ["%"];
        }
      },
      axisData: {
        default: function() {
          return ["一类资源","二类资源"];
        }
      },

      showLegend:{
        default:true
      }
    },
    data() {
      return {
        mychart: null,
        componentMonitoring:{}
      };
    },
    created() {
      let barDatas=localStorage.getItem('componentMonitoring');

      this.componentMonitoring=JSON.parse(barDatas);
    },
    mounted() {
      this.$nextTick(()=>{
        this.resizeWorldMapContainer()
        this.drawChart();
      })

    },

    methods: {
      drawChart() {
        this.mychart = this.$echarts.init(document.getElementById(this.ids));
        var yAxis = [
          {
            type: "value",
            name: this.unit[0],
            splitNumber: 3,
            nameTextStyle: {
              color: "#82c2eb",
              fontSize: 16
            },
            axisLabel: {
              color: "#82c2eb",
              fontSize: 16,
            },
            // max: this.max ? this.max : null,
            axisTick: {
              show: false
            },

            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(0, 131, 199, 0.4)"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(0, 131, 199, 0.2)"
              }
            }
          }
        ];

        var yAxisLength = 0;
        var series = [], legend = [];
        for (var i = 0; i < this.dataArr.length; i++) {
          legend.push(this.dataArr[i].name);
          if (this.dataArr[i].yAxisIndex > 0 && yAxis.length == 1) {
            yAxis.push({
              name: this.unit[1],
              type: "value",
              splitNumber: 3,
              nameTextStyle: {
                color: "#82c2eb",
                fontSize: 14
              },
              axisLabel: {
                color: "#82c2eb",
                fontSize: 14
              },

              // axisLine: {
              //   color: "#82c2eb",
              //   fontSize: 14
              // },
              // splitLine:{
              //   show: false,
              // } ,
              // max: this.max ? this.max : null,
              axisLine: false,
              splitLine: false
            });
          }
          series.push({
            type: this.dataArr[i].type,
            name: this.dataArr[i].name,
            data: this.dataArr[i].data,
            barMaxWidth:this.barWidth,
            stack: '总量',
            yAxisIndex:0,// this.dataArr[i].yAxisIndex || 0,
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },
            axisPointer: {
              lineStyle: {
                color: "#fff"
              }
            },
            itemStyle: {
              normal: {
                color: this.theme[i],
                label: {
                  show: true,
                  textStyle: {
                    color: "#fff "
                  },
                  position: "insideTop",
                  formatter: function(p) {
                    return p.value > 0 ? (p.value) : '';
                  }
                }
              }
            },


          });
        }
        let option = {
          title: {
            text: this.title,
            top: 0,
            left: 0,
            textStyle: {
              color: "#fff",
              fontFamily: "PingFang SC",
              fontWeight: "normal",
              fontSize: 16
            }
          },
          grid: {
            top: 38,
            left: 10,
            right: 10,
            bottom: 0,
            containLabel: true
          },
          dataZoom: {
            show: true,
            type: "inside"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          legend: {
            data: legend,
            icon: "circle",
            right: "8%",
            top: "0%",
            textStyle: {
              color: "#82c2eb"
            },
            itemWidth: 16,
            itemHeight:10,
            itemGap: 10
          },
          xAxis: [
            {
              type: "category",
              data: this.axisData,
              axisLabel: {
                color: "#82c2eb",
                fontSize:14,
                // rotate:this.rotate&&this.axisData.length>5?60:0
                // interval:1
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(0, 131, 199, 0.2)"
                }
              },
              avoidLabelOverlap: true,
              axisTick: false
            }
          ],

          yAxis: yAxis,
          series: series
        };

        this.mychart.setOption(option);
        this.initBg(option);
        let _this = this;
        window.addEventListener("resize", function(){
          _this.resizeWorldMapContainer()
          mychart.resize();
        });
      },
      resizeWorldMapContainer(){
        document.getElementById(this.ids).style.height = window.innerHeight-160+'px';
        document.getElementById(this.ids+ "bg").style.height = window.innerHeight-160+'px';
      },
      getMaxArr(arr) {
        let max = Math.max(...arr);
        let maxArr = arr.map(num => {
          return max;
        });
        return maxArr;
      },
      getMaxSeriseData(data,index=1) {
        let newArr = data.map(item => {
          if (item.type == "bar"&&item.yAxisIndex!=index) {
            let dataArr = this.getMaxArr(item.data);
            return dataArr.length > 0 ? dataArr[0] : 0;
          } else {
            return false;
          }
        });
        let maxArr = [];
        newArr.forEach(item => {
          if (item !== false) {
            maxArr.push(item);
          }
        });
        return this.getMaxArr(maxArr);
      },
      initBg(option) {
        let echarts = this.$echarts;
        let newyAxis = option.yAxis.map(item => {
          return {
            type: "value",
            name: item.name,
            splitNumber: 3,
            nameTextStyle: {
              color: "rgba(255,255,255,0)"
            },
            offset: 0,
            axisLabel: {
              // formatter: '{value} %',
              color: "rgba(255,255,255,0)",
              fontSize: 16
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#023f66",
                type: "solid"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#023f66",
                width: 0
              }
            }
          };
        });
        let optionBg = {
          title: {
            show: false
          },

          // title: EchartOption.title(this.title),
          legend: {
            show: false
          },
          grid: {
            top: 28,
            left: 10,
            right: 10,
            bottom: 0,
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: this.axisData,
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#023f66",
                  width: 1,
                  type: "solid"
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false,

                textStyle: {
                  color: "#82c2eb"
                }
              }
            }
          ],
          yAxis: newyAxis
        };

        let yAxisIndex=0;
        this.dataArr.forEach(item=>{
          if(item.yAxisIndex==1){
            yAxisIndex=1;
          }
        })
        let maxData = this.getMaxSeriseData(option.series,1);
        let maxDatas = this.axisData.map(value => {
          return maxData[0];
        });
        let mychartBg = echarts.init(document.getElementById(this.ids + "bg"));
        optionBg.series = [
          {
            name: "",
            type: "bar",
            color: "#fff",
            stack: '总量',
            tooltip: {
              show: false
            },
            barWidth: this.barWidth * option.series.length + 26,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(18, 117, 179,0)"
                  },
                  {
                    offset: 0.5,
                    color: "rgba(18, 117, 179,.5)"
                  },
                  {
                    offset: 1,
                    color: "rgba(18, 117, 179,0)"
                  }
                ])
                // barBorderRadius: 10,
              }
            },
            data: maxDatas
          }
        ];
        if(yAxisIndex==1){
          let maxDataIndex = this.getMaxSeriseData(option.series,0);
          let maxDatasIndex = this.axisData.map(value => {
            return maxDataIndex[0];
          });
          optionBg.series.push({
            name: "",
            type: "bar",
            color: "#fff",
            stack: '总量',

            tooltip: {
              show: false
            },
            barWidth:this.barWidth * option.series.length + 26,
            yAxisIndex:1,
            barGap:"-105%",
            itemStyle: {
              normal: {
                color: 'rgba(18, 117, 179,0)'
                // barBorderRadius: 10,
              }
            },
            data: maxDatasIndex
          })
        }
        mychartBg.setOption(optionBg);
        window.addEventListener("resize", function(){

          mychartBg.resize();
        });
      }
    }
  };
</script>
<style scoped lang="scss">
  .barHeight {
    height:100%;
    width: 100%;
    position: relative;
  }
  .full {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 10;
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

