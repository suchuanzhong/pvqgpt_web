<template>
    <div class="barHeight">
        <div :id="ids" class="full"></div>
        <div :id="ids+'bg'" class="full full-bg"></div>
    </div>
</template>
<script>
    export default {
        props: {
            ids: {
                default: "LightSensor"
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
                            name: "发电量",
                            type: "bar",
                            yAxisIndex: 0,
                            data: [5, 10, 0.301, 30, 0.39]
                        },
                        {
                            name: "利用小时数",
                            type: "bar",
                            yAxisIndex: 1,
                            data: [5, 0.332, 0.301, 0.334]
                        },
                        {
                            name: "辐射量",
                            type: "line",

                            data:[40000,30000,16000,15000,12000,9000,8300,7500,6500,5500]
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
                default: 6
            },
            unit: {
                default: function() {
                    return ["万kWh", "kWh/㎡"];
                }
            },
            axisData: {
                default: function() {
                    return ["2015","2016", "2017", "2018"];
                }
            },

            showLegend:{
                default:true
            }
        },
        data() {
            return {
                mychart: null
            };
        },
        mounted() {
            this.drawChart();
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
                            fontSize: 14
                        },
                        scale: false,
                        axisLabel: {
                            color: "#82c2eb",
                            fontSize: 14,
                            fontStyle:"italic"
                        },
                        max: this.max ? this.max : null,
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
                var series = [],
                    legend = [];

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
                            scale: false,
                            axisLabel: {
                                color: "#82c2eb",
                                fontSize: 14
                            },
                            max: this.max ? this.max : null,
                            axisLine: false,
                            splitLine: false
                        });
                    }
                    series.push({
                        type: this.dataArr[i].type,
                        name: this.dataArr[i].name,
                        data: this.dataArr[i].data,
                        barMaxWidth: this.barWidth,
                        yAxisIndex: this.dataArr[i].yAxisIndex || 0,
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "shadow"
                            }
                        },
                        axisPointer: {
                            lineStyle: {
                                color: "rgba(0,192,255,0.57)"
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: this.theme[i]
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                position: "top",
                                color: this.theme[1],
                                fontFamily: "DINOT",
                                fontSize: "18px"
                            },
                            emphasis: {
                                color: "#01cfee"
                            }
                        }
                    });
                }
                let option = {
                    title: {
                        text: this.title,
                        top: 0,
                        left: 0,
                        textStyle: {
                            color: "#01cfee",
                            fontFamily: "PingFang SC",
                            fontWeight: "normal",
                            fontSize: 16
                        }
                    },
                    grid: {
                        top: 38,
                        left: 20,
                        right: 15,
                        bottom: 10,
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
                        show: this.showLegend,
                        data: legend,
                        // icon: "rect",
                        align: "left",
                        left: "center",
                        right: "6%",
                        top: "4%",
                        textStyle: {
                            color: "#82c2eb"
                        },
                        itemWidth: 20,
                        itemHeight:8,
                        itemGap: 10
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: this.axisData,
                            axisLabel: {
                                color: "#82c2eb",
                                // fontSize:14,
                                fontSize: this.rotate && this.axisData.length > 5 ? 12 : 14
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
                // if (this.rotate) {
                //   // option.xAxis[0].axisLabel.interval = 0;
                // }
                this.mychart.setOption(option);
                this.initBg(option);
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
                        left: 20,
                        right: 20,
                        bottom: 10,
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
                        color: "#00BFFF",
                        //stack: '总量',
                        tooltip: {
                            show: false
                        },
                        barWidth: this.barWidth * option.series.length + 12,
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
                        color: "#00BFFF",
                        //stack: '总量',
                        tooltip: {
                            show: false
                        },
                        barWidth:this.barWidth * option.series.length + 12,
                        yAxisIndex:1,
                        barGap:"-100%",
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
            }
        }
    };
</script>
<style scoped>
    .barHeight {
        height: 180px;
        width: 100%;
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

