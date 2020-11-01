<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="1200px" @close="close" class="abow_dialog" top="8vh">
        <div class="table-box">
            <el-table :data="data"
                      height="500"
                      :stripe="true"
                      :header-cell-style="tableHeaderCellStyle"
                      style="width: 100%; color:#606266; "
            >
                <el-table-column :prop="i.prop" :label="i.label" v-for="(i,index) in tableList" :key="index" align="center"></el-table-column>
            </el-table>
        </div>
    </el-dialog>
</template>
<script>
export default {
    props:['title','data'],
    data(){
        return {
            dialogVisible: true,
            tableList:[
                { prop: 'factor', label: '厂家' },
                { prop: 'model', label: '型号' },          
                { prop: 'batterytype', label: '类型' },          
                { prop: 'datavalue', label: '安装数量（块）' },          
                { prop: 'installcapacity', label: '安装容量（MW）' },          
                { prop: 'standpower', label: '标称功率（W）' },          
                { prop: 'standeffect', label: '转换效率（%）' },          
            ]
                
        }
    },
    methods:{
        // 修改 table cell边框的背景色
        // tableCellStyle () {
        //     return 'border-color: #ebebeb;'
        // },
// 修改 table header cell的背景色
        tableHeaderCellStyle () {
            return ' color: #fff;background-color:#1bac6b;'
        },
        close(){
            this.$parent.dialogName=null;
        }
    }
}
</script>
<style lang="scss">
    .table-box{
        .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
        .el-table__body tr.current-row>td,
        .el-table__body tr.hover-row.current-row>td,
        .el-table__body tr.hover-row.el-table__row--striped.current-row>td {
            background-color: #daf1e7;
            color: #1da63b;
        }
        .table-box .el-table--enable-row-hover .el-table__body tr:hover > td {
            background: #daf1e7 !important;
            color: #1da63b !important;
        }

        .el-table--striped .el-table__body tr.current-row td {
            background-color: #daf1e7 !important;
            color: #1da63b !important;
        }
    }


</style>

