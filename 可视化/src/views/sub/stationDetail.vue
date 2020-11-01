<template>
    <div class="resources">
        <div class="left-box">
            <Title title="基地概况" en="Base survey" @click.native="loadgylc"></Title>
            <EchartsPie style="height:210px ;"></EchartsPie>
            <div class="station-detail">
                <el-row>
                    <el-col :span="24">
                        <p>批次：<span>第三批次</span></p>
                    </el-col>
                    <el-col :span="12">
                        <p>建设时间：<span>2018年8月</span></p>
                    </el-col>
                    <el-col :span="12">
                        <p>并网时间：<span>2018年12月</span></p>
                    </el-col>
                </el-row>
            </div>
            <Title title="基地运行情况" en="Base operation" @click.native="loadcure"></Title>
            <MyTable :thead="thead" :tableData="tableData"></MyTable>
            <Title title="发电量和利用小时数" en="utilization hours" @click.native="loadfdlxss"></Title>
            <EchartsBars style="height: 180px;width:100%"></EchartsBars>

        </div>
        <div class="right-box">
            <Title title="辐照强度及发电量" en="power generation" @click.native="loadfamian"></Title>
            <div class="libg" v-for="(item,index) in fslfd" :key="index">
                <p>{{item.projectName}}
                    {{item.label}}</p>
                <el-row>
                    <el-col :span="10">
                        <span>辐射量</span>
                        <big>{{item.data1}}</big>
                        <small>W/㎡</small>
                    </el-col>
                    <el-col :span="14" style="padding-left: 20px">
                        <span>当日发电量</span>
                        <big>{{item.data2}}</big>
                        <small>万kWh</small>
                    </el-col>
                </el-row>
            </div>
            <Title title="实时功率" en="Investment Statistics" @click.native="showNxb"></Title>
            <EchartsLine style="height: 180px;" :data="LineData" subText="MW" ></EchartsLine>
            <Title title="基地环保数据" en="Investment Statistics"   @click.native="showTimeLine"></Title>
            <div class="green-box">
                <el-row>
                    <el-col :span="6">
                        <div class="img-box">
                            <img src="/img/tree.png" width="50" alt="">
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div class="middle">
                            <p><span>累计植树</span><big>3085.53</big><small>万棵</small></p>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="green-box">
                <el-row>
                    <el-col :span="6" class="p-tb-20">
                        <div class="img-box" style="padding-top: 15px"><img src="/img/hjjc.png"  width="50" alt=""></div>
                    </el-col>
                    <el-col :span="18" class="p-tb-20">
                        <p><span>累计减排CO2</span><big>63.68</big><small>吨</small></p>
                        <p><span>累计减排硫化物</span><big>1.92</big><small>吨</small></p>
                        <p><span>累计减排氮化物</span><big>0.96</big><small>吨</small></p>
                    </el-col>
                </el-row>
            </div>
            <div class="green-box" style="margin-bottom: 0px">
                <el-row>
                    <el-col :span="6">
                        <div class="img-box">
                            <img src="/img/mt.png" width="50" alt="">
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div class="middle">
                            <p><span>节约标煤</span><big>25.55</big><small>吨</small></p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from '@/components/public/TitleName'
    import EchartsLine from '@/components/public/echartLine'
    import EchartsBars from '@/components/public/echarts/echartsBar2'
    import MyTable from '@/components/public/MyTable'
    import EchartsPie from '@/components/public/echartsPie'
    export default {
        name: "stationDetail",
        components:{
            Title,EchartsBars,EchartsLine,MyTable,EchartsPie
        },
        data:function(){
            return{
           LineData:{
                series: [{
                    symbol: 'none',
                    symbolSize: 0,
                    name: "",
                    data: [0,0,0,0,0,26,65,162.47,178.24,214,249.55,267.6,298.5,256.5,204.78,195,121,76,46,3,0,0,0,0],
                    type: 'line',
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
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
                    dataAxis: ['1点','2点','3点','4点','5点','6点','7点', '8点', '9点','10点','11点','12点','13点','14点','15点','16点','17点','18点','19点','20点', '21点','22点','23点','24点'],
                unit: ''
            },
                fslfd:[
                    {
                        "label": "1#电站",
                        "projectName": "广洋1号",
                        "data1": 465.23,
                        "data2":30.25
                    }, {
                        "label": "2#电站",
                        "projectName": "射阳1号",
                        "data1": 439.91,
                        "data2":34.13
                    }, {
                        "label": "3#电站",
                        "projectName": "射阳2号",
                        "data1": 452.19,
                        "data2":30.25
                    }, {
                        "label": "4#电站",
                        "projectName": "柳堡1号",
                        "data1": 449.68,
                        "data2":34.13
                    },  {
                        "label": "5#电站",
                        "projectName": "柳堡2号",
                        "data1": 462.77,
                        "data2":30.25
                    }],
                thead:[
                    {
                        name:" ",
                        unit:"",
                        prop:'label',
                        width:'20%'
                    },{
                        name:"发电量",
                        unit:"kwh",
                        prop:'data1',
                        width:'20%'
                    },{
                        name:"利用小时数",
                        unit:"(h)",
                        prop:'data2',
                        width:'20%'
                    },{
                        name:"弃光量",
                        unit:"(kwh)",
                        prop:'data3',
                        width:'20%'
                    },{
                        name:"弃光率",
                        unit:"(%)",
                        prop:'data4',
                        width:'20%'
                    }],
                tableData:[
                    {
                        "label": "当日",
                        "data1": "159",
                        "data2":"3.18",
                        "data3":0,
                        "data4":0
                    }, {
                        "label": "当月",
                        "data1": "5107.5",
                        "data2":"102.15",
                        "data3":0,
                        "data4":0
                    }, {
                        "label": "当年",
                        "data1": "63870.5",
                        "data2":"1277.41",
                        "data3":0,
                        "data4":0
                    },{
                        "label": "累计",
                        "data1": "63870.5",
                        "data2":"1277.41",
                        "data3":0,
                        "data4":0
                    }]
            }
        },
        methods: {
            loadgylc() {
                if (this.$parent.$refs.map && this.$parent.$refs.map.loadScript) {
                    this.$parent.$refs.map.loadScript();
                };
            },
            loadcure(){
                if (this.$parent.$refs.map && this.$parent.$refs.map.loadBasecurveline) {
                    this.$parent.$refs.map.loadBasecurveline();
                };                
            },
            loadfdlxss(){
                if (this.$parent.$refs.map && this.$parent.$refs.map.loadfdlxss) {
                    debugger;
                    var data=[
                            [
                            { name: "1#", value: 11668.25},
                            { name: "2#", value: 12489.75},
                            { name: "3#", value: 11852.5},
                            { name: "4#", value: 13653.5},
                            { name: "5#", value: 14206.5}
                            ],
                            [
                            { name: "1#", value: 1166.82},
                            { name: "2#", value: 1248.98},
                            { name: "3#", value: 1185.25},
                            { name: "4#", value: 1365.35},
                            { name: "5#", value: 1420.65}
                            ]
                        ]
                    this.$parent.$refs.map.loadfdlxss(data);
                };  
            },
            loadfamian()
            {
                if (this.$parent.$refs.map && this.$parent.$refs.map.showTypePolygon) {
                   this.$parent.$refs.map.showTypePolygon();
                };
            },
            showNxb(){
                if (this.$parent.$refs.map && this.$parent.$refs.map.loadnxb) {
                var data= [
                            { name: "1#", value: 78},
                            { name: "2#", value: 82.2},
                            { name: "3#", value: 81.5},
                            { name: "4#", value: 77.3},
                            { name: "5#", value: 78.8}
                        ];
                    this.$parent.$refs.map.loadnxb(data);
                }
            },
            showTimeLine()
            {
                if (this.$parent.$refs.map && this.$parent.$refs.map.showTimeLine) {
                   this.$parent.$refs.map.showTimeLine();
                };
            }
        },
        created(){
            var h=new Date().getHours();
            this.LineData.series[0].data=this.LineData.series[0].data.slice(0,h);
            this.LineData.dataAxis=this.LineData.dataAxis.slice(0,h);
        },
        mounted() {
            this.$emit('update:back', true);
        },
        beforeDestroy () {
                    if (this.$parent.$refs.map && this.$parent.$refs.map.getViewer) {
                    var viewer= this.$parent.$refs.map.getViewer();
                    this.$parent.$refs.map.clearScriptSources();
                    if(viewer)
                    clearDataSourcees(["gotobase", "scriptDatasource","720Point","stationpolygon","fdlxss","NengXB"],viewer);                  
        };;
        },
    }
</script>

<style scoped lang="scss">
    .station-detail{
        color:#fff;
        border-top: 1px solid rgba(0, 255, 255, 0.23);
        text-align: left;
        font-size: 16px;
        padding-top: 15px;
        font-family: "Microsoft YaHei","微软雅黑";
        margin-bottom: 10px;
    }
    .station-detail p{
        margin-bottom: 5px;
    }
    .station-detail p>span{
        color:#00ffff;
    }
    .green-box{
        background: rgba(3,47,53,.4);
        margin-bottom: 5px;
        border: 1px solid rgba(0, 151, 149, 0.4);
        .img-box{
            width: 100%;
            height: 100%;
            position: relative;
            text-align: center;
            img{
                vertical-align: middle;
                position: relative;
            }
        }

        .middle{
            margin:13px 0px;
        }
        .p-tb-20{
            padding: 5px 0;
        }
        p{
            color:#fff;
            font-size: 14px;
            text-align: left;
            padding:0 10px;
            font-family: "PingFang SC", "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "Hiragino Sans GB", Arial, sans-serif;
            span{
                display: inline-block;
                width: 7.5em;
                color:#fff;

            }
            big{
                color:#00ffff;
                font-size: 20px;
                font-family: DINOT;
                display: inline-block;
                width: 80px;
                text-align: center;
            }
            small{
                color: rgba(255,255,255,.4);
                margin-left: 5px;
            }
        }
    }
    .libg{
        text-align: left;
        background: url("/img/libg.png")no-repeat;
        background-size: 100% 100%;
        height: 61px;
        padding: 10px;
        margin-bottom: 5px;
        p{
            color:#fff;
            font-size: 16px;
        }
        span{
            color:#00d2f1;
            font-size: 14px;
        }
        big{
            padding-left: 10px;
            color:#fff;
            font-family: CITYM;
            font-size: 18px;
        }
        small{
            font-size: 12px;
            color:rgba(255,255,255,.3);
            padding-left: 2px;
        }
    }
</style>
