<template>
    <div class="profile full dark-bg sunResource">
        <div >
            <stationSelect
          :defaulState="true"
          :emitState="true"
          @selectedStation="onSelectedPC"
          :optindata = optinedataPC
          :defaultKey = optinePcKey
          selName = "批次"
          ref="StationSelect"
        ></stationSelect>
        <stationSelect
          :defaulState="true"
          :emitState="true"
          @selectedStation="onSelectedJD"
          :optindata = optinedataJD
          :defaultKey = optineJdKey
          selName = "基地"
          ref="StationSelect"
        ></stationSelect>
        <stationSelect
          :defaulState="true"
          :emitState="true"
          @selectedStation="selectedStation"
          :optindata = optinedataGZY
          selName = "光资源设备"
          ref="StationSelect"
        ></stationSelect>
        </div>
        <el-scrollbar class="profile-content" >
            <div class="profile-box-bg">
                <el-row>
                    <el-col :sm="12" :xl="4" :lg="4" :md="8" v-for="(item, index) in cardList" :key="index">
                        <div class="border-box source-border" style="position:relative;margin: 5px;z-index: 9;">
                            <div class="soure-msg" style="width:auto">
                                <p>{{ item.name }}</p>
                                <div class="jdzb-box-data">
                                    <big>{{ cardListData[index] || 0 }}</big
                                    ><small style="padding-top: 10px;width: auto;">{{ item.unit }}</small>
                                </div>
                            </div>
                            <div class="soure-img" style="position:absolute;right:20px; top: 11px;z-index: -1;">
                                <img :src="'/img/icon/' + item.name + '.png'" alt="" />
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <el-row :gutter="20">
                 <el-col :span="24" :md="24" :lg="12" :xl="12">
                    <div class="profile-box-bg p-0" :style="{ height: boxH }">
                        <div class="echarts-title">太阳能斜面辐射</div>
                        <myLine
                            ref="profileLine4"
                            ids="profileLine4"
                            title=""
                            style="height:calc(100% - 50px)"
                            :xAxis="xaxis"
                            :legend="['辐照强度']"
                            unit="W/㎡"
                            :data="lineData4"
                            yName="辐照强度(W/㎡)"
                        ></myLine>
                    </div>
                </el-col>
                <el-col :span="24" :md="24" :lg="12" :xl="12">
                    <div class="profile-box-bg  p-0" :style="{ height: boxH }">
                        <div class="echarts-title">太阳能水平面总辐射</div>
                        <myLine
                            ref="profileLine1"
                            ids="profileLine1"
                            title=""
                            style="height:calc(100% - 50px)"
                            :xAxis="xaxis"
                            :legend="['辐照强度']"
                            unit="W/㎡"
                            :data="lineData1"
                            yName="辐照强度(W/㎡)"
                        ></myLine>
                    </div>
                </el-col>
                <el-col :span="24" :md="24" :lg="12" :xl="12">
                    <div class="profile-box-bg  p-0" :style="{ height: boxH }">
                        <div class="echarts-title">太阳能直接辐射</div>
                        <myLine
                            ref="profileLine2"
                            ids="profileLine2"
                            title=""
                            style="height:calc(100% - 50px)"
                            :xAxis="xaxis"
                            :legend="['辐照强度']"
                            unit="W/㎡"
                            :data="lineData2"
                            yName="辐照强度(W/㎡)"
                        ></myLine>
                    </div>
                </el-col>
                <el-col :span="24" :md="24" :lg="12" :xl="12">
                    <div class="profile-box-bg  p-0" :style="{ height: boxH }">
                        <div class="echarts-title">太阳能散射辐射</div>
                        <myLine
                            ref="profileLine3"
                            ids="profileLine3"
                            title=""
                            style="height:calc(100% - 50px)"
                            :xAxis="xaxis"
                            :legend="['辐照强度']"
                            unit="W/㎡"
                            :data="lineData3"
                            yName="辐照强度(W/㎡)"
                        ></myLine>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="profile-box-bg p-0" :style="{ height: boxH }">
                        <div class="echarts-title">日照时数</div>
                        <myLine
                            ids="profileLine5"
                            ref="profileLine5"
                            title=""
                            style="height:calc(100% - 50px)"
                            :xAxis="xaxis2"
                            unit="小时"
                            :legend="['日照时长']"
                            :data="data2"
                            yName="日照(小时)"
                        ></myLine>
                    </div>
                </el-col>
            </el-row>
        </el-scrollbar>
    </div>
</template>

