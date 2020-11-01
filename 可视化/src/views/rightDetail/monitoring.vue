<template>
    <div class="arrs">
        <div
                class="left-btn"
                @click="toggleLeft"
                :class="{hideRight:(hideRight||!showRightBtn)}"
                v-show="showlegend"
        ></div>
        <div class="right-btn" @click="toggleRight" v-if="showRightBtn" :class="{hideRight:hideRight}"></div>
        <div class="legend" :class="{hideRight:(hideRight||!showRightBtn)}" v-show="showlegend"></div>
        <div class="right-shadow">
        <div class="right-box">
            <div class="right-bg">
                <div class="seation" >
                    <Title title="逆变器状态"></Title>
                    <div class="legendcls">
            <span v-for="(item,index) in legendData" :key="index">
              <i :style="{'background-color':colorList1[index]}"></i>
              {{item}}
            </span>
                    </div>
                    <el-carousel :interval="5000" arrow="hover" class="Inverter-box">
                        <el-carousel-item v-for="(item, index) in inveralldata" :key="index">
                            <div class="invertercls">
                                <echartPower style="width:200px;height:200px;"
                                             v-for="(item, index) in inveralldata[index]" :key="index"
                                             :ids="'echartline1'+item.baseName" :inverterdatas='item'
                                             :colorList1="colorList1"></echartPower>
                            </div>
                        </el-carousel-item>
                    </el-carousel>

                </div>

                <div class="seations">
                    <Title title="当月能效比"></Title>
                    <div class="effect-box">

                        <div class="effect-compare" v-for="(item,index) in effectCompList" :key="index">
                            <echartsyear :ids="item.ids" v-if="flag" :data="item.rate"
                                         :seriesData="item.series"></echartsyear>
                        </div>

                    </div>
                </div>
                <div class="seation">
                    <div @click="show720(resourceData[6].url)"  style="cursor: pointer">
                        <Title title="组件监测"></Title>
                    </div>
                    <div class="tabs pat-title">
                        <span v-for="(item,index) in tabMonit" :key="index" class="my-icon-blue"
                              :class="{active:item.bol}" @click="tabChange(index+1)">{{item.name}}</span>
                    </div>

                    <MyechartsPolar
                            ids="rowBarInit"
                            style="height: 200px;"
                            ref="motors"
                            :yAxis="motorData"
                            :data="motorSeries"
                            :dataTwo="dataTwo"
                    >
                    </MyechartsPolar>

                </div>
            </div>
        </div>
        <component
                :is="dialogName"
                ids="rowBars"
                :title="titleName"
                :yAxis="motorData"
                :data="motorSeries" :dataTwo="dataTwo"></component>
        </div>
    </div>
