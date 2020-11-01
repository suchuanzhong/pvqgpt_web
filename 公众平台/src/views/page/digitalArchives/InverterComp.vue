<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="1200px" @close="close" class="abow_dialog" top="8vh">
        <div class="table-box">
            <el-table stripe
                      :data="data"
                      :header-cell-style="tableHeaderCellStyle"
                      height="500"  style="width: 100%" >
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
                { prop: 'type', label: '类型' },          
                { prop: 'datavalue', label: '安装数量（台）' },          
                { prop: 'installcapacity', label: '安装容量（MW）' },          
                { prop: 'effict', label: '转换效率（%）' },          
            ]
        }
    },
    methods:{
// 修改 table header cell的背景色
        tableHeaderCellStyle () {
            return 'border-color: #1bac6b; color: #fff;background-color:#1bac6b;'
        },
        close(){
            this.$parent.dialogName=null;
        }
    }
}
</script>
<style lang="scss" scoped>
</style>

