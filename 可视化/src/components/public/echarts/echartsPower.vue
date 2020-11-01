<template>
    <div style="height:100%;" :id="ids">

    </div>
</template>

<script>
    export default{
        props:{
            ids:{
                type:String,
                default:"echartline"
            },
            title:{
                default:""
            },
            subText:{
                default:""
            },
            dataAxis:{
                default:function () {
                    return ['7:00','8:00','9:00','10:00','11:00','12:00']
                }
            },
            yearsDate:{
                default:function(){
                    return [3,0,2,5,8,36,65,385,648,354,321,287,468,596,477,315,121,56,86,33,14,21,11,12]
                }
            }
        },
        data(){
            return{

            }
        },
        mounted(){
            this.setEcharts();
        },
        methods:{
            setEcharts( series) {
                let echarts=this.$echarts;
                var dataShadow = [];
                var legend=[];
                for(var item in series){
                    legend.push(item.name)
                }
                let myChart=this.$echarts.init(document.getElementById(this.ids));

                var option = {
                    title: {
                        text: this.title,
                        top: 0,
                        textStyle: {
                            color: '#01cfee',
                            fontFamily:"PingFang SC",
                            fontSize:14
                        },
                        subtext:this.subText,
                        subtextStyle: {
                            width:'100%',
                            align:"center",
                            color: '#01cfee',
                            fontFamily:"PingFang SC",
                            fontSize:14
                        },
                    },
                    color:['#02e4ff','#02ff38','rgba(0,192,56,1)','rgb(225,86,87)','rgb(223,125,37)','rgb(158,178,255)','rgb(151,147,255)'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer:{
                            lineStyle:{
                                color:'#82c2eb'
                            }
                        },

                    },
                    dataZoom: [
                        {
                            type: 'inside'
                        }
                    ],
                    legend:{
                        top:0,
                        right:6,
                        itemWidth:15,
                        itemHeight:5,
                        show:false,
                        textStyle:{
                            color:"#023f66"
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: this.dataAxis,
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle:{
                                color:'#023f66'
                            }
                        },
                        axisLabel:{
                            color:'#82c2eb',
                            fontSize:14
                        }
                    },
                    yAxis: {
                        name: 'MW',
                        type: 'value',
                        nameTextStyle:{
                            color:'#82c2eb'
                        },
                        // minInterval: 1,
                        //     splitNumber:3,
                        //     nameGap:30,
                        //     min: function(value) {
                        //     return (value.min - 100)>0?value.min - 100:0;
                        // },
                        axisTick: {
                            show: false
                        },
                        splitLine:{
                            show:false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#023f66"
                            }
                        },
                        axisLabel:{
                            color:'#82c2eb',
                            fontSize:14,
                            // align:'cen',
                            showMinLabel:false
                        }
                    },
                    grid: {
                        top: "18%",
                        left: "8%",
                        right: "8%",
                        bottom: "8%",
                        containLabel: true
                    },
                    series: [{
                        symbol: 'circle',
                        symbolSize: 4,
                        name: "",
                        data: this.yearsDate,
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: {
                                    x: 0,
                                    y: 1,
                                    x2: 0,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(3,92,255,.2)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(2,228,255,0.2)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            }
                        },
                        lineStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 0,
                                colorStops: [{
                                    offset: 0,
                                    color: '#035cff' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#02e4ff' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        smooth: true
                    }
                    ],
                    dataAxis:this.dataAxis,
                };
                myChart.setOption(option);

            }
        },
        watch:{

        },
        created(){

        },

        destoryed(){

        }
    }
</script>

<style>
</style>