</template>
<script>
    import Title from "@/components/public/TitleName";
    import echartsyear from "@/components/public/echarts/liquidFill";
    import MyechartsPolar from "@/components/public/echartsPolar";
    import echartPower from "@/components/public/echartPower";
    import ComponPolar from "@/components/public/ComponentMonitoring";

    export default {
        name: "Overview",
        components: {
            Title,
            echartsyear,
            echartPower,
            MyechartsPolar,
            ComponPolar
        },
        data() {
            return {
                flag: true,
                tabMonit: [{name: "转换效率", bol: true}, {name: "哀减率", bol: false}],
                effectCompList: [],
                titleName: '',
                dialogName: [],
                motorData: [],
                motorSeries: [],
                dataTwo:[],
                xAxisData: [],
                legend: [],
                dataone: [],
                yAxis: [],
                data: [],
                datatwo: [],
                hideLeft: false,
                hideRight: false,
                showRightBtn: true,
                showlegend: false,
                active: "",
                Invertertotal: 0,
                inveralldata: [],
                legendData: ['并网', '故障', '待机', '停机', '通讯中断'],
                colorList1: ['#00ffb2','#746be8','#00deff', '#fe4c45', '#9eadb5']
            };
        },
        watch: {
            $route(route) {
                this.hideLeft = false;
                this.hideRight = false;
                this.showRightBtn = true;
            }
        },
        mounted() {
            this.getJson();
            this.MonthlyRation();
            this.componentChang();
            this.Inverter();
            this.titleName =this.tabMonit[0].name ;
        },
        methods: {
            //获取弹窗数据源
            getJson(){
                $.ajax({
                    url: 'json/data.json',
                    success: (res => {
                        this.resourceData =res.resourceData;
                        console.log( this.resourceData);
                    })
                })

            },
            //设置弹窗信息
            show720(dataObj)
            {
                console.log('g',dataObj);
                var data=[dataObj];
                try{
                    RESAFETY.callService(data)
                }catch (e) {
                    console.log('连接失败，cfg_system.run')
                }
            },
          
            //逆变器状态
            Inverter(val) {
                let params = val || 1;
                this.$axios.post("RunTheInformation/GetCloudLineStatus").then(res => {
                    if (res.code == 1) {
                        if (res.data) {
                            let resData = res.data.dataTotalList
                            let len = Math.ceil(resData.length / 2)
                            let newdata = []
                            for (let i = 0; i < resData.length; i++) {
                                if (resData[i + 1] !== undefined) {
                                    newdata.push([
                                        resData[i], resData[i + 1]
                                    ])
                                    i++
                                }
                            }
                            this.inveralldata = this.inveralldata.concat(newdata)
                            // console.log(this.inveralldata, len)
                        }
                    }
                });
            },
            tabChange(val) {
                this.tabMonit.map((item, ids) => {
                    if (ids + 1 == val) {
                        item.bol = true
                        this.titleName=   item.name;

                    } else {
                        item.bol = false

                    }
                })

                this.motorData = [];
                this.motorSeries = [];
                this.dataTwo=[];
                this.$nextTick(() => {
                    this.componentChang(val)
                })
            },

            //组件监测
            componentChang(vals) {
                
                let monitoring = vals || '1'
                this.$axios.post('RunTheInformation/GetAttenuation?Type=' + monitoring).then(res => {
                    if (res.code == 1) {

                        if (res.data && res.data.length > 0) {
                            let recieveData = res.data;
                            for (let item of recieveData) {
                                this.motorData.push(item.name)
                                this.motorSeries.push(item.value0)
                                this.dataTwo.push(item.value1)
                            }
                            let componentMonitoring ={yAxis:this.motorData,data:this.motorSeries, dataTwo:this.dataTwo,tabChange: this.tabMonit,ids:"rowBars"}
                            console.log('3',componentMonitoring)
                            localStorage.setItem("componentMonitoring", JSON.stringify(componentMonitoring));
                            this.$refs.motors.setEcharts(this.motorData, this.motorSeries,this.dataTwo)

                           
                        }
                    }
                })
            },

            //当月能效比
            MonthlyRation() {
                this.flag = false;
                this.$axios.post("RunTheInformation/GetEfficiency").then(res => {
                    if (res.code == 1) {
                        if (res.data && res.data.length > 0) {
                            let serData = res.data;
                            this.effectCompList = serData.map((item, idx) => {
                                var num = (Number(item.value0.replace('%', '')) / 100).toFixed(4);
                                // return [num,num]
                                return {
                                    ids: "liqui" + idx,
                                    rate: [num, num],
                                    series: item.name
                                }
                            })
                            this.flag = true;
                        }
                    }
                });
            },


            toggleLeft() {
                this.hideLeft = !this.hideLeft;
                $(".left-shadow").toggleClass("hideContentLeft");
            },
            toggleRight() {
                this.hideRight = !this.hideRight;
                $(".right-shadow").toggleClass("hideContentRight");
            },
            showlegends(show) {
                this.showlegend = show;
            },
            changeposition(text) {
                this.position = text;
            }
        }
    };
</script>
<style lang="scss">
   .Inverter-box{
       .el-carousel__container{
           height: 165px !important;
       }
   }
</style>
<style scoped lang="scss">
    .legendcls {
        color: #fff;
        font-size: 14px;
        display: flex;
        justify-content: space-around;
        margin: 10px;

        i {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
        }
    }

    .invertercls {
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
    }

    .effect-box {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        width: 100%;
        height: calc(100% - 62px);
        overflow: auto;

        .effect-compare {
            height: calc(100% / 2);
            width: calc(100% / 3);
        }
    }

    .pat-title {
        margin-left: 16px;
        margin-top: 10px;

        .my-icon-red {
            cursor: pointer;
            text-align: center;
            width: 57px;
            height: 24px;
            display: inline-block;
            font-size: 14px;
            line-height: 23px;
            color: #ff2066;
            margin-left: 10px;
            background: url("../../assets/img/title-lines.png") no-repeat;
        }

        .my-icon-red.active {
            text-align: center;
            font-size: 14px;
            line-height: 23px;
            color: #82c2eb;
            text-align: center;
            width: 57px;
            height: 24px;
            margin-left: 10px;
            display: inline-block;
            background: url("../../assets/img/title-blue.png") no-repeat;
        }

        .my-icon-blue.active {
            cursor: pointer;
            font-size: 14px;
            line-height: 23px;
            color: #ff2066;
            text-align: center;
            margin-left: 10px;
            width: 57px;
            height: 24px;
            display: inline-block;
            background: url("../../assets/img/title-lines.png") no-repeat;
        }

        .my-icon-blue {
            cursor: pointer;
            text-align: center;
            color: #82c2eb;
            font-size: 14px;
            line-height: 23px;
            margin-left: 10px;
            width: 57px;
            height: 24px;
            // opacity: 0.5;

            display: inline-block;
            background: url("../../assets/img/title-blue.png") no-repeat;
        }
    }


</style>


  
