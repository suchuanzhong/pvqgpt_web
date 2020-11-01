<template>
    <div class="arrs">
        <div class="left-btn" @click="toggleLeft"  :class="{hideRight:(hideRight||!showRightBtn)}" v-show="showlegend"></div>
        <div class="right-btn" @click="toggleRight" v-if="showRightBtn" :class="{hideRight:hideRight}">
        </div>
        <div class="legend" :class="{hideRight:(hideRight||!showRightBtn)}" v-show="showlegend">
        </div>
        <div class="right-shadow">
        <div class="right-box" >

               <div class="right-bg">
                   <div class="seation">
                       <div style="cursor: pointer" @click="show720(resourceData[0].url)">
                           <Title title="光资源" ></Title>
                       </div>
                       <div class="tabs pat-title">
                            <span v-for="(item,index) in technologyTabs"
                                  :key="index" class="my-icon-blue"
                                  :class="{active:item.bol}"
                                  @click="technologyTab(item.name)">{{item.name}}</span>
                       </div>
                       <echartsBar
                               :barWidth="8" style="height:180px;"
                               :unit="['kW.h/m²']"
                               ref="doubleBase"
                               ids="baseData"
                               :dataArr=" barDataArr"
                               :axisData="xAxisDataArr"
                       ></echartsBar>
                   </div>
                   <div class="seation" >
                       <div  style="cursor: pointer"  @click="EconomicShow()">
                           <Title title="经济效益"></Title>
                       </div>
                       <div class="tabs pat-title">
                            <span v-for="(item,index) in tabMonit"
                                  :key="index" class="my-icon-blue"
                                  :class="{active:item.bol}"
                                  @click="tabChange(item.name)">{{item.name}}</span>
                       </div>

                       <echartsBarLead
                               :barWidth="8"
                               style="height: 180px;"
                               :unit="['亿kW.h','亿']"
                               ids="leftData" ref="doubleBarRef"
                               :axisData="xAxisData"  :dataArr="barOneData">

                       </echartsBarLead>
                   </div>


                   <div class="seations">
                       <Title title="光伏+" ></Title>

                       <div class="list">
                           <el-carousel :interval="5000" arrow="hover">
                               <el-carousel-item v-for="(item,index) in navlist" :key="index" >
                                   <div style="cursor: pointer"  @click="openUrl(index)">
                                       <div class="seku" ><span class="se-name">{{item.baseName}}</span></div>
                                       <img :src="item.filePath" />
                                   </div>
                               </el-carousel-item>
                           </el-carousel>
                       </div>

                   </div>

               </div>
           </div>


        <component
        :is="dialogName"
        :title="titleName"
        :data="tableList"
        ids="recseBar"
        :panoramaUrl="Url"
        :dataArr=" barDataArr"
        :axisData="xAxisDataArr"
        />
        </div>
    </div>
</template>
<style scoped>
    .click{
        cursor: pointer;
    }
