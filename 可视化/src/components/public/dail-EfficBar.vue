<template>
    <el-dialog
            title="当日辐射量"
            :visible.sync="dialogVisible"
            @close="Close"
            append-to-body
            fullscreen=true
            class="dialogBj"
            :show-close="showclose"
    >
        <div class="barHeight">
            <div :id="ids" class="full"></div>
            <div :id="ids+'bg'" class="full full-bg"></div>
        </div>
    </el-dialog>
</template>

<script>
    import tools from "../../utils/tools";
    export default {
        props: {
            title: {
                default: ""
            }, ids: {
                default: "LightSensor"
            },
            rotate: {
                default: false
            },

            index: {
                default: 0
            },
            DayEfficBar: {
                default: function() {
                    return [
                        {
                            name: "辐射量",
                            type: "circle",
                            yAxisIndex: 0,
                            data: [0.5, 0.332, 0.301, 0.334, 0.39]
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
                default:12
            },
            unit: {
                default: function() {
                    return ["kW.h/m²"];
                }
            },
            sunsData: {
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
                mychart: null,
                showclose:false,
                dialogVisible: true,
                dayEfficBar:{}
            };
        },
        created() {
           
            let barDatas=localStorage.getItem('dayEfficBar');
            this.dayEfficBar=JSON.parse(barDatas);
        },
        mounted() {
            this.$nextTick(()=>{
                this.resizeWorldMapContainer()
                this.drawChart();
            })

        },

        methods: {
            drawChart() {
                var myChart= this.$echarts.init(document.getElementById(this.ids));
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
                            // show: true,
                            color: "#82c2eb",
                            fontSize: 16,
                            // fontStyle:"italic"
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

                for (var i = 0; i < this.dayEfficBar.DayEfficBar.length; i++) {
                    legend.push(this.dayEfficBar.DayEfficBar[i].name);
                    if (this.dayEfficBar.DayEfficBar[i].yAxisIndex > 0 && yAxis.length == 1) {
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
                                fontSize: 16
                            },
                            max: this.max ? this.max : null,
                            axisLine: false,
                            splitLine: false
                        });
                    }
                    series.push({
                        type: this.dayEfficBar.DayEfficBar[i].type,
                        name: this.dayEfficBar.DayEfficBar[i].name,
                        data: this.dayEfficBar.DayEfficBar[i].data,
                        barMaxWidth: this.barWidth,
                        yAxisIndex: this.dayEfficBar.DayEfficBar[i].yAxisIndex || 0,
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
                                fontFamily: "PingFang SC",
                                fontSize: "16px"
                            },
                            emphasis: {
                                color: "#01cfee"
                            }
                        }
                    });
                }
                let option = {
                    title: {
                        text: "",
                        top: 12,
                        left: 0,
                        textStyle: {
                            color: "#01cfee",
                            fontFamily: "PingFang SC",
                            // fontWeight: "normal",
                            fontSize: 14
                        }
                    },
                    grid: {
                        top: 45,
                        left: 15,
                        right: 18,
                        bottom: 0,
                        containLabel: true
                    },
                    // dataZoom: {
                    //     show: true,
                    //     type: "inside"
                    // },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow"
                        }
                    },
                    legend: {
                        // show: this.dayEfficBar.showLegend,
                        data: legend,
                        icon: "circle",
                        // align: "left",
                        right:'8%',
                        // left: "center",
                        top: "0%",
                        textStyle: {
                            color: "#82c2eb"
                        },
                        itemWidth: 10,
                        itemHeight: 6,
                        itemGap: 20
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: this.dayEfficBar.sunsData,
                            axisLabel: {
                                interval:0,
                                formatter:function(value){
                                    var ret = "";//拼接加\n返回的类目项
                                    var maxLength = 3;//每项显示文字个数
                                    var valLength = value.length;//X轴类目项的文字个数
                                    var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                                    if (rowN > 1)//如果类目项的文字大于3,
                                    {
                                        for (var i = 0; i < rowN; i++) {
                                            var temp = "";//每次截取的字符串
                                            var start = i * maxLength;//开始截取的位置
                                            var end = start + maxLength;//结束截取的位置
                                            //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                                            temp = value.substring(start, end) + "\n";
                                            ret += temp; //凭借最终的字符串
                                        }
                                        return ret;
                                    }
                                    else {
                                        return value;
                                    }
                                },
                                color: "#82c2eb",
                                // fontSize:14,
                                fontSize: 14
                                // rotate:this.rotate&&this.sunsData.length>5?60:0
                                // interval:1
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "rgba(0, 131, 199, 0.2)" ,

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
                myChart.setOption(option);
                this.initBg(option);
                let _this = this;
                window.addEventListener("resize", function(){
                    _this.resizeWorldMapContainer()
                    mychart.resize();
                });
                //使用轮播插件,填入相关参数
                // tools.autoHover(myChart, option, 17, 1000);
            },
            resizeWorldMapContainer(){
                // document.getElementById(this.ids).style.width = window.innerWidth+'px';
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
                        let DayEfficBar = this.getMaxArr(item.data);
                        return DayEfficBar.length > 0 ? DayEfficBar[0] : 0;
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
                        top: 38,
                        left: 15,
                        right: 20,
                        bottom: 10,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: this.dayEfficBar.sunsData,
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
                this.dayEfficBar.DayEfficBar.forEach(item=>{
                    if(item.yAxisIndex==1){
                        yAxisIndex=1;
                    }
                })
                let maxData = this.getMaxSeriseData(option.series,1);
                let maxDatas = this.dayEfficBar.sunsData.map(value => {
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
                    let maxDatasIndex = this.dayEfficBar.sunsData.map(value => {
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

                        barWidth:this.barWidth * option.series.length + 26,
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
                //使用轮播插件,填入相关参数
                // tools.autoHover(myChart, option, 17, 3000);
            },
            Close(){
                this.$parent.dialogName=null;
            }
        }
    };

</script>

<style lang="scss">
    .dialogBj{
         .el-dialog__header{
             text-align: center;
         }
        .el-dialog__title{
            color: #fff;
        }
        .el-dialog{
            background-color: rgba(0,0,0,0.1);
            background: url(../../assets/img/bg1_03.png) no-repeat;
            background-size: 100% 100%;
        }
        .barHeight {
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
        /*.barHeight {*/
        /*    width: 100%;*/
        /*    height: 600px;*/
        /*}*/
        /*.full {*/
        /*    width: 100%;*/
        /*    height: 100%;*/
        /*    position: relative;*/
        /*    z-index: 9;*/
        /*}*/
        /*.full-bg {*/
        /*    position: absolute;*/
        /*    z-index: 0;*/
        /*    top: 0;*/
        /*    width: 100%;*/
        /*    height: 100%;*/
        /*    padding: 30px 20px 30px;*/
        /*    left: 0;*/
        /*}*/
    }

</style>