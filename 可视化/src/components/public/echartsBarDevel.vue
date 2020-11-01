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
                default: "LightSensorelopment"
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
                            data: [0.5, 0.332, 0.301, 0.334, 0.39]
                        },
                        {
                            name: "利用小时数",
                            type: "bar",
                            yAxisIndex: 0,
                            data: [0.5, 0.332, 0.301, 0.334, 0.39, 0.332, 0.301, 0.334, 0.39]
                        }
                    ];
                }
            },
            theme: {
                default: function() {
                    return [
                        "#51a4ff",
                        "#0066ff",
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
                default: 12
            },
            unit: {
                default: function() {
                    return ["万kW.h", "h"];
                }
            },
            axisData: {
                default: function() {
                    return ["2014", "2015", "2016", "2017", "2018", "2015", "2016", "2017", "2018"];
                }
            },

            showLegend:{
                default:true
            }
        },
        data() {
            return {
                mychart: null ,
                EnergyEfficiency:{}
            };
        },
        created() {

            let barDatas=localStorage.getItem('EnergyEfficiency');
            this.EnergyEfficiency=JSON.parse(barDatas);
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
                        // align: "right",
                        splitNumber: 3,
                        nameTextStyle: {
                            color: "#82c2eb",
                            fontSize: 16
                        },
                        scale: false,
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
                var series = [],
                    legend = [];
                let barDatas=localStorage.getItem('EnergyEfficiency');
                this.EnergyEfficiency=JSON.parse(barDatas);
                for (var i = 0; i <  this.EnergyEfficiency.dataArr.length; i++) {
                    legend.push( this.EnergyEfficiency.dataArr[i].name);
                    if ( this.EnergyEfficiency.dataArr[i].yAxisIndex > 0 && yAxis.length == 1) {
                        yAxis.push({
                            name: this.unit[1],
                            // align: "left",
                            type: "value",
                            splitNumber: 3,
                            nameTextStyle: {
                                color: "#82c2eb",
                                fontSize: 16
                            },
                            scale: false,
                            axisLabel: {
                                color: "#82c2eb",
                                fontSize: 16
                            },
                            // max: this.max ? this.max : null,
                            axisLine: false,
                            splitLine: false
                        });
                    }
                    series.push({
                        type:  this.EnergyEfficiency.dataArr[i].type,
                        name:  this.EnergyEfficiency.dataArr[i].name,
                        data:  this.EnergyEfficiency.dataArr[i].data,
                        barMaxWidth: this.barWidth,
                        yAxisIndex: this.EnergyEfficiency.dataArr[i].yAxisIndex || 0,
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
                                fontSize: "14px"
                            },
                            emphasis: {
                                color: "#01cfee"
                            }
                        }
                    });
                }
                let option = {
                    title: {
                        text: "基地转换效率技术标准",
                        // show:this.title==''?false:true,
                        top: 0,
                        right: '28%',
                        textStyle: {
                            color: "#ffff",
                            fontFamily: "PingFang SC",
                            fontWeight: "normal",
                            fontSize: 16
                        }
                    },
                    grid: {
                        top: 38,
                        left: 10,
                        right: 10,
                        bottom: 6,
                        containLabel: true
                    },
                    // dataZoom: {
                    //   show: true,
                    //   type: "inside",
                    //
                    // },
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
                        itemWidth: 18,
                        itemHeight: 10,
                        itemGap: 20
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: this.EnergyEfficiency.axisData,
                            axisLabel: {
                                color: "#82c2eb",
                                fontSize:14,
                                // fontSize: this.rotate && this.axisData.length > 5 ? 12 : 14
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
                this.mychart.setOption(option,true);
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
                            fontSize: 14
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
                            data: this.EnergyEfficiency.axisData,
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
                this.EnergyEfficiency.dataArr.forEach(item=>{
                    if(item.yAxisIndex==1){
                        yAxisIndex=1;
                    }
                })
                let maxData = this.getMaxSeriseData(option.series,1);
                let maxDatas = this.EnergyEfficiency.axisData.map(value => {
                    return maxData[0]
                });
                let mychartBg = echarts.init(document.getElementById(this.ids + "bg"));
                optionBg.series = [
                    {
                        name: "",
                        type: "bar",
                        color: "#00BFFF",
                        //stack: '总量',
                        barGap: '100%',
                        tooltip: {
                            show: false
                        },
                        barWidth: this.barWidth * option.series.length +20,
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
                    let maxDatasIndex = this.EnergyEfficiency.axisData.map(value => {
                        return maxDataIndex[0];
                    });
                    optionBg.series.push({
                        name: "",
                        type: "bar",
                        color: "#00BFFF",
                        tooltip: {
                            show: false
                        },
                        barWidth:this.barWidth * option.series.length + 20,
                        yAxisIndex:1,
                        barGap:"-125%",
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
<style lang="scss">
    .barHeight {
        width: 100%;
        position: relative;
    }
    .full {
        width: 100%;
        position: relative;
        z-index: 11;
    }
    .full-bg {
        position: absolute;
        z-index: 0;
        top: 0;
        width: 100%;
        height: 100%;
        left: 0;
        /*padding: 0 10px ;*/
        /*margin-left: 20px;*/
    }
</style>

