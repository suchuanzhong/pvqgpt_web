<template>
    <div class="zui-info-detail">
        <h2>{{digitalArchivesList.basename}}</h2>
        <!--      <div class="zui-icon-back" @click="back"></div>-->

        <el-row :gutter="40" style="padding: 0px 50px 30px;">
            <el-col :span="6">
                <HomeMapBase class="zui-map" :PowerData="PowerData"  ref="maps" ></HomeMapBase>
            </el-col>
            <el-col :span="8.5" >
                <div class="zui-list" >
                    <div class="zui-card">
                        <div class="zui-baseInformation"><span>批次</span></div>
                        <div class="zui-Information"><span>{{digitalArchivesList.batchName}}</span></div>
                    </div>
                    <div class="zui-card">
                        <div class="zui-baseInformation"><span>建设时间</span></div>
                        <div class="zui-Information"><span>{{digitalArchivesList.buildtime|timeFilter}}</span></div>
                    </div>
                    <div class="zui-card">
                        <div class="zui-baseInformation"><span>并网容量（MW）</span></div>
                        <div class="zui-Information"><span>{{digitalArchivesList.gridsCale}}</span></div>
                    </div>
                    <div class="zui-card">
                        <div class="zui-baseInformation"><span>占地面积（亩）</span></div>
                        <div class="zui-Information"><span>{{digitalArchivesList.area}}</span></div>
                    </div>
                    <div class="zui-card">
                        <div class="zui-baseInformation"><span>年均辐射量（kWh/m²）</span></div>
                        <div class="zui-Information"><span>{{digitalArchivesList.radiation}}</span></div>
                    </div>
                </div>

            </el-col>
            <el-col :span="8.9">
                <div class="zui-list" >
                    <div class="zui-card">
                        <div class="zui-baseInformation"><span>省份</span></div>
                        <div class="zui-Information"><span>{{digitalArchivesList.province}}</span></div>
                    </div>
                    <div class="zui-card">
                        <div class="zui-baseInformation"><span>并网时间</span></div>
                        <div class="zui-Information"><span>{{digitalArchivesList.gridtime |timeFilter}}</span></div>
                    </div>
                    <div class="zui-card">
                        <div class="zui-baseInformation"><span>总投资（亿元）</span></div>
                        <div class="zui-Information"><span>{{digitalArchivesList.invest}}</span></div>
                    </div>
                    <div class="zui-card">
                        <div class="zui-baseInformation"><span>资源区</span></div>
                        <div class="zui-Information"><span>{{digitalArchivesList.sourcearea}}</span></div>
                    </div>
                    <div class="zui-card">
                        <div class="zui-baseInformation"><span>年均发电量（万kWh）</span></div>
                        <div class="zui-Information"><span>{{digitalArchivesList.power}}</span></div>
                    </div>
                </div>
            </el-col>
        </el-row>

        <div class="zui-sub-tab" >
            <div class="zui-sub-tab_li"  :class="{active :actType==0}" @click="actType=0">
                信息详情
            </div>
            <div class="zui-sub-tab_Station" :class="{active :actType==1}" @click="actType=1">
                电站详情
            </div>
            <div class="zui-sub-tab_equipment" :class="{active :actType==2}" @click="actType=2">
                设备详情
            </div>
            <div class="zui-sub-tab_info" :class="{active :actType==3}" @click="actType=3">
                收资详情
            </div>

        </div>

        <Information v-show="actType==0" :articleData="digitalArchivesList"></Information>
        <PowerStation v-if="actType==1" ></PowerStation>
        <Equipment v-if="actType==2"></Equipment>
        <CollectInformation v-show="actType==3"></CollectInformation>
        <!--      <div class="navs">-->
        <!--          <router-view></router-view>-->
        <!--      </div>-->
    </div>
</template>
<script>

    import { getFormatDate } from "@/utils/auth";

    export default {
        props: {
            articleData: {
                default: function() {
                    return {};
                }
            }
        },
        components:{
            HomeMapBase: resolve => {
                require(["@/components/public/mapBase.vue"], resolve);
            },
            Information:resolve => {
                require(["@/views/page/digitalArchives/information.vue"], resolve);
            },
            PowerStation:resolve => {
                require(["@/views/page/digitalArchives/Plant-details.vue"], resolve);
            },
            Equipment:resolve => {
                require(["@/views/page/digitalArchives/Details-equipment.vue"], resolve);
            },
            CollectInformation:resolve => {
                require(["@/views/page/digitalArchives/Collect-information.vue"], resolve);
            }
        },

        filters: {
            toUpperCase(text) {
                return text.toUpperCase();
            },
            dateFormat(date) {
                return getFormatDate("yyyy-MM-dd hh:mm:ss", date);
            }
        },
        data(){
            return{

                informationList:[],
                actType: 0,
                digitalArchivesList:{},
                PowerData:[]
            }
        },
        mounted() {
            this.$nextTick(()=>{
                this.getMapBaseList();
                this.getMtrDetQuery();
            })



        },

        methods: {
            //地图
            getMapBaseList() {

                var _this=this;
                _this.$fetchGet({url:'/MtrBase/GetStationCoordinates',params:{BaseId:_this.$route.query.id}}).then(res => {
                    _this.PowerData = res.data.result;
                });
            },
            getMtrDetQuery(){
              
                console.log('接受id',this.$route.query.id)
                this.$fetch("/MtrBase/GetMtrDetQuery", {
                    Id: this.$route.query.id
                }).then(res => {

                    this.digitalArchivesList=res.data;
                    if(!this.digitalArchivesList.province) {
                        this.digitalArchivesList.province=this.$route.query.point;
                    }



                });
            },
            // back() {
            //   this.$router.go(-1)
            //   // this.$emit("update:showList", true);
            // }
        }
    };
