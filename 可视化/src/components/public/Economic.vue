<template>
    <el-dialog title="各基地发电量和产值信息汇总表" :visible.sync="dialogVisible"
               @close="close" class="dialogBj"   fullscreen=true   :show-close="showclose">
        <span class="unit">单位:亿kW.h</span>
        <div class="table-box">
            <el-table   :data="tableEconomic.data"
                      style="width: 100%" >
                <el-table-column :prop="i.prop" :label="i.label" v-for="(i,index) in tableList" :key="index" align="center"></el-table-column>

            </el-table>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        props:['data'],
        data(){
            return {
                showclose:false,
                dialogVisible: true,
                tableEconomic:{},
                //后面需要动态绑定label
                // tableData:[],
                tableList:[
                    { prop: 'basename', label: '基地' },
                    { prop: 'resourcename', label: '资源区' },
                    { prop: 'batch', label: '批次' },
                    { prop: '2015', label: '2015' },
                    { prop: '2016', label: '2016' },
                    { prop: '2017', label: '2017' },
                    { prop: '2018', label: '2018' },
                    { prop: '2019', label: '2019' },
                    { prop: '2020', label: '2020' },
                    { prop: 'cumulative', label: '累计' }
                ]
            }
        },
        created() {

            let barDatas=localStorage.getItem('tableEconomic');
            console.log('b',this.tableEconomic)
            this.tableEconomic=JSON.parse(barDatas);
            // this.tableInit()
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
<style  lang="scss">
    .table-box{
        .el-table thead.is-group th {
            background:  #1c3a5d;
        }
        .el-table--enable-row-transition .el-table__body td{background-color:  #1c3a5d;}
        .el-table--border {background-color:  #1c3a5d;
        }

    &.el-table,
    &.el-table__expanded-cell {
        background-color: #1c3a5d;
    }
    th,
    tr {
        background-color: #1c3a5d;
    }
    td,
    th.is-leaf {
        padding: 10px 0;
        border-color: #225a93;
    }
    &.el-table::before {
        background-color: #1c3a5d;
    }
    .el-table__body-wrapper {
        border-left: 1px solid  #225a93;
        border-right: 1px solid  #225a93;
    }
        .el-table thead {
            color: #0090ff;
            font-weight: 500; }
        .el-table {
            position: relative;
            overflow: hidden;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            width: 100%;
            max-width: 100%;
            background-color: #cbd3de;
            font-size: 14px;
            color: #82c2eb; }
        .el-table__expanded-cell:hover {
            background-color: transparent !important; }
        .el-table__header-wrapper tbody td, .el-table__footer-wrapper tbody td {
            background-color: #253145;
            color: #fff; }
        .el-table__fixed-footer-wrapper tbody td {
            border-top: 1px solid #225a93;
            background-color: #253145;
            color: #82c2eb; }
            &.el-table--enable-row-hover .el-table__body tr:hover>td {
                background-color: #1c3a5d;
                color: #82c2eb;
            }
    .el-table__header-wrapper {
        height: 46px;
        background-color: #1c3a5d;
        border: solid 1px  #225a93;
    }
        .el-picker-panel {
            background-color: #1c3a5d;
            border: 1px solid  #225a93;
            .el-year-table,
            .el-month-table {
                td .cell {
                    color: #82c2eb;
                }
            }
            .el-date-picker__header-label,
            .el-picker-panel__icon-btn {
                color: #82c2eb;
            }
        }
        .el-table th > .cell.highlight {
            color: #fff; }
        .no-padding.el-table{
            th>.cell{
                padding-left: 0!important;
                padding-right: 0!important;
            }
        }
    }
    .dialogBj{
        .el-dialog__header{
            text-align: center;
        }
         .el-dialog__body{
             padding: 0px 20px !important;
             text-align: right;
             .unit{
               line-height: 34px;
                 font-size: 16px;
                 color: #fff;
                 margin-right: 20px;
             }
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

    </style>