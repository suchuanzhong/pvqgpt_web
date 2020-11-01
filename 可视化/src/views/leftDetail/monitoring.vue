<template>
    <div class="arr">
        <div class="left-btn" @click="toggleLeft" :class="{hideLeft:hideLeft}"></div>
        <div class="right-btn" @click="toggleRight" v-if="showRightBtn" :class="{hideRight:hideRight}"></div>
        <div class="legend" :class="{hideRight:(hideRight||!showRightBtn)}" v-show="showlegend"></div>
        <div class="left-shadow">
        <div class="left-box">
            <div class="left-bg">
                <div class="seation">
                    <div style="cursor: pointer" @click="show720(resourceData[3].url)">
                        <Title title="当日运行功率" ></Title>
                    </div>
                    <div class="tabs pat-title">
                        <span v-for="(item,index) in tabMonit" :key="index" class="my-icon-blue"
                              :class="{active:item.bol}"
                              @click="tabChange(index+1)">{{item.name}}</span>
                    </div>
                    <EchartsLine
                            style="height:180px;width:100%;"
                            ids="blues" ref="power"
                            :yAxis="['MW']"
                            v-if="refredshd"
                            :data="dataAxis"
                    ></EchartsLine>

                </div>
                <div class="seation">
                    <div style="cursor: pointer" @click="show720(resourceData[4].url)">
                        <Title title="当日辐射量"></Title>
                    </div>
                    <div style="height:240px;width:100%;">
                        <EchartsBar style="height: 210px;"  :barWidth="8"
                                    :unit="['kW.h/m²']" ids="Data"
                                    ref="Bars" v-if="radio.length>0"
                                    :axisData="sunsData" :dataArr="radio"></EchartsBar>

                    </div>
                </div>
                <div class="seations" >
                    <div style="cursor: pointer" @click="show720(resourceData[5].url)">
                        <Title title="当日发电量及利用小时数"></Title>
                    </div>

                    <EchartsBar style="height: 300px;" :barWidth="8"
                                :unit="['万kW.h','h']" ids="leftData"
                                ref="DayRef"  :axisData="xAxisData"
                                :dataArr="barOneData"></EchartsBar>


                </div>

            </div>
        </div>

        <component
                :is="dialogName"
                :title="titleName"
                ids="dayBarMonit"
                :data="dataAxis"
                :axisData="xAxisData"
                :dataArr="barOneData"
                :DayEfficBar="radio"
                :sunsData="sunsData"
                :yearsDats="yearsDats"
        ></component>
        </div>
    </div>
</template>
<style scoped>
    .click {
        cursor: pointer;
    }