</style>
<script>
    import echartsParity from '@/components/public/echartsParity'
    import Title from '@/components/public/TitleName'
    import echartsBarLead from "@/components/public/echarts/echartsBarLead";
    import echartsBar from "@/components/public/echarts/echartsBar";
    import DayEffic from "@/components/public/EfficBar";
    import MyTable from '@/components/public/MyTable'
    import DialogEfficBar from '@/components/public/EfficBar'
    import TableEconomic from '@/components/public/Economic'
    import Photovoltaic from '@/components/public/Photovoltaic'
    export default {
        name:"Resources",
        data(){
            return{
                Url:'',
                tabMonit:[
                    { name: "一类资源区",  bol: true },
                    { name: "二类资源区",  bol: false },
                    { name: "三类资源区", bol: false }],
                technologyTabs:[
                    { name: "一类资源区",  bol: true },
                    { name: "二类资源区",  bol: false },
                    { name: "三类资源区", bol: false }],
                dialogName:"",
                hideLeft:false,
                hideRight:false,
                showRightBtn:true,
                showlegend:false,
                barDataArr:[],
                titleName:'',
                xAxisDataArr:[],
                navlist:[],
                barOneData:[],
                effctData: [],
                barTwoData:[],
                xAxisData:[],
                active: "",
                tableList:[{}],
                showlayer:false,
                resourceData:[],
                routeQuery:{},
            }
        },
        components:{
            Title,echartsBarLead,
            echartsBar,
            MyTable,echartsParity,
            DialogEfficBar,
            TableEconomic,
            Photovoltaic ,
            DayEffic
        },
        mounted() {
            this.gfData();
            this.enterprise("一类资源区");
            this.performance("一类资源区");
            this.titleName =this.technologyTabs[0].name ;
            this.getJson();
            // this.EconomicShow()
        },
        // beforeDestroy () {
        //     this.showlayer=true;
        //     //移除资源图层
        //     this.showResourceLayer();
        //     // this.$parent.$refs.map.showBaseInfo=false;
        //     //移除基地分布
        //     if (this.$parent.$refs.map && this.$parent.$refs.map.getViewer) {
        //         var viewer= this.$parent.$refs.map.getViewer();
        //         if(viewer){
        //             clearDataSourcees(["base"],viewer);
        //         }
        //     };
        // },
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
            //光资源更多数据查看
            resourceChange(){
                this.dialogName='DayEffic' ;
                // this.titleName= "光资源";
            },
            //光伏全景图
            openUrl(index){

                // this.dialogName = "Photovoltaic";
                this.titleName = this.navlist[index].baseName;
                this.Url= this.navlist[index].panorama;
                this.show720(this.resourceData[2].url)
                let photovoltaic ={photovoltaic:this.navlist[index].panorama,titleName:this.navlist[index].baseName,  ids:"recseBar"}
                localStorage.setItem("photovoltaic", JSON.stringify(photovoltaic));
            },
            //光资源切换
            technologyTab(name){
                this.technologyTabs.map(item=>{
                    if (item.name==name){
                        item.bol = true;
                        this.titleName=item.name;
                    }  else {
                        item.bol = false;
                    }
                });
                this.$nextTick(()=>{
                    this.barDataArr=[];
                    this.xAxisDataArr=[];
                    this.enterprise(name)
                })
            } ,

            //经济效益切换
            tabChange(vals){
              this.tabMonit.map(item=>{
                  if (item.name==vals){
                      item.bol = true;
                  }  else {
                      item.bol = false;
                  }
              });

              this.$nextTick(()=>{
                  this.barDataArr=[];
                  this.xAxisDataArr=[];
                  // this.tableList=[];
                  this.performance(vals)
                  // this.EconomicShow();
              })
            },
           //经济效益表格
            EconomicShow(){

                this.$axios.post( "/LeadingBaseControll/GetBenefitsForm").then(res => {
                    this.tableList = res.data

                    let tableEconomic ={data:this.tableList, ids:"recseBar"}
                    console.log('biaoge',tableEconomic)
                    localStorage.setItem("tableEconomic", JSON.stringify(tableEconomic));
                    this.show720(this.resourceData[1].url)

                })
            },
           
            getEffctData() {
                $.ajax({
                    url: "json/3D_effect.json",
                    async: false,
                    type: "get",
                    dataType: "json",
                    success: res => {
                        this.effctData = res;
                        // this.initEffect();
                    }
                });
              
            },
            loadfdlxss() {
                clearTimeout(time);
                time = setTimeout(() => {
                    this.oprationMapServer(this.effctData.领跑基地.光资源调用);
                }, 300);
            },
            Closefdlxss() {
                clearTimeout(time);
                this.oprationMapServer(this.effctData.领跑基地.光资源关闭);
            },
            oprationMapServer(data) {
                try {
                    RESAFETY.callService(data);
                } catch (e) {
                    console.log(e);
                }
            },
            //光资源
            enterprise(names) {
                this.$axios.post("/LeadingBaseControll/GetRadiation").then(res => {
                    if (res.code == 1) {
                        // if (res.data && res.data.length > 0) {
                            let recieveData = res.data;
                            let seriesDatas = [
                                 {
                                    name: "辐射量",
                                    type: "bar",
                                    data: [],
                                }
                            ];
                            for (let item of recieveData) {
                                if(item.statisticsName==names){
                                    this.xAxisDataArr.length=0;
                                // let radiation=0;
                                // let baseName=0;
                                for(let item2 of item.radiationLst){
                                    this.xAxisDataArr.push(item2.baseName);
                                    // radiation+= item2.radiation;
                                    // baseName+= item2.baseName;
                                    seriesDatas[0].data.push(item2.radiation);
                                }

                                }
                            }

                            this.barDataArr = seriesDatas;

                            let dayEffic ={dataArr:this.barDataArr,axisData:this.xAxisDataArr, ids:"recseBar"}
                            localStorage.setItem("dayEffic", JSON.stringify(dayEffic))
                            this.$nextTick(()=>{
                                this.$refs.doubleBase.drawChart();
                            })
                        }
                    // }
                });
            },
            //经济效益
            performance(val){
              
                this.$axios.post("/LeadingBaseControll/GetBenefits ").then(res => {
                    if (res.code == 1) {
                            let Data = res.data;
                            let seDatas = [
                                {
                                    name: "年发电量",
                                    type: "bar",
                                    data: []
                                },
                                {
                                    name: "年产值",
                                    type: "bar",
                                    data: [],
                                    yAxisIndex:1
                                }
                            ];
                            for(let item of Data){
                                if(item.statisticsName==val) {
                                    this.xAxisData.length=0;
                                 // this.xAxisData.push(item.statisticsName);
                                let annualOutput=0;
                                let outputValue=0;
                                for(let item2 of item.benefitsLst){

                                    this.xAxisData.push(item2.baseName);
                                    annualOutput+= item2.annualOutput;
                                    outputValue+= item2.outputValue;
                                    seDatas[0].data.push(annualOutput);
                                    seDatas[1].data.push(outputValue);
                                }


                            }
                            }
                            this.barOneData=seDatas;
                             // this.EconomicShow()
                            this.$nextTick(()=>{
                                this.$refs.doubleBarRef.drawChart();
                            })


                }

                });
            },

            //光伏+
            gfData(){
                this.$axios.post("LeadingBaseControll/GetLightComplementary").then(res => {
                    if (res.code == 1) {
                        if (res.data && res.data.length > 0) {
                            this.navlist = res.data;
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
           
            showlegends(show){
                this.showlegend=show;
            },
            changeposition(text){
                this.position=text;
            },
            showResourceLayer() {
                this.showlayer=!this.showlayer;
                if(this.$parent.$refs.map&&this.$parent.$refs.map.showResourceLayer){
                    this.$parent.$refs.map.showResourceLayer(this.showlayer);
                };
                if (this.$parent.$refs.map && this.$parent.$refs.map.getViewer) {
                    var viewer= this.$parent.$refs.map.getViewer();
                    if(viewer)
                        addBasePoint(this, viewer);
                    if(this.showlayer)
                        viewer.scene.camera.flyTo({"destination":{"x":-3719914.7214529333,"y":9923008.103096997,"z":2961333.5440157317},
                            "orientation":{"pitch":-1.210401948634264,"heading":6.202436309227091,"roll":6.283185307179586}});
                };
            }
        },
    }
</script>
<style lang="scss" scoped>
    .dialogBj{

        .el-dialog__title{
            color: #fff;
        }
        .el-dialog{
            background-color: rgba(0,0,0,0.1);
            background: url('../../assets/img/bg1_03.png') no-repeat;
            background-size: 100%;
        }
        .barHeight {
            height: 180px;
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

    }
    .st-tlit{
        margin-left: 42px;
        margin-top: 20px;
    }
    .lest{
        text-align: left;
        .my-icon-left{
            width: 32px;
            height: 6px;
            display: inline-block;
            background: url('../../assets/img/left-line.png')no-repeat;
        }
        .stat-name{
            font-family: PingFang-SC-Medium;
            font-size: 16px;
            line-height: 24px;
            color: #dcf4ff;
            padding: 0 10px;
        }
        .my-icon-right{
            width: 32px;
            height: 6px;
            display: inline-block;
            background: url('../../assets/img/right-line.png')no-repeat;

        }
    }
    .rest{
        margin-left: 32px;
        text-align: right;
        .my-icon-left{
            width: 32px;
            height: 6px;
            display: inline-block;
            background: url('../../assets/img/left-line.png')no-repeat;
        }
        .stat-name{
            font-family: PingFang-SC-Medium;
            font-size: 16px;
            line-height: 24px;
            color: #dcf4ff;
            padding: 0 10px;
        }
        .my-icon-right{
            width: 32px;
            height: 6px;
            display: inline-block;
            background: url('../../assets/img/right-line.png')no-repeat;

        }
    }
    .seku{
        text-align: center;
        margin: 20px 0 8px 0px;
        width: 358px;
        height: 36px;
        background-color: #005886;
        border: solid 1px #0083c7;
        opacity: 0.5;
    }
    .se-name{
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        font-weight: normal;
        font-style: italic;
        font-stretch: normal;
        line-height: 32px;
        letter-spacing: 0px;
        color: #82c2eb;
    }

    .list{
        z-index: 9999;
        width: 358px;
        /*height: 212px;*/
        margin-left: 16px;
        .el-carousel__container {
            position: relative;
            height: 212px !important;
        }

    }

    .el-carousel__item img {
        width: 358px;
        height: 212px;
        color: #475669;
        font-size: 18px;

    }
    .pat-title {
        width: 100%;
        margin-left: 16px;
        margin-top: 10px;
        

        .my-icon-red.active {
            text-align: center;
            font-size: 14px;
            line-height: 23px;
            color: #82c2eb;
            background-size: 100% 100% !important;
            padding-left: 6px;
            padding-right: 6px;
            margin-left: 10px;
            display: inline-block;
            background: url("../../assets/img/title-blue.png") no-repeat;
        }

        .my-icon-blue.active {
            cursor: pointer;
            font-size: 14px;
            line-height: 23px;
            color: #ff2066;
            /*width: 100%;*/
            text-align: center;
            background-size: 100% 100% !important;
            padding-left: 6px;
            padding-right: 6px;
            margin-left: 10px;
            display: inline-block;
            background: url("../../assets/img/title-lines.png") no-repeat;
        }
        .my-icon-blue {
            cursor: pointer;
            text-align: center;
            color: #82c2eb;
            font-size: 14px;
            line-height: 23px;
            background-size: 100% 100% !important;
            padding-left: 6px;
            padding-right: 6px;
            margin-left: 10px;
            display: inline-block;
            background: url("../../assets/img/title-blue.png") no-repeat;
        }
    }
    .infoCursor {
        cursor: pointer;
    }

</style>