</script>

<style lang="scss" scoped>
    //数字可视化
    .zui-map {
        /*background-color: #1da63b;*/
        border: solid 1px #e4e4e4;
        height: 310px;
    }
    .zui-info-detail{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }
    h2{
        text-align: center;
        font-size: 30px;
        color: #000;
        line-height: 6pc;
        margin-top: 50px;
    }
    li{
        margin-bottom: 20px;
        display: flex;
    }
    .zui-baseInformation{
        text-align: right;
        margin-right: 10px;
        width: 220px;
        height: 46px;
        background-image: linear-gradient(
                        rgba(25,177,151,0.1) 0%,
                        rgba(29,166,59,0.1) 100%),
        linear-gradient(
                        rgba(228,228,228,0.1),
                        rgba(228,228,228,0.1));
        span{
            color: #666666;
            font-size: 16px;
            line-height: 40px;
            padding-right: 20px;
        }
    }
    .zui-Information{
        width: 420px;
        height: 46px;
        background-image: linear-gradient(90deg,
                rgba(25, 177, 151, 0.2) 0%,
                rgba(29, 166, 59, 0.2) 100%);
        border: solid 1px rgba(27, 172, 107, 0.6);
        span{
            font-family: MicrosoftYaHei-Bold;
            font-size: 16px;
            color: #1bac6b;
            line-height: 40px;
            padding-left: 20px;
        }
    }
    .zui-card{
        display: flex;
        margin-bottom: 20px;


    }
    .bold-text {
        font-weight: bold;
        font-size: 18px;
        padding-left: 50px;
        color: #666666;
    }
    .zui-info-breads {
        background: #efefef;
        padding: 16px 20px;
        i {
            vertical-align: middle;
        }
    }
    .zui-info-article {
        padding: 60px 20px 20px 20px;
        text-align: center;
        border-bottom: 1px solid #eeeeee;
    }
    .zui-article-info {
        display: flex;
        padding: 15px 0;
        span {
            flex: 1;
            white-space: nowrap;
            text-align: center;
            color: #999999;
            font-size: 14px;
        }
    }
    .zui-article-title {
        color: #000;
        font-size: 20px;
    }
    .zui-article-content {
        padding: 20px 0;
        // 可以删掉
        color: #666666;
        font-size: 16px;
        line-height: 2em;
        // 可以删掉 --end
    }
    .zui-icon-back {
        cursor: pointer;
    }
    .zui-sub-tab{
        display: flex;
        /*background: #f4f4f4;*/
        .zui-sub-tab_li {
            flex: 1;
            line-height: 66px;
            height: 71px;
            text-align: center;
            color: #fff;
            cursor: pointer;
            position: relative;
            background-image: url("../../../assets/img/index/Power-station.png");

            a {
                /*font-weight:bold;*/
                color: #fff;
                text-shadow:0px 1px 1px rgba(0, 0, 0, 0.6);
                font-size: 18px;
                line-height: 66px;
            }

            &.active {
                color: #fff;
                text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.6);
                font-size: 18px;
                line-height: 66px;
                height: 80px;
                background-image: url("../../../assets/img/index/Power-Active.png");

                a {
                    color: #fff;
                    display: inline-block;
                    height: 50px;
                    /*border-bottom: 2px solid #1da63b;*/
                }
            }

        }
        .zui-sub-tab_Station {
            flex: 1;
            line-height: 66px;
            height: 71px;
            text-align: center;
            color: #fff;
            cursor: pointer;
            position: relative;
            background-image: url("../../../assets/img/index/equipment.png");

            a {
                color: #fff;
                text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.6);
                font-size: 18px;
                line-height: 66px;
            }

            &.active {
                color: #fff;
                text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.6);
                font-size: 18px;
                line-height: 66px;
                height: 80px;
                background-image: url("../../../assets/img/index/equipment-Active.png");

                a {
                    color: #fff;
                    display: inline-block;
                    height: 50px;
                }
            }
        }
        .zui-sub-tab_equipment{
            flex: 1;
            line-height:66px;
            height: 71px;
            text-align: center;
            color: #fff;
            cursor: pointer;
            position: relative;
            background-image: url("../../../assets/img/index/information.png");

            a {
                color: #fff;
                text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.6);
                font-size: 18px;
                line-height: 66px;
            }

            &.active {
                color: #fff;
                text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.6);
                font-size: 18px;
                line-height: 66px;
                height: 80px;
                background-image: url("../../../assets/img/index/information-active.png");

                a {
                    color: #fff;
                    display: inline-block;
                    height: 50px;
                }
            }
        }
        .zui-sub-tab_info{
            flex: 1;
            line-height: 66px;
            height: 71px;
            text-align: center;
            color: #fff;
            cursor: pointer;
            position: relative;
            background-image: url("../../../assets/img/index/Collect-information.png");

            a {
                color: #fff;
                text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.6);
                font-size: 18px;
                line-height: 66px;
            }

            &.active {
                color: #fff;
                text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.6);
                font-size: 18px;
                line-height: 66px;
                height: 80px;
                background-image: url("../../../assets/img/index/Collect-informationActive.png");

                a {
                    color: #fff;
                    display: inline-block;
                    height: 50px;
                }
            }
        }
    }
</style>
