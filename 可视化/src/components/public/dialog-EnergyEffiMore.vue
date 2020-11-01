<template>
    <el-dialog
            title="发电能效分析"
            :visible.sync="dialogVisible"
            @close="Close"
            append-to-body
            fullscreen=true
            :show-close="showclose"
            class="dialogBj"
    >

        <div class="tabs pat-title">
            <span v-for="(item,index) in technologyTab" :key="index" class="my-icon-blue" :class="{active:item.bol}" @click="technologyTabs(item.name)">{{item.name}}</span>
        </div>

        <echartsBarDeveMore
                ref="technors"
                ids="myMores"
                :unit="unit"
                :dataArr="lpjsData"
                :axisData="lpjsyear"></echartsBarDeveMore>
    </el-dialog>
</template>
<script>
    import echartsBarDeveMore from "@/components/public/echartsBarDeveMore";
    export default {
        components:{
            echartsBarDeveMore,

        },
        props: [],
        data() {
            return {
                active: "",
                isShowHighLight: false,
                checkYear: null,
                lpjsData: [],
                lpjsyear: [],
                unit:['kW.h/m²'],
                technologyTab:[
                    { name: "光资源", code: "", bol: true },
                    { name: "利用小时数", code: "", bol: false },
                    { name: "能效比数据", code: "", bol: false }
                ],
                showclose:false,
                dialogVisible: true,
                is_table:false ,
            };
        },
        mounted() {
            this.getJson();
            this.leadjs("光资源");

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
            show720(dataObj) {
                console.log('g',dataObj);
                var data=[dataObj];
                try{
                    RESAFETY.callService(data)
                }catch (e) {
                    console.log('连接失败，cfg_system.run')
                }
            },
            //领跑技术切换
            technologyTabs(name){
                this.technologyTab.map(item => {
                    if (item.name == name) {
                        item.bol = true;
                    } else {
                        item.bol = false;
                    }
                });

                this.lpjsData= []
                this.lpjsyear= []
                this.leadjs(name)
            },
            //光资源
            getRadiation(names,seriesDatas){
                let technologyVal= ",";
                this.lpjsData= []
                this.lpjsyear= []
                this.$axios.post("/StatisticalInfo/Radiation?baseCode="+technologyVal).then(res => {

                    if (res.code == 1) {
                        if (res.data && res.data.records && res.data.records.length > 0) {
                            let datas = res.data;
                            if(names == "光资源"){

                                for (let item of datas.records) {

                                    this.lpjsyear.push(item.name)
                                    seriesDatas[0].data.push(item.value0 );
                                }
                            }
                            // this.is_table=true;
                            this.lpjsData = seriesDatas;

                            let GenerationMore ={dataArr:this.lpjsData,axisData:this.lpjsyear, ids:"myMores"}
                            localStorage.setItem("GenerationMore", JSON.stringify(GenerationMore))
                            this.show720(this.resourceData[12].url)
                            // this.$nextTick(()=>{
                                this.$refs.technors.drawChart();
                            // })

                        }
                    }

                });
            },
            //利用小时数
            getElectricity(names,seriesDatas){

                let technologyVal= ",";
                this.lpjsData= []
                this.lpjsyear= []
                this.$axios.post("/StatisticalInfo/Electricity?baseCode="+technologyVal).then(res => {
                    if (res.code == 1) {
                        if (res.data && res.data.records && res.data.records.length > 0) {
                            let datas = res.data;
                            if(names == "利用小时数"){

                                for (let item of datas.records) {

                                    this.lpjsyear.push(item.name)
                                    seriesDatas[0].data.push(item.value0 );
                                    seriesDatas[1].data.push(item.value1);
                                }
                            }
                            // this.is_table=true;
                            this.lpjsData = seriesDatas;
                            let GenerationMore ={dataArr:this.lpjsData,axisData:this.lpjsyear, ids:"myMores"}
                            console.log('xiao',GenerationMore)
                            localStorage.setItem("GenerationMore", JSON.stringify(GenerationMore))
                            this.show720(this.resourceData[12].url)
                            this.$nextTick(()=>{
                                this.$refs.technors.drawChart();
                            })
                        }
                    }

                });
            },
            //能效比数据
            getEfficiency(names,seriesDatas){
                let technologyVal= ",";
                this.lpjsData= []
                this.lpjsyear= []
                this.$axios.post("/StatisticalInfo/Efficiency?baseCode="+technologyVal).then(res => {
                    if (res.code == 1) {
                        if (res.data && res.data.records && res.data.records.length > 0) {
                            let datas = res.data;
                            if(names == "能效比数据"){

                            for (let item of datas.records) {

                                    this.lpjsyear.push(item.name)
                                    seriesDatas[0].data.push(item.value0 );
                                }

                            }
                            // this.is_table=true;
                            this.lpjsData = seriesDatas;
                            let GenerationMore ={dataArr:this.lpjsData,axisData:this.lpjsyear, ids:"myMores"}
                            localStorage.setItem("GenerationMore", JSON.stringify(GenerationMore))
                            this.show720(this.resourceData[12].url)
                            this.$nextTick(()=>{
                                this.$refs.technors.drawChart();
                            })
                        }
                    }

                });
            },

            //领跑技术
            leadjs(names) {

                let seriesDatas = []
                if(names == "光资源"){
                    this.unit= ["kW.h/㎡"]
                    seriesDatas = [
                        {
                            name: "辐射量",
                            type: "bar",
                            data: [],
                            yAxisIndex: 0,
                        }
                    ];
                    this.getRadiation(names,seriesDatas)

                }else if(names == "利用小时数"){
                    this.unit= ["万kW.h","h"]
                    seriesDatas = [
                        {
                            name: "发电量",
                            type: "bar",
                            data: [],
                            yAxisIndex: 0,
                     
                        },
                        {
                            name: "利用小时数",
                            type: "bar",
                            data: [] ,
                            yAxisIndex: 1,
                        }
                    ];
                    this.getElectricity(names,seriesDatas)

                }else if(names == "能效比数据"){
                    this.unit=  ["%"]
                    seriesDatas = [
                        {
                            name: "能效比",
                            type: "bar",
                            data: [] ,
                            yAxisIndex: 0,
                        }
                    ];
                    this.getEfficiency(names,seriesDatas)

                }
            },
            Close(){
                this.$parent.dialogName=null;
            }
        }
    };
