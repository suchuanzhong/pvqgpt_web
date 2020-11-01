<template>
    <el-dialog
            title="组件价格趋势分析"
            :visible.sync="dialogVisible"
            @close="Close"
            append-to-body
            fullscreen=true
            :show-close="showclose"
            class="dialogBj"
    >
        <div class="barHeight"  >
            <div :id="ids" class="full"></div>
            <div :id="ids+'bg'" class="full full-bg"></div>
        </div>
<!--        <div class="tableBox" v-if="is_table">-->
<!--            <div class="tableTitle">-->
<!--                <p>数据表格</p>-->
<!--            </div>-->
<!--            <template>-->
<!--                <div class="table-box">-->
<!--                    <el-table :data="tableData" border style="width: 100%"  height="289px">-->
<!--                        <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>-->
<!--                        <el-table-column prop="name" label="年份" width="180" align="center"></el-table-column>-->
<!--&lt;!&ndash;                        <el-table-column prop="baseName" label="基地" width="260" align="center"></el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                        <el-table-column prop="name" label="电站" width="180" align="center"></el-table-column>&ndash;&gt;-->
<!--                        <el-table-column-->
<!--                                v-for="(item,i) in tableCol"-->
<!--                                :key="i"-->
<!--                                :prop="item.prop"-->
<!--                                :label="item.label"-->
<!--                                align="center"-->
<!--                        ></el-table-column>-->
<!--                    </el-table>-->
<!--                </div>-->
<!--            </template>-->
<!--        </div>-->
    </el-dialog>
</template>

<script>
    export default {
        props: {
          
            ids: {
                default: "sopent"
            },
            rotate: {
                default: false
            },

            index: {
                default: 0
            },
            Componentprice: {
                default: function() {
                    return [
                        {
                            name: "单晶硅",
                            type: "bar",
                            yAxisIndex: 0,
                            data: [0.5, 0.332, 0.301, 0.334, 0.39]
                        },
                        {
                            name: "多晶硅",
                            type: "bar",
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
                default: 12
            },
            unit: {
                default: function() {
                    return ["元"];
                }
            },
            priceData: {
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
                isShowTable:true,//表格显示
                tableData:[],
                tableCol:[],
                is_table:true,
                showclose:false,
                dialogVisible: true,
                mychart: null ,
                EchartAnaly:{}
            };
        },
        created() {
            debugger
            // this.is_table=false;
            let barDatas=localStorage.getItem('EchartAnaly');
            this.EchartAnaly=JSON.parse(barDatas);
            // this.EchartAnaly=locData.barDatas;
            // this.is_table = this.EchartAnaly.is_table
        },
        mounted() {
            this.$nextTick(()=>{
                this.resizeWorldMapContainer()
                this.drawChart();
                // this.tableInit()
                // console.log(this.tableData)
            })
        },

        methods: {
            tableInit(){

                this.tableData =[]
                let tabledata= [],tableCol=[]
                let _this = this
                _this.EchartAnaly.priceData.map((item,index)=>{
                    tabledata.push({
                        name:item,
                        valueOne:_this.EchartAnaly.Componentprice[0].data[index],
                        valueTwo:_this.EchartAnaly.Componentprice[1] == undefined?"": _this.EchartAnaly.Componentprice[1].data[index],
                        valueThree:_this.EchartAnaly.Componentprice[2] == undefined?"":_this.EchartAnaly.Componentprice[2].data[index],
                        valueFour:_this.EchartAnaly.Componentprice[3] == undefined?"":_this.EchartAnaly.Componentprice[3].data[index],
                    })
                })
                let indexArr = ["valueOne","valueTwo","valueThree","valueFour"]
                _this.EchartAnaly.Componentprice.map((item,index)=>{
                    let lableSTr = ""
                    if(_this.unit[index]==undefined){
                        lableSTr = item.name+`(${_this.unit[0]})`
                    }else if(_this.unit[index] ==""){
                        lableSTr = item.name
                    }else{
                        lableSTr = item.name+`(${_this.unit[index]})`
                    }
                    tableCol.push({
                        label: lableSTr,
                        prop:indexArr[index]
                    })
                })
                this.tableData= tabledata
                this.tableCol= tableCol
            },
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

                for (var i = 0; i < this.EchartAnaly.Componentprice.length; i++) {
                    legend.push( this.EchartAnaly.Componentprice[i].name);
                    if ( this.EchartAnaly.Componentprice[i].yAxisIndex > 0 && yAxis.length == 1) {
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
                            // max: this.max ? this.max : null,
                            axisLine: false,
                            splitLine: false
                        });
                    }
                    series.push({
                        type:  this.EchartAnaly.Componentprice[i].type,
                        name:  this.EchartAnaly.Componentprice[i].name,
                        data:  this.EchartAnaly.Componentprice[i].data,
                        barMaxWidth: this.barWidth,
                        yAxisIndex:0,
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
                                // fontFamily: "DINOT",
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
                        // show: this.showLegend,
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
                            data:  this.EchartAnaly.priceData,
                            axisLabel: {
                                color: "#82c2eb",
                                fontSize:14,
                                // fontSize: this.rotate && this.priceData.length > 5 ? 12 : 14
                                // rotate:this.rotate&&this.priceData.length>5?60:0
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
                        let Componentprice = this.getMaxArr(item.data);
                        return Componentprice.length > 0 ? Componentprice[0] : 0;
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
                        left: 10,
                        right: 10,
                        bottom: 0,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: "category",
                            data:  this.EchartAnaly.priceData,
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
                this.EchartAnaly.Componentprice.forEach(item=>{
                    if(item.yAxisIndex==1){
                        yAxisIndex=1;
                    }
                })
                let maxData = this.getMaxSeriseData(option.series,1);
                let maxDatas =  this.EchartAnaly.priceData.map(value => {
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
                    let maxDatasIndex =  this.EchartAnaly.priceData.map(value => {
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
            },
            Close(){
                this.$parent.dialogName=null;
            }
        }
    };
</script>

<style lang="scss" >
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
            height: 600px;
            position: relative;
        }
        .full {
            width: 100%;
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
        .tableBox{
            margin-top: 50px;
            .tableTitle{
                font-size: 18px;
                line-height: 24px;
                color: #fff;
                margin-bottom: 10px;
            }
            .el-table th, .el-table tr {
                color: #fff;
                background-color: rgb(18,50,88);
            }
            .el-table--enable-row-hover .el-table__body tr:hover>td {
                background-color: #124c75;
            }
            .el-table__body-wrapper,.el-table__header-wrapper{
                background-color: rgb(18,50,88);
            }
        }
    }

</style>