<template>
    <div class="barHeight">
        <div :id="ids" class="full"></div>
        <div :id="ids+'bg'" class="full full-bg"></div>
    </div>
</template>
<script>
    // import EchartOption from "@/utils/initEcharts";
    export default {
        props: {
            ids: {
                default: "LightSensors"
            },

            dataArr: {
                default: function() {
                    return ["2015", "2016", "2017"];
                }
            },
            allDataBar: {
                default: function() {
                    return [5, 48, 49];
                }
            },
            djBar: {
                default: function() {
                    return [5, 48, 49];
                }
            },
            lpdjBar: {
                default: function() {
                    return [14, 15, 25];
                }
            },
            lpjBar: {
                default: function() {
                    return [20, 21, 35];
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
            subText: {
                default: ""
            },
            max: {
                default: ""
            },
            title: {
                default: ""
            }
        },
        data() {
            return {};
        },
        mounted() {
            this.drawCharts();
        },

        methods: {
            drawCharts(series) {
                let echarts = this.$echarts;
                this.mychart = echarts.init(document.getElementById(this.ids));

                let option = {
                    title: {
                        textStyle: {
                            color: "#82c2eb",
                            fontSize: 24
                        },
                        subtext: this.subText,
                        subtextStyle: {
                            width: "100%",
                            align: "center",
                            color: "#82c2eb",
                            fontFamily: "PingFang-SC",
                            fontSize: 14
                        }
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow"
                        }
                    },
                    // title: EchartOption.title(this.title),
                    legend: {
                        data: [ '1000','1900','1200','1600'],
                        right: '6%',

                        top: 10,
                        textStyle: {
                            color: "#82c2eb",
                            fontSize: 14
                        },
                        itemWidth:20,
                        itemHeight:5,
                        itemGap: 10
                    },
                    grid: {
                        left: "5%",
                        right: "6%",
                        bottom: "4%",
                        top: "24%",
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: this.dataArr,
                            axisLine: {
                                lineStyle: {
                                    color: "#023f66",
                                    width: 1,
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                color:'#82c2eb',
                                fontSize:14
                            },
                            splitLine: {
                                show: false
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            name: "%",
                            nameTextStyle: {
                                color: "#71acd3"
                            },
                            splitNumber: 3,
                            offset: 0,
                            axisLabel: {

                                // formatter: '{value} %',
                                color: "#82c2eb"
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: "#023f66",
                                    width: 1,
                                    type: "solid"
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: "#023f66",
                                    width: 1
                                }
                            }
                        }
                    ],

                    series: [
                        {
                            name: "1900",
                            icon: "rect",
                            symbol: "circle", //标记的图形为实心圆
                            symbolSize: 6, //标记的大小
                            type: "line",
                            data: this.lpdjBar,
                            barWidth: 8,
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "#ff2066"
                                        },
                                        {
                                            offset: 1,
                                            color: "#ff2066"
                                        }
                                    ]),
                                    barBorderRadius: 0,
                                    borderWidth: 0
                                }
                            }
                        },
                        {
                            name: "1200",
                            icon: "rect",
                            type: "line",
                            symbol: "circle", //标记的图形为实心圆
                            data: this.djBar,
                            barWidth:8,
                            smooth: true,
                            symbolSize: 6,
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "#51a4ff"
                                        },
                                        {
                                            offset: 1,
                                            color: "#51a4ff"
                                        }
                                    ]),
                                    barBorderRadius: 0,
                                    borderWidth: 0
                                }
                            }
                        },
                        {
                            name: "1600",
                            icon: "rect",
                            type: "line",
                            data: this.lpjBar,
                            smooth: true,
                            barWidth: 8,
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "#17e0be"
                                        },
                                        {
                                            offset: 1,
                                            color: "#17e0be"
                                        }
                                    ]),
                                    barBorderRadius: 0,
                                    borderWidth: 0
                                }
                            }
                        },
                        {
                            name: "1000",
                            type: "bar",
                            symbol: "circle", //标记的图形为实心圆
                            symbolSize: 6, //标记的大小
                            data: this.allDataBar,
                            barWidth: 8,
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "#0066ff"
                                        },
                                        {
                                            offset: 1,
                                            color: "#0066ff"
                                        }
                                    ]),
                                    barBorderRadius: 0,
                                    borderWidth: 0
                                }
                            }
                        },

                    ]
                };

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
            getMaxSeriseData(data) {
                let newArr = data.map(item => {
                    if(item.type=="bar"){
                        let dataArr = this.getMaxArr(item.data);
                        return dataArr.length > 0 ? dataArr[0] : 0;
                    }else{
                        return false
                    }

                });
                let maxArr=[];
                newArr.forEach(item=>{
                    if(item!==false){
                        maxArr.push(item);
                    }
                })
                return this.getMaxArr(maxArr);
            },
            initBg(option) {
                let echarts = this.$echarts;

                let optionBg = {
                    title: {
                        show: false
                    },

                    // title: EchartOption.title(this.title),
                    legend: {
                        show: false
                    },
                    grid: {
                        left: "5%",
                        right: "10%",
                        bottom: "4%",
                        top: "15%",
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: this.dataArr,
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
                    yAxis: [
                        {
                            type: "value",
                            name: "",
                            nameTextStyle: {
                                color: "#71acd3"
                            },
                            splitNumber: 3,
                            offset: 0,
                            axisLabel: {
                                // formatter: '{value} %',
                                color: "rgba(0,0,0,0)"
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
                                    width: 1
                                }
                            }
                        }
                    ]
                };
                let  maxData= this.getMaxSeriseData(option.series);
                let maxDatas=this.dataArr.map(value=>{
                    return maxData[0]
                })
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
                        barWidth: 8 * maxDatas.length + 12,
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
                mychartBg.setOption(optionBg);
            }
        }
    };
</script>
<style scoped>
    .barHeight {
        height: 300px;
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

