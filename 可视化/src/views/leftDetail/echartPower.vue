<template>
    <div class="arrs">
        <div class="echartCailbration"></div>
        <ul class="cailbration-box">
            <li class="my-icon-blues">
                <div class="cailbration-colors">组件发展趋势分析</div>
            </li>
            <li v-for="(item,index) in tableList" :key="index"
                :class="{active :actType==index,'my-icon-blue':item.css1,'my-icon-red':!item.css1}">
                <div class="cailbration-color" @click="tablistChange(index)" @dblclick="CloseRunMap(index)">
                    {{item.title}}
                </div>
                <div class="more" @click="moreChange(index)"></div>
            </li>
        </ul>
        <component
                :is="dialogName"
                :title="titleName"
                ids="barCail"
                :dataArr="dataAxis"
                :axisData="subData"
                :stents="OneData"
                :Years="xAData"
                :datanalysis="stical"
                :yearsData="tanData"
                :Componentprice="singprice"
                :priceData="yearsData"
                :dataAccounted="TwoData"
                :axisyearsData="yearsAnalyData"
                :Conversion="monitorSeries"
                :efficiency="monitorAxisData"

        ></component>
    </div>
</template>
<style scoped>
    .click {
        cursor: pointer;
    }
</style>
<script>
    import Title from "@/components/public/TitleName";
    import echartsParity from "@/components/public/dialog-ConversionEfficiency";
    import ComponentDevelopment from "@/components/public/dialog-ComponentDevelopment";
    import Accounted from "@/components/public/dialog-Accounted";
    import echartAnaly from "@/components/public/dialog-EchartAnaly";
    import ComponentMain from "@/components/public/echarts/ComponentMain";
    import InverterAnalysis from "@/components/public/dialog-InverterAnalysis"
    import Electricity from "@/components/public/dialog-Electricity"
    import EnergyEffiMore from "@/components/public/dialog-EnergyEffiMore"
    import BenefitMore from "@/components/public/dialog-BenefitMore"

    let time = null;

    export default {
        name: "Resources",
        data() {
            return {
                tableList: [
                    // {title:'',value:0,css1:false,titledatas:""},
                    {title: '组件价格趋势分析', value: 0, css1: false, titledatas: "组件价格趋势分析专题图"},
                    {title: '组件占比趋势分析', value: 1, css1: false, titledatas: "组件占比趋势分析专题图"},
                    {title: '组件转换趋势分析', value: 2, css1: false, titledatas: "组件转换趋势分析专题图"},
                    {title: '逆变器分析', value: 3, css1: true, titledatas: "逆变器分析专题图"},
                    {title: '支架分析', value: 4, css1: true, titledatas: "支架分析专题图"},
                    {title: '发电能效分析', value: 5, css1: true, titledatas: "发电能效分析专题图"},
                    {title: '成本分析', value: 6, css1: true, titledatas: "成本分析专题图"}

                ],
                actType: 0,
                lpjsData: [],
                lpjsyear: [],
                OneData: [],
                singprice: [],
                yearsData: [],
                xAData: [],
                titleName: '',
                dialogName: "",
                stical: [],
                axisData: [],
                tableData: [],
                tableCol: [],
                hideLeft: false,
                hideRight: false,
                showRightBtn: true,
                showlegend: false,
                dataAxis: [],
                subData: [],
                tanData: [],
                showlayer: false,
                monitorSeries: [],
                monitorAxisData: [],
                monitorFlag: true,
                baseOption: [],//基地数组
                baseName: '',//基地名称
                TwoData: '',
                yearsAnalyData: [],
                is_table: false,
                isShowHighLight: false,
                checkYear: null,
                titleData: [],

            };
        },
        components: {
            Title,
            echartAnaly,
            ComponentDevelopment,
            Accounted,
            echartsParity,
            ComponentMain,
            InverterAnalysis,
            Electricity,
            EnergyEffiMore,
            BenefitMore
        },


        mounted() {
            let yearNum = this.$route.query.yearnum;
            //通过url检查是否传值
            if (yearNum != null && yearNum != "") {
                this.isShowHighLight = true;
                this.checkYear = yearNum;
            }
            this.getJson();
            this.getEffctData();
        },

        methods: {
            //更多
            moreChange(val) {
                console.log('23', val)
                switch (val) {
                    case 0:
                    case 1:
                    case 2:
                        this.statistical(val);
                        break;
                    case 3:
                        // this.is_table=true;
                        this.Internet();
                        break;
                    case 4:
                        // this.is_table=true;
                        this.Electricity();
                        break;
                    case 5:
                        // this.is_table=true;
                        this.GenerebrgMoREchang();
                        break;
                    case 6:
                        // this.is_table=true;
                        this.Electricityprice();
                        break;
                }
            },
            //切换
            tablistChange(val) {
                this.CloseRunMapsss();
                this.is_table = false;
                this.actType = val;
                localStorage.setItem("val", val)
                let yearnum = localStorage.getItem("timeYear");
                switch (val) {
                    case 0:
                        clearTimeout(time);
                        time = setTimeout(() => {

                            if(parseInt(yearnum) == 2015){
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析组件价格第一批);

                            }else if(parseInt(yearnum) == 2016){
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析组件价格第二批);

                            }else{
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析组件价格);
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析基地名称);

                            }
                            this.initTitleData(val)
                        }, 300);

                        break;
                    case 1:
                        clearTimeout(time);
                        time = setTimeout(() => {
                            if(parseInt(yearnum) == 2015){
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析占比第一批);
                                // this.initTitleData(val,"第一批")
                            }else if(parseInt(yearnum) == 2016){
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析占比第二批);
                                // this.initTitleData(val,"第二批")
                            }else{
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析占比);
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析饼图基地名称);
                            }
                            this.initTitleData(val)
                        }, 300);

                        break;
                    case 2:
                        // this.statistical() ;
                        clearTimeout(time);
                        time = setTimeout(() => {
                            if(parseInt(yearnum) == 2015){
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析转换效率第一批);
                            }else if(parseInt(yearnum) == 2016){
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析转换效率第二批);
                            }else{
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析转换效率);
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析基地名称);
                            }

                            this.initTitleData(val)

                        }, 300);
                        break;
                    case 3:

                        // this.Internet();
                        clearTimeout(time);
                        time = setTimeout(() => {
                            if(parseInt(yearnum) == 2015){
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析逆变器分析第一批);
                            }else if(parseInt(yearnum) == 2016){
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析逆变器分析第二批);
                            }else{
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析逆变器分析);
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析饼图基地名称);
                            }
                            this.initTitleData(val)
                        }, 300);
                        break;
                    case 4:
                        // this.Electricity();
                        clearTimeout(time);
                        time = setTimeout(() => {
                            if(parseInt(yearnum) == 2015){
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析支架分析第一批);
                            }else if(parseInt(yearnum) == 2016){
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析支架分析第二批);
                            }else{
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析支架分析);
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析饼图基地名称);
                            }
                            this.initTitleData(val)


                        }, 300);
                        break;
                    case 5:
                        // this.Generationchang();
                        clearTimeout(time);
                        time = setTimeout(() => {
                                this.oprationMapServer(this.effctData.领跑基地.光资源调用);
                            if(parseInt(yearnum) == 2015){
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析发电能效分析第一批);
                            }else if(parseInt(yearnum) == 2016){
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析发电能效分析第二批);
                            }else{
                            
                                this.oprationMapServer(this.effctData.运行监测.调用能效比和光源点);
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析基地名称);

                            }
                            this.initTitleData(val)

                        }, 300);
                        break;
                    case 6:
                        // this.Electricityprice();
                        clearTimeout(time);
                        time = setTimeout(() => {
                            if(parseInt(yearnum) == 2015){
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析成本分析第一批);
                            }else if(parseInt(yearnum) == 2016){
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析成本分析第二批);
                            }else{
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析成本分析);
                                this.oprationMapServer(this.effctData.综合分析.调用综合分析基地名称);
                            }
                            this.initTitleData(val)
                        }, 300);
                        break;


                }

            },
            //获取弹窗数据源
            getJson() {
                $.ajax({
                    url: 'json/data.json',
                    success: (res => {
                        this.resourceData = res.resourceData;
                        console.log(this.resourceData);
                    })
                })

            },

            //设置弹窗信息
            show720(dataObj) {
                // console.log('g',dataObj);
                var data = [dataObj];
                try {
                    RESAFETY.callService(data)
                } catch (e) {
                    console.log('连接失败，cfg_system.run')
                }
            },

            //发电量更多
            GenerebrgMoREchang() {
                let _this = this;
                _this.show720(_this.resourceData[12].url)
                console.log('w', _this.show720(_this.resourceData[12].url));
            },
            //组件统计
            statistical(val,year) {

               // let years= localStorage.getItem("timeYear").substring(0,4)
                this.$axios.post("/ComprehensiveAnalysis/GetComponentStatistics").then(res => {
                    if (res.code == 1) {
                        if (res.data) {
                            let recData = res.data;
                            this.titleData = res.data;
                            let seriesDatas = [
                                {
                                    name: "单晶硅",
                                    type: "bar",
                                    data: [],
                                    yAxisIndex: 0
                                },
                                {
                                    name: "多晶硅",
                                    type: "bar",
                                    data: []
                                }
                            ];
                            this.yearsData = []

                            for (let item of recData) {
                                this.yearsData.push(item.years);
                                seriesDatas[0].data.push(item.singlePrice);
                                seriesDatas[1].data.push(item.morePrice);
                            }
                            this.singprice = seriesDatas;
                            // let EchartAnaly ={Componentprice:this.singprice,priceData:this.yearsData, ids:"barCail"}
                            //
                            // localStorage.setItem("EchartAnaly", JSON.stringify(EchartAnaly))
                            // this.show720(this.resourceData[8].url);
                            let ComponentMore = {
                                Componentprice: this.singprice,
                                priceData: this.yearsData,
                                ids: "barCail"
                            }
                            localStorage.setItem("ComponentMore", JSON.stringify(ComponentMore))
                            if (val == 0) this.show720(this.resourceData[7].url);

                            let recieveData = [{
                                name: "单晶硅",
                                type: "bar",
                                data: [],
                                yAxisIndex: 0
                            },
                                {
                                    name: "多晶硅",
                                    type: "bar",
                                    data: []
                                }];
                            this.yearsAnalyData = []
                            for (let item1 of recData) {
                                this.yearsAnalyData.push(item1.years);
                                recieveData[0].data.push(item1.singleAccountedfor);
                                recieveData[1].data.push(item1.moreAccountedfor);
                            }

                            this.TwoData = recieveData;
                            // let Accounted = {dataAccounted: this.TwoData,axisyearsData: this.yearsAnalyData, ids: "barCail"}
                            // localStorage.setItem("Accounted", JSON.stringify(Accounted))
                            // this.show720(this.resourceData[9].url) ;
                            let AccountedMore = {
                                dataAccounted: this.TwoData,
                                axisyearsData: this.yearsAnalyData,
                                ids: "barCail"
                            }
                            localStorage.setItem("AccountedMore", JSON.stringify(AccountedMore))
                            if (val == 1)
                                this.show720(this.resourceData[8].url);
                            let evalList = [{
                                name: "单晶硅",
                                type: "bar",
                                data: [],
                                yAxisIndex: 0
                            },
                                {
                                    name: "多晶硅",
                                    type: "bar",
                                    data: []
                                }

                            ];
                            this.monitorAxisData = [];
                            for (let item2 of recData) {
                                this.monitorAxisData.push(item2.years);
                                evalList[0].data.push(item2.singleAccountedfor);
                                evalList[1].data.push(item2.moreAccountedfor);
                            }

                            this.monitorSeries = evalList;
                            let ConversionMore = {
                                Conversion: this.monitorSeries,
                                efficiency: this.monitorAxisData,
                                ids: "barCail"
                            }
                            localStorage.setItem("ConversionMore", JSON.stringify(ConversionMore))
                            if (val == 2) this.show720(this.resourceData[9].url);
                        }
                    }
                });
            },
            //支架分析
            Electricity(year) {
                // let years= localStorage.getItem("timeYear").substring(0,4)
                this.$axios.post("/ComprehensiveAnalysis/GetStentsStatistics").then(res => {
                    if (res.code == 1) {
                        if (res.data) {
                            let recData = res.data;
                            let seriesDatas = [
                                {
                                    name: "固定式",
                                    type: "bar",
                                    data: [],
                                    yAxisIndex: 0
                                },
                                {
                                    name: "跟踪式",
                                    type: "bar",
                                    data: []
                                }
                            ];
                            this.xAData = [];
                            for (let item of recData) {
                                this.xAData.push(item.years);
                                seriesDatas[0].data.push(item.trackingAccountedFor);
                                seriesDatas[1].data.push(item.fixedAccountedFor);
                            }
                            this.OneData = seriesDatas;
                            let ElectricityMore = {stents: this.OneData, Years: this.xAData, ids: "barCail"}
                            localStorage.setItem("ElectricityMore", JSON.stringify(ElectricityMore))
                            this.show720(this.resourceData[11].url)

                        }
                    }
                });

            },
            //成本分析
            Electricityprice(year) {
                // let years= localStorage.getItem("timeYear").substring(0,4)
                this.$axios.post("/ComprehensiveAnalysis/GetLCOEanalysis").then(res => {
                    if (res.code == 1) {
                        if (res.data) {
                            this.dataAxis = [];
                            this.subData = [];
                            let dataArrs = res.data;
                            let seriesDatas = [
                                {
                                    name: "度电成本",
                                    type: "bar",
                                    data: [],
                                },
                            ];
                            for (let item of dataArrs) {
                                this.subData.push(item.baseName);
                                console.log('jidi', this.subData)
                                seriesDatas[0].data.push(item.kwhCost)
                            }
                            this.dataAxis = seriesDatas
                            let BenefitMore = {dataArr: this.dataAxis, axisData: this.subData, ids: "barCail"}
                            localStorage.setItem("BenefitMore", JSON.stringify(BenefitMore))
                            this.show720(this.resourceData[13].url)

                        }
                    }
                });
            },
            //逆变器
            Internet(year) {
                // let years= localStorage.getItem("timeYear").substring(0,4)
                this.$axios.post("/ComprehensiveAnalysis/GetInverter").then(res => {
                    if (res.code == 1) {
                        if (res.data) {
                            let Data = res.data;
                            let seriesInvert = [
                                {
                                    name: "组串式",
                                    type: "bar",
                                    data: [],
                                    yAxisIndex: 0
                                },
                                {
                                    name: "集中式",
                                    type: "bar",
                                    data: []
                                },
                                {
                                    name: "集散式",
                                    type: "bar",
                                    data: []
                                }
                            ];
                            this.tanData = [];
                            for (let item of Data) {
                                this.tanData.push(item.years);
                                seriesInvert[0].data.push(item.groupStringThan);
                                seriesInvert[1].data.push(item.concentratedThan);
                                seriesInvert[2].data.push(item.distributionThan);
                            }
                            this.stical = seriesInvert;
                            let InverterMore = {datanalysis: this.stical, yearsData: this.tanData, ids: "barCail"}
                            localStorage.setItem("InverterMore", JSON.stringify(InverterMore))
                            this.show720(this.resourceData[10].url)

                        }

                    }
                });


            },
            toggleLeft() {
                this.hideLeft = !this.hideLeft;
                $(".left-box").toggleClass("hideContentLeft");
            },
            toggleRight() {
                this.hideRight = !this.hideRight;
                $(".right-box").toggleClass("hideContentRight");
            },
            showlegends(show) {
                this.showlegend = show;
            },
            changeposition(text) {
                this.position = text;
            },
            initTitleData(i) {

                let that = this
                let obj = {
                    titleText: this.tableList[i].titledatas,
                }
                    util3D.closeyemian("顶部标题");
                    localStorage.setItem("titledata", JSON.stringify(obj))

                    util3D.opHtmlBatch(parseInt("202008151551"), "顶部标题")
                    util3D.opHtmlBatchSend();
                    console.log("obj", obj)
                let index=localStorage.getItem("index")
                // let val = localStorage.setItem("val")
                switch (index) {
                    case 0:
                        clearTimeout(time);
                        time = setTimeout(() => {
                            if(parseInt(yearnum) == 2015){

                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-组件价格-第一批"
                                }]);

                            }else if(parseInt(yearnum) == 2016){

                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-组件价格-第二批"
                                }]);

                            }else{
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-组件价格"
                                }]);
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-能效比-点光源-基地名称"
                                }]);
                                //that.oprationMapServer(this.effctData.综合分析.调用综合分析组件价格);
                                //that.oprationMapServer(this.effctData.综合分析.调用综合分析基地名称);

                            }
                        }, 300);

                        break;
                    case 1:
                        clearTimeout(time);
                        time = setTimeout(() => {
                            if(parseInt(yearnum) == 2015){
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-占比-第一批"
                                }]);
                            }else if(parseInt(yearnum) == 2016){
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-占比-第二批"
                                }]);
                            }else{
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-占比"
                                }]);
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-饼图-各基地名称"
                                }]);
                                //that.oprationMapServer(this.effctData.综合分析.调用综合分析占比);
                                //that.oprationMapServer(this.effctData.综合分析.调用综合分析饼图基地名称);
                            }

                        }, 300);

                        break;
                    case 2:
                        // this.statistical() ;
                        clearTimeout(time);
                        time = setTimeout(() => {
                            if(parseInt(yearnum) == 2015){
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-转换效率-第一批"
                                }]);
                            }else if(parseInt(yearnum) == 2016){
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-转换效率-第二批"
                                }]);
                            }else{
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-转换效率"
                                }]);
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-能效比-点光源-基地名称"
                                }]);
                                //that.oprationMapServer(this.effctData.综合分析.调用综合分析转换效率);
                                //that.oprationMapServer(this.effctData.综合分析.调用综合分析基地名称);
                            }

                        }, 300);
                        break;
                    case 3:

                        // this.Internet();
                        clearTimeout(time);
                        time = setTimeout(() => {
                            if(parseInt(yearnum) == 2015){
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-逆变器分析-第一批"
                                }]);
                            }else if(parseInt(yearnum) == 2016){
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-逆变器分析-第二批"
                                }]);
                            }else{
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-逆变器分析"
                                }]);
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-能效比-点光源-基地名称"
                                }]);
                                //that.oprationMapServer(this.effctData.综合分析.调用综合分析逆变器分析);
                                //that.oprationMapServer(this.effctData.综合分析.调用综合分析饼图基地名称);
                            }
                        }, 300);
                        break;
                    case 4:
                        clearTimeout(time);
                        time = setTimeout(() => {
                            if(parseInt(yearnum) == 2015){
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-支架分析-第一批"
                                }])
                            }else if(parseInt(yearnum) == 2016){
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-支架分析-第二批"
                                }])
                            }else{
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-支架分析"
                                }])
                            }
                        }, 300);
                        break;
                    case 5:
                        clearTimeout(time);
                        time = setTimeout(() => {
                            if(parseInt(yearnum) == 2015){
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-发电能效分析-第一批"
                                }])
                            }else if(parseInt(yearnum) == 2016){
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-发电能效分析-第二批"
                                }])
                            }else{
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-光资源"
                                }])
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-能效比-点光源"
                                }])
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-能效比-点光源-基地名称"
                                }])
                                //that.oprationMapServer(this.effctData.领跑基地.光资源调用);
                                //that.oprationMapServer(this.effctData.运行监测.调用能效比和光源点);
                                //that.oprationMapServer(this.effctData.统计分析.调用统计分析基地名称);

                            }

                        }, 300);
                        break;
                    case 6:
                        // this.Electricityprice();
                        clearTimeout(time);
                        time = setTimeout(() => {
                            if(parseInt(yearnum) == 2015){
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-成本分析-第一批"
                                }])
                            }else if(parseInt(yearnum) == 2016){
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-成本分析-第二批"
                                }])
                            }else{
                               that.oprationMapServer([{
                                    service_id: "cfg_system.run",
                                    name: "全国平台-综合分析-成本分析"
                                }])
                            }
                        }, 300);
                        break;


                }
            },
            CloseRunMapsss() {
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析组件价格);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析基地名称);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析占比);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析饼图基地名称);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析转换效率);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析基地名称);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析逆变器分析);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析饼图基地名称);
                this.oprationMapServer(this.effctData.运行监测.关闭能效比和光源点);
                this.oprationMapServer(this.effctData.运行监测.关闭统计分析基地名称);
                this.oprationMapServer(this.effctData.领跑基地.光资源关闭);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析组件价格第一批);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析占比第一批);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析转换效率第一批);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析逆变器分析第一批);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析支架分析第一批);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析发电能效分析第一批);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析成本分析第一批);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析组件价格第二批);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析占比第二批);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析转换效率第二批);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析逆变器分析第二批);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析支架分析第二批);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析发电能效分析第二批);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析成本分析第二批);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析组件价格);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析占比);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析转换效率);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析逆变器分析);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析支架分析);
                this.oprationMapServer(this.effctData.综合分析.关闭综合分析成本分析);

                //this.CloseRunMap(val)
            },
            CloseRunMap(val) {
                // console.log(localStorage.getItem("titledata"))
                // console.log('val', val)
                let yearnum = localStorage.getItem("timeYear");
                switch (val) {
                    case 0:
                        clearTimeout(time);
                        if(parseInt(yearnum) == 2015){
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析组件价格第一批);
                            this.initTitleData(val)
                        }else if(parseInt(yearnum) == 2016){
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析组件价格第二批);
                            this.initTitleData(val)
                        }else{
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析组件价格);
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析基地名称);
                            this.initTitleData(val)
                        }

                        break;
                    case 1:
                        clearTimeout(time);
                        if(parseInt(yearnum) == 2015){
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析占比第一批);
                        }else if(parseInt(yearnum) == 2016){
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析组件价格第二批);
                        }else{
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析占比);
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析饼图基地名称);
                        }
                        this.initTitleData(val)
                        break;
                    case 2:
                        // this.statistical() ;
                        clearTimeout(time);
                        if(parseInt(yearnum) == 2015){
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析转换效率第一批);
                        }else if(parseInt(yearnum) == 2016){
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析转换效率第二批);
                        }else{
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析转换效率);
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析基地名称);
                        }

                        this.initTitleData(val)
                        break;
                    case 3:

                        // this.Internet();
                        clearTimeout(time);
                        if(parseInt(yearnum) == 2015){
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析逆变器分析第一批);
                        }else if(parseInt(yearnum) == 2016){
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析逆变器分析第二批);
                        }else{
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析逆变器分析);
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析饼图基地名称);
                        }
                        this.initTitleData(val)
                        break;
                    case 4:
                        clearTimeout(time);
                        if(parseInt(yearnum) == 2015){
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析支架分析第一批);
                        }else if(parseInt(yearnum) == 2016){
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析支架分析第二批);
                        }else{
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析支架分析);
                        }
                        this.initTitleData(val)
                        break;
                    case 5:
                        clearTimeout(time);
                        if(parseInt(yearnum) == 2015){
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析发电能效分析第一批);
                        }else if(parseInt(yearnum) == 2016){
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析发电能效分析第二批);
                        }else{
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析发电能效分析);
                            this.oprationMapServer(this.effctData.运行监测.关闭能效比和光源点);
                            this.oprationMapServer(this.effctData.运行监测.关闭统计分析基地名称);
                            this.oprationMapServer(this.effctData.领跑基地.光资源关闭);
                        }
                        this.initTitleData(val)
                        break;
                    case 6:
                        clearTimeout(time);
                        if(parseInt(yearnum) == 2015){
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析成本分析第一批);
                        }else if(parseInt(yearnum) == 2016){
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析成本分析第二批);
                        }else{
                            this.oprationMapServer(this.effctData.综合分析.关闭综合分析成本分析);
                        }
                        this.initTitleData(val)
                        break;

                }
            },

            oprationMapServer(data) {
                console.log(data)
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
<style scoped lang="scss">
    .arrs {
        position: absolute;
    }

    .echartCailbration {
        width: 9px;
        height: 450px;
        position: absolute;
        left: 20px;
        top: 77px;
        box-sizing: border-box;
        display: inline-block;
        background-size: 100% 100% !important;
        background: url("../../assets/img/echartPower-calibration.png") no-repeat;

    }

    .cailbration-box {
        position: absolute;
        top: 57px;
        left: 38px;
        width: 100%;
        height: 100%;

    }

    .my-icon-blue.active {
        margin-bottom: 20px;
        cursor: pointer;
        width: 244px;
        height: 46px;
        background-size: 100% 100% !important;
        display: inline-block;
        background: url("../../assets/img/echartPower-Active.png") no-repeat;

        .cailbration-color {
            display: inline-block;
            background: linear-gradient(0deg, rgba(255, 187, 80, 1) 0%, rgba(255, 245, 231, 1) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: TRENDS;
            line-height: 50px;
            font-size: 20px;
            font-weight: 800;
        }

        .more {
            width: 17px;
            height: 8px;
            display: inline-block;
            float: right;
            margin-right: 24px;
            margin-top: 20px;
            vertical-align: middle;
            background-size: 100% 100% !important;
            background: url("../../assets/img/echartPower-more.png") no-repeat;
        }
    }

    .my-icon-blues {
        margin-bottom: 20px;

        width: 214px;
        height: 50px;
        background-size: 100% 100% !important;
        display: inline-block;
        background: url("../../assets/img/echartPower.png") no-repeat;

        .cailbration-colors {
            display: inline-block;
            padding-left: 20px;
            background: linear-gradient(0deg, rgba(91, 185, 241, 1) 0%, rgba(174, 220, 248, 1) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: TRENDS;
            line-height: 50px;
            font-size: 20px;
            font-weight: 800;
        }
    }

    .my-icon-blue {
        margin-bottom: 20px;
        cursor: pointer;
        width: 214px;
        height: 50px;
        background-size: 100% 100% !important;
        display: inline-block;
        background: url("../../assets/img/echartPower.png") no-repeat;

        .cailbration-color {
            display: inline-block;
            padding-left: 20px;
            background: linear-gradient(0deg, rgba(91, 185, 241, 1) 0%, rgba(174, 220, 248, 1) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: TRENDS;
            line-height: 50px;
            font-size: 20px;
            font-weight: 800;
        }
    }

    .my-icon-red.active {
        margin-bottom: 10px;
        cursor: pointer;
        width: 244px;
        height: 40px;
        background-size: 100% 100% !important;
        display: inline-block;
        background-image: url("../../assets/img/echartPower-Active.png");
        background-repeat: no-repeat;

        .cailbration-color {
            display: inline-block;
            background: linear-gradient(0deg, rgba(255, 187, 80, 1) 0%, rgba(255, 245, 231, 1) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: TRENDS;
            line-height: 42px;
            font-size: 16px;
            font-weight: 400;
        }

        .more {
            width: 17px;
            height: 8px;
            display: inline-block;
            float: right;
            margin-right: 24px;
            margin-top: 18px;
            vertical-align: middle;
            background-size: 100% 100%;
            background-image: url("../../assets/img/echartPower-more.png");
            background-repeat: no-repeat;
        }
    }

    .my-icon-red {
        margin-bottom: 20px;
        cursor: pointer;
        width: 214px;
        height: 40px;
        background-size: 100% 100% !important;
        display: inline-block;
        background: url("../../assets/img/echartPower.png") no-repeat;

        .cailbration-color {
            padding-left: 20px;
            background: linear-gradient(0deg, rgba(91, 185, 241, 1) 0%, rgba(174, 220, 248, 1) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: TRENDS;
            line-height: 40px;
            font-size: 16px;
            font-weight: 400;
        }
    }

    .information {
        padding: 24px 10px 0 10px;

        .nav {
            margin-bottom: 26px;
        }

        .my-iocn-power {
            width: 53px;
            height: 64px;
            display: inline-block;
            background: url("../../assets/img/power.png") no-repeat;
        }

        .my-iocn-intensity {
            width: 53px;
            height: 64px;
            display: inline-block;
            background: url("../../assets/img/intensity.png") no-repeat;
        }

        .my-iocn-Dailygeneratingcapacity {
            width: 53px;
            height: 64px;
            display: inline-block;
            /*background: url("../../assets/img/Dailygeneratingcapacity.png") no-repeat;*/
        }

        .my-iocn-Numberhours {
            width: 53px;
            height: 64px;
            display: inline-block;
            background: url("../../assets/img/Numberhours.png") no-repeat;
        }

        .power-list {
            margin-bottom: 6px;
            width: 123px;
            height: 26px;
            background: rgba(0, 88, 134, 0.4);

            span {
                text-align: center;
                color: #82c2eb;
                font-size: 16px;
                line-height: 24px;
                margin-left: 8px;
            }
        }

        .power {
            width: 123px;
            height: 34px;
            background: rgba(0, 88, 134, 0.4);
            display: inline-block;
        }

        .power-left {
            color: #dcf4ff;
            font-family: DINOT;
            font-size: 20px;
            line-height: 32px;
            float: left;
            margin-left: 8px;
            // color: #dcf4ff;
        }

        .power-kw {
            float: right;
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            line-height: 32px;
            color: #82c2eb;
            margin-right: 6px;
        }

        .mation-title {
            display: inline-block;
            vertical-align: text-bottom;
            margin-left: 4px;
        }
    }
</style>
