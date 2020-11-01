<template>
    <el-dialog :title="photovoltaic.titleName" :visible.sync="dialogVisible"
               @close="close" class="dialogBj" fullscreen=true   :show-close="showclose" >
        <iframe :src="photovoltaic.photovoltaic" border="0"
                style="z-index:99;height: calc(100% - 0px);position:absolute;width:calc(100% - 0px);border: none;"></iframe>
    </el-dialog>
</template>

<script>
    export default {
        props:['title','panoramaUrl'],

       data(){
            return {
                showclose:false,
                dialogVisible: true,
                photovoltaic:{}
            }
       }  ,
        created() {
            let barDatas=localStorage.getItem('photovoltaic');
            this.photovoltaic=JSON.parse(barDatas);
        },
        methods:{

            // 修改 table header cell的背景色
            // tableHeaderCellStyle () {
            //     return 'border-color: rgba(0,88,134,0.5); color: #fff;background-color:rgba(0, 131, 199, 0.3);'
            // },
            close(){
                this.$parent.dialogName=null;
            }
        }
    }
</script>

<style lang="scss">
    .dialogBj{
      
        .el-dialog__header{
            position: absolute;
            top: 12px;
            left: 50%;
            z-index: 999;
            padding: 0!important;
            text-align: center;
       
        }
        .el-dialog__body{
            padding: 0 !important;
        }
        .el-dialog__title{
            color: #fff;
        }
        .el-dialog{
            background-color: rgba(0,0,0,0.1);
            background: url('/img/bg1_03.png') no-repeat;
            background-size: 100%;
        }
        .barHeight {
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
        .listImg{
            text-align: center;
            /*img{*/
            /*    width: 100%;*/
            /*    height: 500px;*/
            /*}*/
        }


    }

</style>