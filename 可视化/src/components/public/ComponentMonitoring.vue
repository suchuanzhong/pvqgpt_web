<template>
    <el-dialog title="组件监测" :visible.sync="dialogVisible"
               @close="close" class="dialogBj"  fullscreen=true   :show-close="showclose" >
        <div :id="ids" ></div>
    </el-dialog>
</template>
<script>
    export default {
        props: {
            title: {
                default: ''
            },
            ids:{
                default:"rowBarInit"
            },
            yAxis:{
                default:function(){
                    return ['内容一','内容二','内容三']
                }
            },
            data:{
                default:function(){
                    return [90,80,70]
                }
            },
            dataTwo:{
                default:function(){
                    return [90,80,70]
                }
            },
        },
        data(){
            return {
                dialogVisible: true,
                showclose:false,
                componentMonitoring:{}
            }
        },
        created() {
            let barDatas=localStorage.getItem('componentMonitoring');
            this.componentMonitoring=JSON.parse(barDatas);
        },
        mounted() {
            this.$nextTick(()=>{
                this.resizeWorldMapContainer()
                this.setEcharts(this.yAxis,this.data,this.dataTwo);
            })
        },
        methods: {
            setEcharts(yAxis,data,dataTwo) {

                let myChart = this.$echarts.init(document.getElementById(this.ids));
                var option = {
                    grid: {
                        top:"0%",
                        left: "6%",
                        right:'6%',
                        bottom:'0%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: "item",
                        axisPointer: {
                            type: 'shadow'
                        },
                        // position: "right",
                        formatter: function(data) {
                            return (
                                data.name +
                                "：" +
                                data.value
                            );
                        }
                    },
                    legend: {
                        show:false
                    },
                    xAxis: {
                        type: 'value',
                        show:false,
                    },
                    yAxis: {
                        type: 'category',
                        data: this.componentMonitoring.yAxis,
                        axisLine: {
                            lineStyle: {
                                color: "#afafaf",
                                opacity:0.8
                            }
                        },
                        boundaryGap:true,
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: "#82c2eb"
                            },
                            margin: 24,
                            fontSize: 12,
                            fontFamily: "PingFang-SC-Medium"
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    series: [{
                        name: '',
                        type: 'bar',
                        data: this.componentMonitoring.data,
                        color:'#51a4ff',
                        barMaxWidth:'20px',
                        // barGap:'20px',
                        label:{
                            formatter:function(param){
                                return param.value + '%';
                            },
                            show:true,
                            position:'right',
                            fontSize:14,
                            color: "#51a4ff"
                        }
                    },{
                        name: '',
                        type: 'bar',
                        data: this.componentMonitoring.dataTwo,
                        color:'#51a4ff',
                        barMaxWidth:'20px',
                        // barGap:'20px',
                        label:{
                            formatter:function(param){
                                return param.value + '%';
                            },
                            show:true,
                            position:'right',
                            fontSize:14,
                            color: "#51a4ff"
                        }
                    }]
                };
            
                myChart.setOption(option);
                let _this = this;
                window.addEventListener("resize", function(){
                    _this.resizeWorldMapContainer()
                    myChart.resize();
                });

            },
            resizeWorldMapContainer(){
                // document.getElementById(this.ids).style.width = window.innerWidth+'px';
                document.getElementById(this.ids).style.height = window.innerHeight-160+'px';

            },
            close(){
                this.$parent.dialogName=null;
            }

        }
    };
</script>
<style  lang="scss">

    .dialogBj{
        .el-dialog__header{
            text-align: center;
        }
        .el-dialog__title{
            color: #fff;
        }
        .el-dialog{
            background-color: rgba(0,0,0,0.1);
            background: url('../../assets/img/bg1_03.png') no-repeat;
            background-size: 100% 100%;
        }
        .barHeight {
            width: 100%;
            height: 100%;
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
            padding: 30px 20px 30px;
            width: 100%;
            height: 100%;
            left: 0;
        }

    }

</style>