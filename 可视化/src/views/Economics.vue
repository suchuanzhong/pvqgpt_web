<template>
    <div class="comprehensive">
        <div class="left-box">
            <Title title="控制面板" en="Control Panel"></Title>
            <div class="tie-box">
                <div class="tie-box-left">
                    <h2>时间</h2>
                </div>
                <div class="tie-box-right">
                    <span style="padding: 2px 20px" :class="{active:actTime=='年'}" @click="actTime='年'">年</span>
                    <span style="padding: 2px 20px" :class="{active:actTime=='月'}" @click="actTime='月'">月</span>
                    <span style="padding: 2px 20px" :class="{active:actTime=='累计'}"  @click="actTime='累计'">累计</span>
                </div>
            </div>
            <div class="tie-box">
                <div class="tie-box-left">
                    <h2>基地</h2>
                </div>
                <div class="tie-box-right">
                    <el-row :gutter="15">
                        <el-col :span="8" v-for="(item,index) in stationData" :key="index">
                            <div class="da-tong"  :class="{active:isActStation(item)}" @click="toggleActStattion(item)"><label>{{item}}</label></div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="tie-box">
                <div class="tie-box-left">
                    <h2>设备</h2>
                </div>
                <div class="tie-box-right">
                    <span style="padding: 2px 15px"  :class="{active:actTemp=='逆变器'}" @click="clickTemp('逆变器')">逆变器</span>
                    <span style="padding: 2px 15px"  :class="{active:actTemp=='组件'}" @click="clickTemp('组件')">组件</span>
                </div>
            </div>
            <div class="tie-box" v-if="actTemp">
                <div class="tie-box-left">
                    <h2>型号</h2>
                </div>
                <div class="tie-box-right">
                    <template v-if="actTemp=='逆变器'">
                        <span v-for="(item,index) in sizeData1" :key="index" :class="{active:isActSize(item,0)}"  @click="clickSize(item,0)" >{{item}}</span>

                    </template>
                    <template v-else-if="actTemp=='组件'">
                        <span v-for="(item,index) in sizeData2" :key="index" :class="{active:isActSize(item,1)}"  @click="clickSize(item,1)" >{{item}}</span>
                    </template>


                </div>
            </div>
            <div class="tie-box">
                <div class="tie-box-left">
                    <h2>指标</h2>
                </div>
                <div class="tie-box-right">
                    <span v-for="(item,index) in zbData" :key="item"  :class="{active:actZB==item}"  @click="clickZB(item,0)" v-if="actTemp==''">{{item}}</span>
                    <span v-for="item in tempZB" :key="item"  :class="{active:actZB==item}"  @click="clickZB(item,1)"  v-if="actTemp">{{item}}</span>
                </div>
            </div>
            <div class="station" @click="showResult=true">开始分析</div>
        </div>
        <div class="right-box" v-if="showResult">
            <Title title="分析结果" en="Analysis Result"></Title>
            <div class="tie-box">
                <div class="tie-box-right result">
                    <div class="checkbox">
                        <el-checkbox v-model="data" size="large" @change="showAnalyse"></el-checkbox>
                    </div>
                    <span>{{actTime}}</span>
                    <span v-for="station in actStation" :key="station">{{station}}</span>
                    <template v-if="actTemp">
                        <span>{{actTemp}}</span>
                        <template v-if="actTemp=='逆变器'">
                            <span v-for="item in actSize[0]" :key="item">{{item}}</span>
                        </template>
                        <template v-else-if="actTemp=='组件'">
                            <span v-for="item in actSize[1]" :key="item">{{item}}</span>
                        </template>
                    </template>
                    <span v-if="actZB">{{actZB}}</span>
                </div>
            </div>



        </div>
    </div>
</template>

<script>
    import Title from "@/components/public/TitleName"
    import TimeCard from "../components/public/TimeCard"
