<template>
    <!-- 地图弹窗组件 -->
    <div id="mappop" class="mapPop">
        <div class="title">{{digitalArchivesList.basename}}
            <i class="el-icon-close" @click="close"></i>
        </div>
        <div class="angle-wrapper"></div>
        <div class="popContain">
            <div class="popContain">
                <p>
                    <label>批次:</label>
                    <span>{{digitalArchivesList.batchName}}</span>
                </p>
                <p>
                    <label>建设时间:</label>
                    <span>{{digitalArchivesList.buildtime|timeFilter}}</span>
                </p>
                <p>
                    <label>并网容量（MW）:</label>
                    <span>{{digitalArchivesList.gridsCale}}</span>
                </p>
                <p>
                    <label>占地面积（亩）:</label>
                    <span>{{digitalArchivesList.area}}</span>
                </p>
                <p>
                    <label>年均辐射量（kWh/m²）:</label>
                    <span>{{digitalArchivesList.radiation}}</span>
                </p>
                <p>
                    <label>省份:</label>
                    <span>{{digitalArchivesList.province}}</span>
                </p>
                <p>
                    <label>并网时间:</label>
                    <span>{{digitalArchivesList.gridtime |timeFilter}}</span>
                </p>
                <p>
                    <label>总投资（亿元）:</label>
                    <span>{{digitalArchivesList.invest}}</span>
                </p>
                <p>
                    <label>资源区:</label>
                    <span>{{digitalArchivesList.sourcearea}}</span>
                </p>
                <p>
                    <label>年均发电量（万kWh）:</label>
                    <span>{{digitalArchivesList.power}}</span>
                </p>
            </div>


        </div>
    </div>

</template>

<script>
    import { getFormatDate } from "@/utils/auth";
    export default {
        name: "Number-base",
        props:{
            digitalArchivesList: {
                default: function() {
                    return {};
                }
            },

        } ,

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
                dialogVisible: true,
            }
        } ,
        methods:{
            // close() {
            //     this.mappop.setPosition(null);
            //
            // },
            close(){
                this.$parent.dialogName=null;
            }
        }
    }
</script>

<style lang="scss">
    .mapPop {
        position: absolute;
        min-width: 200px;
        /*padding:20px 0px 10px 0px;*/
        vertical-align: middle;
        background-color: #fff;
        border-radius: 8px;
        font-size: 18px;
        -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        transition: all 0.5s;
        backface-visibility: hidden;
        z-index: 2;
        
        /*position: absolute;*/
        top: 0px;
        left: 190px;
        
        .title {
            color: #303133;
            border-bottom: 1px solid #D1D1D1;
            height: 35px;
            border-radius: 8px 8px 0 0;
            padding-left: 12px;
            line-height: 32px;
        }
        .el-icon-close{
            padding-right: 10px;
            float: right;
            padding-top: 6px;
        }
        .angle-wrapper {
            content: "";
            width: 0;
            height: 0;
            border: 15px solid transparent;
            border-left-color: #fff;
            
            transform: rotate(90deg);
            position: absolute;
            left: calc(50% - 15px);
            top: 100%;
        }
        .popContain {
            padding: 8px;
            min-width: 310px;
            box-sizing: border-box;
            p {
                padding: 3px 0;
                font-size: 14px;
                color: #555;
                label {
                    display: inline-block;
                   width: 200px;
                }
               
            }
        }
    }

</style>