<template>
  <div ref="ids" style="height: 100%;width:100%;">

  </div>
</template>
<script>
  export default {
    components: {
    },
    props:{
      ids:{
        default:'LightSensor'
      },
      dataArr:{
        default:function(){
          return [
            { name: "光伏", value: 12},
            { name: "泸州养老可视化项目", value: 8},
            { name: "宿州5G", value: 6},
            { name: "可再生", value: 12},
            { name: "合肥园区", value: 4}
          ]
        }
      },
      yname:{
        default:''
      },
      max:{
        default:''
      },
      unit:{
        default:'人'
      }
    },
    data() {
      return {
        mychart: null
      };
    },
    watch:{
      dataArr(newVal,oldVal){
        this.dataArr = newVal;
        this.drawChart();

      }
    },
    mounted() {
      this.mychart = this.$echarts.init(this.$refs.ids);
      this.drawChart();
    },
    computed: {
      axisData() {
        return this.dataArr.map(item => {
          return item.name;
        });
      },
      TData() {
        return this.dataArr.map(item => {
          return item.value;
        });
      }
    },
    methods: {
      drawChart() {
        let max= Math.max(...this.TData);

        let dataShadow = [];
        for (var i = 0; i < this.dataArr.length; i++) {
          dataShadow.push(max+10);
        }
        let echarts=this.$echarts;
        let option = {
          // title: EchartOption.title("光照统计"),
          grid: {
            left:20,
            right: 20,
            top: 80,
            bottom: 20,
            containLabel:true
          },
          graphic: {
            type: "text",
            left: 44,
            top: 10,
            style: {
              text: this.unit,
              fill: "#949494",
              fontSize: 12,
              fontFamily: "PingFang-SC-Medium"
            }
          },
          dataZoom: [{
            show: false,
          },
            {
              type: 'inside',
            }

          ],
          xAxis: [{
            type: 'category',
            color: '#59588D',
            data: ['学员续费率', '试听课转换率', '课程消费率', '课后评分率', '作业完成率', '班级满班率', '排课上课率', '体验课转化率'],
            axisPointer: {
              type: 'line'
            },
            axisLine: {
              lineStyle: {
                color: '#272456'
              }
            },
            axisLabel: {
              margin: 20,
              color: '#59588D',
              textStyle: {
                fontSize: 12
              },
            },
          }],
          yAxis: [{
            min: 0,
            max: 100,
            axisLabel: {
              formatter: '{value}%',
              color: '#59588D',
            },
            axisLine: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#272456'
              }
            }
          }],
          series: [{
            type: 'bar',
            data: [100, 90, 10, 90, 90, 20, 56, 89],
            barWidth: '8',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#41E1D4' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#10A7DB' // 100% 处的颜色
                }], false),
                barBorderRadius: [30, 30, 0, 0],
                shadowColor: 'rgba(0,255,225,1)',
                shadowBlur: 4,
              }
            },
            label: {
              normal: {
                show: true,
                lineHeight: 30,
                width: 80,
                height: 30,
                backgroundColor: 'rgba(37,36,83,0.9)',

                borderRadius: 200,
                position: ['-16', '-60'],
                distance: 1,
                formatter: [
                  '    {d|●}',
                  ' {a|{c}%}     \n',
                  '    {b|}'
                ].join(','),
                rich: {
                  d: {
                    color: '#3CDDCF',
                  },
                  a: {
                    color: '#fff',
                    align: 'center',
                  },
                  b: {
                    width: 1,
                    height: 30,
                    borderWidth: 1,
                    borderColor: '#234e6c',
                    align: 'left'
                  },
                }
              }
            }
          }]
        };
        this.mychart.setOption(option);
      }
    }
  };
</script>
<style lang="scss" scoped>
  #LightSensor {
    height: 200px;
  }
</style>