</script>
<style lang="scss" >
    .pat-title {
        position: absolute;
        z-index: 99;
        margin-left: 42%;

        .my-icon-red.active {
            text-align: center;
            font-size: 14px;
            line-height: 23px;
            color: #82c2eb;
            text-align: center;
            padding-left: 10px;
            padding-right: 10px;
            height: 24px;
            margin-left: 20px;
            display: inline-block;
            background: url("../../assets/img/title-blue.png") no-repeat;
            background-size: 100% 100%;
        }

        .my-icon-blue.active {
            cursor: pointer;
            font-size: 14px;
            line-height: 23px;
            color: #ff2066;
            text-align: center;
            padding-left: 10px;
            padding-right: 10px;
            height: 24px;
            margin-left: 20px;
            display: inline-block;
            background: url("../../assets/img/title-lines.png") no-repeat;
            background-size: 100% 100%;
        }
        .my-icon-blue {
            cursor: pointer;
            text-align: center;
            color: #82c2eb;
            font-size: 14px;
            line-height: 23px;
            margin-left: 20px;
            padding-left: 10px;
            padding-right: 10px;
            height: 24px;
            display: inline-block;
            background: url("../../assets/img/title-blue.png") no-repeat;
            background-size: 100% 100%;
        }
    }
    .dialogBj{
        .el-dialog__header{
            text-align: center;
        }
        .el-dialog__title{
            color: #fff;
        }
        .el-dialog{
            background-color: rgba(0,0,0,0.1);
            background: url(../../assets/img/bg1_03.png) no-repeat;
            background-size: 100% 100%;
        }
        .barHeight {
            width: 100%;
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
            width: 100%;
            height: 100%;
            left: 0;
        }
        /*.tableBox{*/
        /*    margin-top: 50px;*/
        /*    .tableTitle{*/
        /*        font-size: 18px;*/
        /*        line-height: 24px;*/
        /*        color: #fff;*/
        /*        margin-bottom: 10px;*/
        /*    }*/
        /*    .el-table th, .el-table tr {*/
        /*        color: #fff;*/
        /*        background-color: rgb(18,50,88);*/
        /*    }*/
        /*    .el-table--enable-row-hover .el-table__body tr:hover>td {*/
        /*        background-color: #124c75;*/
        /*    }*/
        /*    .el-table__body-wrapper,.el-table__header-wrapper{*/
        /*        background-color: rgb(18,50,88);*/
        /*    }*/
        /*}*/
    }

</style>