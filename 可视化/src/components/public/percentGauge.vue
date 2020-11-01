<template>
  <div :id="ids" class="myEcharts"></div>
</template>

<script>
    export default {
        name: "percentGauge",
      data(){
        const index=this.idIndex();
        return {
          ids:'percentPie'+index
        }
      },
      props:{
        value:{
          default:75
        },
        title:{
          default:''
        }

      },
      mounted(){
        this.initEcharts();
      },
      methods:{
          initEcharts(){
            var highlight = '#00e7ff';

            var demoData = [
              { name: this.title, value: this.value, unit: '%', range: [0, 100] }
            ];
            var echarts=this.$echarts;
            var ids=this.ids;
            var option = {
              backgroundColor: '#fff',
              title:{
                text:this.title,
                top:15,
                left:25,
                textStyle:{
                  color:'#30323a',
                  fontWeight:'normal'
                }
              },
              series: (()=> {
                var result = [{
                  startAngle:160,
                  name: '遮罩层',
                  type: 'pie',
                  clockWise: true,
                  hoverAnimation: false,
                  center: ['50%','85%'],
                  radius: 100,
                  itemStyle: {
                    normal: {
                      label: {
                        show: false
                      },
                      labelLine: {
                        show: false
                      },
                    }
                  },
                  animation:false,
                  data: [{
                    value: 140*(this.value/100),
                    name: 'percent',
                    itemStyle: {
                      normal: {
                        color: '#fff',
                        label: {
                          show: false
                        },
                        labelLine: {
                          show: false
                        }
                      },
                      emphasis: {

                        color: '#fff'
                      }
                    },
                  }]
                },{
                  startAngle:160,
                  name: 'default',
                  type: 'pie',
                  clockWise: true,
                  hoverAnimation: false,
                  center: ['50%','85%'],
                  radius: [150,100],
                  itemStyle: {
                    normal: {
                      label: {
                            rich: {
                              a: {
                                color: '#333333',
                                align: 'center',
                                fontSize: 40,
                                padding:[40,0,0,0],
                                fontFamily: "DINOT"
                              },
                              b: {
                                  color: '#aaaaaa',
                                align: 'center',
                                padding:[30,0,0],
                                fontSize: 16
                              },
                              c:{
                                align:'center'
                              }
                            },
                            formatter: (params)=>{
                              return "125{a|"+this.value+"}{b|%}";
                            },
                            position: 'center',
                            show: true,
                            textStyle: {
                              fontSize: '14',
                              fontWeight: 'normal',
                              color: '#fff'
                            }
                      },
                      labelLine: {
                        show: false
                      },
                      // shadowBlur: 15,
                      // shadowColor: 'white',
                    }
                  },
                  data: [{
                    value: 140*(this.value/100),
                    name: 'end',
                    itemStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [{
                          offset: 0,
                          color: highlight
                        },{
                          offset: 0.2,
                          color: highlight
                        },{
                          offset: 0.8,
                          color: '#0083ff'
                        }, {
                          offset: 1,
                          color: '#0083ff'
                        }]),

                        labelLine: {
                          show: false
                        }
                      },
                      emphasis: {
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [{
                          offset: 0,
                          color: highlight
                        },{
                          offset: 0.2,
                          color: highlight
                        },{
                          offset: 0.8,
                          color: '#0083ff'
                        }, {
                          offset: 1,
                          color: '#0083ff'
                        }])
                      }
                    }
                  },{
                    value: 140*((100-this.value)/100),
                    name: 'ss',
                    itemStyle: {
                      normal: {
                        color: 'rgba(0,0,0,0)',
                        label: {
                          show: false
                        },
                        labelLine: {
                          show: false
                        }
                      },
                      emphasis: {
                        color: 'rgba(0,0,0,0)'
                      }
                    }
                  }, {
                    value: 220,
                    name: '总数',
                    tooltip: {
                      show: false
                    },
                    itemStyle: {
                      normal: {
                        color: 'rgba(0,0,0,0)',
                        label: {
                          show: false
                        },
                        labelLine: {
                          show: false
                        }
                      },
                      emphasis: {
                        color: 'rgba(0,0,0,0)'
                      }
                    }
                  }

                  ]
                }];

                demoData.forEach(function(item) {
                  result.push(
                    // 外围刻度
                    {
                      type: 'gauge',
                      center: ['50%','85%'],
                      radius: '160',  // 1行3个
                      splitNumber: item.splitNum || 2,
                      min: item.range[0],
                      max: item.range[1],
                      startAngle: 160,
                      endAngle: 20,
                      axisLine: {
                        show: false,
                        lineStyle: {
                          width: 2,
                          shadowBlur: 0,
                          color: [
                            [1, 'rgba(0,0,0,0)']
                          ]
                        }
                      },
                      axisTick: {
                        show: false,
                        lineStyle: {
                          color: '#02e3f0',
                          width: 1
                        },
                        length: -5,
                        splitNumber: 10
                      },
                      splitLine: {
                        show: false,
                        length: -14,
                        lineStyle: {
                          color: 'rgba(0,0,0,0)',
                        }
                      },
                      axisLabel: {
                        distance: -10,
                        textStyle: {
                          color: '#8e9cb1',
                          fontSize: '18'
                        }
                      },
                      pointer: {
                        show: 0
                      },
                      detail: {
                        show: 0
                      }
                    },
                    // 内侧指针、数值显示
                    {
                      animationDuration:1000*item.value/360,
                      name: item.name,
                      type: 'gauge',
                      center: ['50%','85%'],
                      radius: 150,
                      startAngle: 160,
                      endAngle: 20,
                      min: item.range[0],
                      max: item.range[1],
                      axisLine: {
                        show: true,
                        lineStyle: {
                          width: 50,
                          color: [
                            [1, '#dbe2ec']
                          ]
                        }
                      },
                      axisTick: {
                        show: 0,
                      },
                      splitLine: {
                        show: 0,
                      },
                      axisLabel: {
                        show: 0
                      },
                      pointer: {
                        width:10,
                        show: true,
                        length: '110%'
                      },
                      detail: {
                        show: true,
                        offsetCenter: [0, '0%'],
                        textStyle: {
                          fontSize: 20,
                          color: '#000'
                        },
                        formatter: [
                          '{value} ' + (item.unit || ''),
                          '{name|' + item.name + '}'
                        ].join('\n'),
                        rich: {
                          name: {
                            fontSize: 14,
                            lineHeight: 30,
                            color: '#8e9cb1'
                          }
                        }
                      },
                      itemStyle: {
                        normal: {
                          color: highlight,
                        }
                      },
                      data: [{
                        value: item.value
                      }]
                    }
                  );
                });

                return result;
              })()
            };
            this.$nextTick(_=>{
              let myChart=echarts.init(document.getElementById(ids));
              myChart.setOption(option);
            })
          }
      }
    }
</script>

<style scoped>
  .myEcharts{
    width: 100%;
    height: 100%;
  }
</style>