import { constants } from 'fs';
    export default {
        name: "comprehensive",
        components: {
            Title,
            TimeCard
        },
        data(){
            return{
                stationData:['大同','寿阳','渭南','海兴','白城','泗洪','格尔木','达拉特','德令哈','宝应','上饶','长治','铜川'],
                zbData:['发电量','可利用小时数','限电率','可利用率','能效比'],
                tempZB:['转换效率','衰减率'],
                actTime:"年",
                actZB:"",
                actStation:[],
                sizeData1:['SUN2000-100KTL-H2','SG2500','SUN20-KTL-H2','SUN15--H2'],
                sizeData2:['SUN20-KTL-H2','SUN20--H2','SG2500'],
                actTemp:"",
                actSize:{
                    0:[],
                    1:[]
                },
                showResult:false
            }
        },
        mounted(){
            this.$emit('update:showRightBtn', false)
        },
        watch:{
          showResult(val){
              this.$emit('update:showRightBtn', val)
          }
        },
        methods:{
            isActStation(name){
                var index=this.actStation.indexOf(name);
                return index>=0?true:false
            },
            toggleActStattion(name){
                var index=this.actStation.indexOf(name);
                if(index>=0){
                    this.actStation.splice(index,1);
                    return false;
                }else{
                    this.actStation.push(name);
                    return true;
                }
            },
            clickTemp(tempName){
                this.actTemp=(this.actTemp&&this.actTemp==tempName)?'':tempName
            },
            isActSize(name,index){//指标选中状态控制
                var i=this.actSize[index].indexOf(name);
                return i>=0?true:false;
            },
            clickSize(name,index){//指标选择
                var i=this.actSize[index].indexOf(name);
                if(i>=0){
                    this.actSize[index].splice(i,1);
                }else{
                    this.actSize[index].push(name);
                }
            },
            isActZB(){

            },
            clickZB(name){
                this.actZB=(this.actZB&&this.actZB==name)?'':name
            },
            showAnalyse(show)
            {
                this.$parent.showlegends(show);
                if (this.$parent.$refs.map && this.$parent.$refs.map.showAnalyse) {
                    this.$parent.$refs.map.showAnalyse(getIndexRightBarColor);
                };
            }

        },
        beforeDestroy () {
        //清除基地的图标和柱状图
        if (this.$parent.$refs.map && this.$parent.$refs.map.getViewer) {
                    var viewer= this.$parent.$refs.map.getViewer();
                    if(viewer)
                    clearDataSourcees(["base", "3dbars"],viewer);                  
        };
        this.$parent.showlegends(false);
        }
    }
</script>
<style scoped lang="scss">
    .tie-box {
        background: rgba(3, 47, 52, 0.4);
        margin-bottom: 10px;
        border-radius: 4px;
        border: 1px solid rgba(0, 151, 149, 0.4);
        display: flex;
        box-sizing: border-box;
        .tie-box-left{
            width: 65px;
            text-align: center;
            line-height: 58px;
            color:#fff;
            font-size: 16px;
            background: rgba(0, 125, 143, 0.22);
        }
        .tie-box-right{
            flex: 1;
            padding: 15px 10px 0 10px;
            text-align: left;
            span{
                display: inline-block;
                padding: 2px 8px;
                color:#3b7982;
                margin-bottom: 10px;
                cursor: pointer;
                &.active{
                    color:#fff;
                    background: linear-gradient(to bottom, #8af0ff, #01d6eb);
                    -webkit-background-clip: text;
                    font-weight: bolder;
                    color: transparent;
                    -webkit-text-fill-color: transparent;
                    text-fill-color: transparent;
                    text-shadow:0 0 20px rgba(5, 215, 236, 0.9);
                }
            }
        }
    }
    .tie-box-right.result{
        padding-right: 40px;
        position: relative;
        padding-bottom: 10px;
        span{
            border: 1px solid rgba(0, 189, 187, 0.5);
            background: rgba(0, 189, 187, 0.1);
            color:#00d2f1;
            padding: 2px 20px;
            margin: 7.5px;
            display: inline-block;
        }
    }
    .da-tong {
        text-align: center;
        padding: 9px 4px;
        width: 80px;
        height: 36px;
        display: inline-block;
        margin: 0 0 15px 0;
        cursor: pointer;
        background: url("../assets/img/star.png") no-repeat;
        label{
            cursor: pointer;
            font-size: 20px;
            font-weight: bold;
            font-family: "Adobe 黑体 Std";
            line-height: 18px;
            color: #017e90;

        }
        &.active{
            label{
                color:#fff;
                background: linear-gradient(to bottom, #8af0ff, #01d6eb);
                -webkit-background-clip: text;
                font-weight: bolder;
                color: transparent;
                -webkit-text-fill-color: transparent;
                text-fill-color: transparent;
                text-shadow:0 0 20px rgba(5, 215, 236, 0.9);
            }

        }
    }
    .station {
        background: rgba(0,151,149,1);
        background: linear-gradient(left, #005d5b, #075c6a);
        background: -ms-linear-gradient(left, #005d5b, #075c6a);
        background: -webkit-linear-gradient(left, #005d5b, #075c6a);
        background: -moz-linear-gradient(left, #005d5b, #075c6a);
        // border: 1px solid rgba(0, 151, 149, 0.4);
        color: #fff;
        padding: 14px 0;
        font-size: 14px;
        text-align: center;
        line-height: 14px;
    }
</style>

<style lang="scss">
    .checkbox{
        position: absolute;
        right: 20px;
        top: 20px;
        .el-checkbox__inner{
            width: 20px;
            height: 20px;
            &::after {
                content: "";
                border: 1px solid #FFF;
                border-left: 0;
                border-top: 0;
                height: 9px;
                left: 8px;
                position: absolute;
                top: 3px;
            }
        }
    }
</style>