<script>
// import { DealNull } from "@/plugins/dealData"
import stationSelect from "@/components/station"
// import stationSelect from "@/components/stationA"
import myLine from "@/components/echarts/line0.vue"
export default {
    props: ["name"],
    components: {
        stationSelect,
        myLine

    },
    data() {
        return {
            optinedataPC:[],
            optinedataJD:[],
            optinedataGZY:[],
            optinePcKey:{
                value:"name",
                label:"id"
            },
            optineJdKey:{
                value:"id",
                label:"name"
            },
            cardList: [
                { name: "风速", value: "0", unit: "m/s" },
                { name: "风向", value: "0", unit: "" },
                { name: "环境温度", value: "0", unit: "℃" },
                { name: "湿度", value: "0", unit: "%" },
                { name: "气压", value: "0", unit: "hPa" },
                { name: "雨量", value: "0", unit: "mm" }
            ],
            cardListData: [],

            boxH: "300px",
            actCommand: "1号项目小微型系统实证设施",
            proj: "相关项目一",
            xaxis:[],
            xaxis2: [],
            data2: [[]],
            lineData1: [[]],
            lineData2: [[]],
            lineData3: [[]],
            lineData4: [[]],
        }
    },
    created() {
        this.boxH = document.getElementById("app").clientHeight * 0.33 + "px"
    },
    mounted() {
        let that = this
        window.onresize = function() {
            setTimeout(() => {
                that.$echarts.getInstanceByDom(document.getElementById("profileLine1")).resize()
                that.$echarts.getInstanceByDom(document.getElementById("profileLine2")).resize()
                that.$echarts.getInstanceByDom(document.getElementById("profileLine3")).resize()
                that.$echarts.getInstanceByDom(document.getElementById("profileLine4")).resize()
                that.$echarts.getInstanceByDom(document.getElementById("profileLine5")).resize()
            }, 200)
        }
        this.getSelateData()
    },
    methods: {
        //获取selsct数据
        getSelateData(){
            this.$fetchGet({url:'/MtrBase/GetBatchBaseTree'}).then(res =>{
            this.optinedataPC = res.data
            this.optinedataJD = res.data[2].childTreeNode
            this.onSelectedJD(res.data[2].childTreeNode[2].id)
        })
        },
        onSelectedPC(data){
        this.optinedataJD = []
        this.optinedataPC.map(item=>{
            if(item.name == data){
            this.optinedataJD = item.childTreeNode
            }
        })
        },
        // 通过基地编号请求光资源设备
        onSelectedJD(data){
            this.optinedataDZ =[]
            this.$fetchGet({url:'/RealTimeData/GetResourceCode',params:{baseid:data}}).then(res =>{
            this.optinedataGZY = res.data
            this.selectedStation(res.data[0].projectCode)
            })
        },
        selectedStation(id) {
            this.getJson(id)
        },
        getJson(id) {
            var _this=this;
            this.$fetchGet({url:"/RealTimeData/GetResource",params:{projectcode:id}}).then(res => {
                let resData = res.data
                let cardList = resData.weather
                this.cardListData = [cardList.winspext || 0, cardList.windirext || 0, cardList.tempext || 0, cardList.humext || 0, cardList.preext || 0, cardList.rainVal || 0];
                let startHour=new Date('2019-06-12T05:00:00').getHours();
                let endHour=new Date("2019-06-12T19:00:00").getHours();
                let year=new Date().getFullYear();
                let month=new Date().getMonth();
                let monthDay=new Date(year,month+1,0).getDate();
                _this.xaxis=[];
                _this.xaxis2=[];
                for(let i=startHour;i<=endHour;i++){
                    _this.xaxis.push(i+'h')
                };
                for(let i=1;i<=monthDay;i++){
                    _this.xaxis2.push(i+'日')
                };
                let radiat_t = resData.resource_radiat_t;//太阳能总辐射
                let radiat_dir = resData.resource_radiat_dir;//太阳能直接辐射
                let radiat_sca = resData.resource_radiat_sca;//太阳能资源散射辐射
                let radiat_cant = resData.resource_radiat_cant;//太阳能资源斜面辐射
                let dayhour = resData.dayhour;//太阳能日照时数
                if(startHour<endHour){
                    _this.lineData1=[_this.dealHourData(startHour,endHour,radiat_t)];
                    _this.lineData2=[_this.dealHourData(startHour,endHour,radiat_dir)];
                    _this.lineData3=[_this.dealHourData(startHour,endHour,radiat_sca)];
                    _this.lineData4=[_this.dealHourData(startHour,endHour,radiat_cant)];
                }
                _this.data2=[_this.dealMonthData(monthDay,dayhour)];
                _this.$nextTick(() => {
                    _this.$refs.profileLine1.initEcharts()
                    _this.$refs.profileLine2.initEcharts()
                    _this.$refs.profileLine3.initEcharts()
                    _this.$refs.profileLine4.initEcharts()
                    _this.$refs.profileLine5.initEcharts()
                })
            })
        },
        dealHourData(startHour,endHour,data){
            let dealdata=[];
            for(let i=startHour;i<=endHour;i++){
                let arr=data.filter(item=>item.hourNum==i);
                dealdata.push(arr.length?arr[0].dataValue:'--')
            }
            return dealdata
        },
        dealMonthData(monthDay,data){
            let dealdata=[];
            for(let i=1;i<=monthDay;i++){
                let arr=data.filter(item=>item.dayNum==i);
                dealdata.push(arr.length?arr[0].dataValue:'--')
            }
            return dealdata
        }
    }
}
</script>
<style scoped lang="scss">
.jdzb-box-data {
    text-align: left;
}
.jdzb-box-data small {
    float: none !important;
    vertical-align: inherit !important;
    margin-top: 0 !important;
    margin-left: 5px;
}
#app {
    .source-border {
        background: linear-gradient(to right,#19b196, #1da63b);;
        // background: url("/img/border_wind.png") no-repeat center center;
        background-size: 100% 100%;
        border-radius: 4px;
        padding: 10px 30px;
        p {
            color: #fff;
            font-size: 14px;
        }
        small {
            color: #fff;
            font-size: 12px;
            margin-left: 10px;
        }
        .soure-msg,
        .soure-img {
            display: inline-block;
            width: 46%;
            height: 60px;
            vertical-align: middle;
        }
        .soure-img {
            text-align: right;
        }
    }
}
    .profile-content{
        height: calc(100% - 50px);
    }

</style>
<style>
.sunResource .el-scrollbar__wrap {
    overflow-x: hidden !important;
}
.sunResource .stationSelect .el-select .el-input__inner{
    /* padding-left: 138px; */
}
.sunResource  .profile-title span{
        right: 3px;
    }
</style>

