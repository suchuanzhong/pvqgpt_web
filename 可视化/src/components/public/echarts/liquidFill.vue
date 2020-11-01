<template>
  <div :id="ids" style="width:100%;height: 100%;"></div>
</template>
<script>
    import 'echarts-liquidfill/src/liquidFill.js';
    // import { setTimeout } from 'timers';
    export default {
        name: "Home",
        props: {
            ids: {
                default: "liquidFill"
            },
            // title: {
            //     default: "水球图"
            // },
            data: {
                default: function() {
                    return [
                      0.3,0.3
                    ];
                }
            },
          seriesData: {
            default:'标题'
          },
        },
        data() {
            return {
                counter: 1
            };
        },
        mounted() {
            //在这个生命周期中初始化
            let _this = this;
            this.$nextTick(() => {
                setTimeout(() => {
                    _this.liquidFill();
                },0)
            })
        },
        methods: {
            refreshs(){
                // document.getElementById(this.id).innerHTML='';
                // let _this = this;
                // this.$nextTick(() => {
                //   setTimeout(() => {
                //     this.liquidFill();
                //   },500)
                // })
            },
            liquidFill() {
                //方法
                var liquid = this.$echarts.init(document.getElementById(this.ids));
                var value = Number(this.data[0] * 100);
                // debugger;
                liquid.setOption({
                    title: {
                        //标题
                        text:this.seriesData,
                        textAlign: "center",
                        top: "88%",
                        left: "50%", //定位
                        textStyle: {
                            //标题的样式
                            color: "#ffffff", //字体颜色
                            fontSize: 14,
                            fontWeight: "normal",
                            // fontFamily: "Microsoft YaHei", //字体
                            // align: "center", //文字的水平方式
                            // verticalAlign: "middle", //文字的垂直方式
                          textAlign: "center"
                        },

                    },
                    series: [
                        {
                            type: "liquidFill",
                            data: this.data,
                            label: {
                                normal: {
                                    formatter: "{a|" + value.toFixed(2) + "}{b|%}",
                                    textStyle: {
                                        color: "#fff",
                                        insideColor: "#fff",
                                        fontSize: 14,
                                        fontWeight: "normal"
                                    },
                                    rich: {
                                        a: {
                                            fontSize: 16
                                        },
                                        b: {
                                            fontSize: 12,
                                            padding: [0, 5, 0, 5]
                                        }
                                    }
                                }
                            },
                            center: ["50%", "45%"],
                            radius: "68%",
                          itemStyle: {
                            color: 'rgba(35,170,247,0.2)'
                          },
                            backgroundStyle: {
                                color: "rgba(0,48,96,.8)", //图表的背景颜色
                                borderWidth: '1',//图表的边框宽度
                                borderColor: 'rgb(16,119,234)',//图表的边框颜色
                                itemStyle: {
                                    shadowBlur: 100, //设置无用
                                    shadowColor: "#f60", //设置无用
                                    opacity: 1 //设置无用
                                }
                            },
                            outline: {
                                //show: true , //是否显示轮廓 布尔值
                                borderDistance: 0, //外部轮廓与图表的距离 数字
                                itemStyle: {
                                    //borderColor:'rgba(255,0,0,0.09)', //边框的颜色
                                    borderWidth: 0, //边框的宽度
                                    shadowBlur: 15 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
                                    shadowColor: 'rgba(0,0,0,.5)' //外部轮廓的阴影颜色
                                }
                            }
                        },{

                      type: 'pie',
                startAngle: 270,
                center:['50%', '45%'],
                radius: ['82%', '85%'],
                legendHoverLink: false,
                hoverAnimation: false,
                avoidLabelOverlap: false,
                label: {
                normal: {
                  show: false,
                    position: 'center'
                },
                emphasis: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  value: this.data[0]*100,
                  itemStyle: {
                    normal: {
                      "color":  new this.$echarts.graphic.LinearGradient(1, 1, 0, 1, [{
                        offset: 0,
                        color: '#0078ff'
                      }, {
                        offset: 1,
                        color: '#00bffe'
                      }])
                    }
                  }
                },
                {
                  value: 100 - this.data[0]*100,
                  itemStyle: {
                    normal:  {
                      "color":  new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: '#003060'
                      },{
                        offset: 1,
                        color: '#003060'
                      }])
                    }
                  }
                }
              ]
            }
                    ]
                });
            }
        }
    };
</script>