</style>
<script>
    import Title from "@/components/public/TitleName";
    import EchartsBar from "@/components/public/echarts/echartsBar";
    import EchartsLine from "@/components/public/echarts/echartLine";
    import DayEffic from "@/components/public/diao-EchartsBarday";
    import DayEfficBar from "@/components/public/dail-EfficBar";
    import DialogEcharts from  "@/components/public/dialog-echartsBarl";
    let time = null;
    export default {
        name: "Resources",
        data() {
            return {
                tabMonit:[{name:"1000MW",bol:true}, {name:"500MW",bol:false}],
                radio:[],
                sunsData:[],
                barOneData: [],
                xAxisData: [],
                titleName:'',
                dialogName:"",
                hideLeft: false,
                hideRight: false,
                showRightBtn: true,
                showlegend: false,
                refredshd:true,
                dataAxis:[],
                yearsDats:[],
                inverterdata: [],
                active: "",
                lineData:[]

            };
        },
        components: {
            Title,
            EchartsBar,
            EchartsLine ,
            DayEffic,
            DialogEcharts,
            DayEfficBar
        },
        mounted() {
            this.getJson();
            this.information();
            this.monitoring();
            this.DailyDose();
            this.titleName =this.tabMonit[0].name ;

        },
        beforeDestroy() {
          this.showlayer = true;
          //移除资源图层
          this.showResourceLayer();
          // this.$parent.$refs.map.showBaseInfo=false;
          //移除基地分布
          if (this.$parent.$refs.map && this.$parent.$refs.map.getViewer) {
            var viewer = this.$parent.$refs.map.getViewer();
            if (viewer) {
              clearDataSourcees(["base"], viewer);
            }
          }
        },
        methods: {
            //获取弹窗数据源
            getJson(){
                $.ajax({
                    url: 'json/data.json',
                    success: (res => {
                        this.resourceData =res.resourceData;
                        console.log( 'e',this.resourceData);
                    })
                })

            },
            //设置弹窗信息
            show720(dataObj) {
                console.log('g',dataObj);
                var data=[dataObj];
                try{
                    RESAFETY.callService(data)
                }catch (e) {
                    console.log('连接失败，cfg_system.run')
                }
            },

            //切换
            tabChange(val) {
                this.tabMonit.map((item,ids)=>{
                    if(ids+1==val){
                        item.bol= true
                        // this.titleName=item.name
                    }else{
                        item.bol= false
                    }
                })
                this.dataAxis=[];
                this.yearsDats= [];
                this.$nextTick(() => {
                    this.information(val)
                })
            },
            //当日辐射量
            DailyDose() {

                this.$axios.post("RunTheInformation/GetStentsStatistics").then(res => {
                    if (res.code == 1) {
                        if (res.data && res.data.length>0) {
                            let radioScale =res.data;
                            let seriesDatas = [
                                {
                                    name: "辐射量",
                                    type: "bar",
                                    data: []
                                }
                            ];
                            for (let item of radioScale) {
                                seriesDatas[0].data.push(item.value0)
                                this.sunsData.push(item.name)
                            }
                            this.radio=seriesDatas;

                            let dayEfficBar ={DayEfficBar:this.radio,sunsData:this.sunsData, ids:"dayBarMonit"}
                            console.log('3',dayEfficBar)
                            localStorage.setItem("dayEfficBar", JSON.stringify(dayEfficBar));

                            // this.$refs.radiation.setEcharts()
                        }
                    }
                });
            },
            //当日发电量及利用小时数
            monitoring() {
                this.$axios.post("RunTheInformation/GetBaseHours").then(res => {
                    if (res.code == 1) {
                        // if (res.data && res.data.length > 0) {
                        let recseDay = res.data;
                        let Datas = [
                            {
                                name: "发电量",
                                type: "bar",
                                data: []
                            },
                            {
                                name: "利用小时数",
                                type: "bar",
                                data: [],
                                yAxisIndex: 1
                            }
                        ];

                        for (let item of recseDay) {
                            this.xAxisData.push(item.baseName);
                            Datas[0].data.push(item.dayPower);
                            Datas[1].data.push(item.dayPowerh);
                        }
                        this.barOneData = Datas;
                        let dayNumberBar ={dataArr:this.barOneData,axisData:this.xAxisData, ids:"dayBarMonit"}
                        localStorage.setItem("dayNumberBar", JSON.stringify(dayNumberBar));
                        this.$nextTick(()=>{
                            this.$refs.DayRef.drawChart();
                        })
                    }
                    // }
                });
            },
            //当日运行功率
            information(type) {
                let Types=type|| '1'
                let dataLine={};
                this.refredshd=false
                this.$axios.post("/RunTheInformation/GetRunInformation?Type="+Types).then(res => {

                    if (res.code == 1) {
                        if(res.data&&res.data.length>0){
                        let ionData = res.data;

                        ionData.forEach(item => {
                            item['_data']=[];
                            item['_time']=[];
                            item.runInformation.forEach(item0 => {
                                item['_data'].push(item0.datavalue);
                                item['_time'].push(item0.dataTime);

                            })
                        })
                        dataLine={
                            series: [],
                            name: ionData[0].baseName,
                            dataAxis:[...new Set(ionData[0]._time)]||[],
                            unit: ''
                        };
                        this.intSeriseData(ionData,dataLine.series,0,false);
                        this.dataAxis=dataLine;
                        this.refredshd=true;
                    }

                        let dalogEcharts ={data:this.dataAxis, ids:"dayBarMonit"}
                        localStorage.setItem("dalogEcharts", JSON.stringify(dalogEcharts));
                    }
                });
            },
            intSeriseData(ionData,series,yIndex) {
                if (!ionData || ionData.length == 0) {
                    return;
                }
                ionData.forEach(item => {
                    series.push(
                        {
                            symbol: 'none',
                            symbolSize: 0,
                            name: item.baseName,
                            data: item._data||[],
                            type: 'line',
                            smooth: true,
                        }
                    )
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
            },
            showResourceLayer() {
              this.showlayer = !this.showlayer;
              if (this.$parent.$refs.map && this.$parent.$refs.map.showResourceLayer) {
                this.$parent.$refs.map.showResourceLayer(this.showlayer);
              }
              if (this.$parent.$refs.map && this.$parent.$refs.map.getViewer) {
                var viewer = this.$parent.$refs.map.getViewer();
                if (viewer) addBasePoint(this, viewer);
                if (this.showlayer)
                  viewer.scene.camera.flyTo({
                    destination: {
                      x: -3719914.7214529333,
                      y: 9923008.103096997,
                      z: 2961333.5440157317
                    },
                    orientation: {
                      pitch: -1.210401948634264,
                      heading: 6.202436309227091,
                      roll: 6.283185307179586
                    }
                  });
              }
            },
            OpenmonitorMap() {
              //执行事件
              clearTimeout(time);
              time = setTimeout(() => {
                this.oprationMapServer(this.effctData.运行监测.调用能效比和光源点);
                this.oprationMapServer(this.effctData.运行监测.调用省份颜色);
              }, 300);
            },
            ClosemonitorMap() {
              clearTimeout(time);
              //执行事件
              this.oprationMapServer(this.effctData.运行监测.关闭能效比和光源点);
              this.oprationMapServer(this.effctData.运行监测.关闭省份颜色);
            },
            oprationMapServer(data) {
              try {
                RESAFETY.callService(data);
              } catch (e) {
                console.log(e);
              }
            },
            getEffctData() {
              $.ajax({
                url: "json/3D_effect.json",
                async: false,
                type: "get",
                dataType: "json",
                success: res => {
                  this.effctData = res;
                }
              });
            }
        }
    };
</script>
<style lang="scss" scoped>

    .pat-title {
        width: 100%;
        margin-left: 16px;
        margin-top: 10px;

        /*.my-icon-red {*/
        /*    cursor: pointer;*/
        /*     background-size: 100% 100%;*/
        /*    padding: 0 5px;*/
        /*    !*text-align: center;*!*/
        /*    !*display: inline-block;*!*/
        /*    font-size: 14px;*/
        /*    line-height: 23px;*/
        /*    color: #ff2066;*/
        /*    background: url("/img/title-lines.png") center no-repeat;*/
        /*}*/

        /*.my-icon-red.active {*/
        /*    background-size: 100% 100% !important;*/
        /*    padding-left: 6px;*/
        /*    padding-right: 6px;*/
        /*    font-size: 14px;*/
        /*    text-align: center;*/
        /*    line-height: 23px;*/
        /*    color: #82c2eb;*/
        /*    margin-left: 10px;*/
        /*    display: inline-block;*/
        /*    background: url("/img/title-blue.png")center  no-repeat;*/
        /*}*/

        .my-icon-blue.active {
            background-size: 100% 100% !important;
            padding-left: 6px;
            padding-right: 6px;
            cursor: pointer;
            text-align: center;
            font-size: 14px;
            line-height: 23px;
            color: #ff2066;
            margin-left: 10px;
            /*display: inline-block;*/
            background: url("../../assets/img/title-lines.png") center no-repeat;
        }
        .my-icon-blue {
            background-size: 100% 100% !important;
            padding-left: 6px;
            padding-right: 6px;
            text-align: center;
            cursor: pointer;
            color: #82c2eb;
            font-size: 14px;
            line-height: 23px;
            margin-left: 10px;
            display: inline-block;
            background: url("../../assets/img/title-blue.png")center no-repeat;
        }
    }
    .infoCursor {
        cursor: pointer;
    }
</style>
