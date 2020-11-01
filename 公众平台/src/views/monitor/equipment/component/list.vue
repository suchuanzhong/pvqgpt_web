<template>
  <div style="height:calc(100% - 50px)" id="list">
    <div> 
        <el-table :header-cell-style="headercellstyle"  :cell-style="cellstyle" :data="tableData" height="385px" border size="medium">
            <el-table-column label="逆变器名称" prop="name" align="center">
                <template slot-scope="scope">
                    <!-- <p class="equName"> -->
                        <span>{{scope.row.name}}</span>
                        <!-- <img src="/img/location.png" alt=""> -->
                    <!-- </p> -->
                </template>
            </el-table-column>
            <el-table-column label="逆变器状态" align="center">
                <template slot-scope="scope">
                    <span :style="scope.row.status=='invt_grid'?'color:#1bac6b':scope.row.status=='invt_comm'?'color:#ff4b44':scope.row.status=='invt_fault||invt_comm'?'color:#00deff':scope.row.status=='invt_shutdown'?'color:#bbbbbb':''">
                        {{scope.row.status=='invt_grid'?'并网':scope.row.status=='invt_standby'?'待机':scope.row.status=='invt_shutdown'?'关机':scope.row.status=='invt_fault||invt_comm'?'故障':''}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="直流有功(kW)" prop="zlpwr" align="center"></el-table-column>
            <el-table-column label="交流有功(kW)" prop="jlpwr" align="center"></el-table-column>
            <el-table-column label="日发电量(kW.h)" prop="fdl" align="center"></el-table-column>
            <el-table-column label="转换效率" prop="xl" align="center"></el-table-column>
            <el-table-column label="进入接入支路" align="center">
                <template slot-scope="scope">
                    <span style="cursor:pointer" @click="viewInfo(scope.row,nodedata)">
                        <img src="/img/enter.png" alt="">
                    </span>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="pagination">
        <el-pagination layout="total,prev, pager, next,jumper" :total="total" :page-size="pageSize" :current-page="page" @current-change="currentchange" @prev-click="currentchange" next-click="currentchange"></el-pagination>
    </div>
</div>
</template>

<script>
export default {
  props:['dataList','nodedata'],
  data(){
      return{
          pageSize:10,
          page:1,
          total:1,
          tableData:[],
      }
  },
  mounted() {
      this.total=this.dataList.length;
      // 数据取前10条
      let end=(this.page*this.pageSize>=this.total)?this.total:this.page*this.pageSize;
      this.tableData=[...this.dataList].slice ((this.page-1)*this.pageSize,end);
  },
  watch:{
      page(){
          let end=(this.page*this.pageSize>=this.total)?this.total:this.page*this.pageSize;
          this.tableData=[...this.dataList].slice ((this.page-1)*this.pageSize,end);
      }
  },


  methods:{
      currentchange(val){
          this.page=val;
      },
      viewInfo(row,nodedata){
      //    向外传递事件，跳转页面
        this.$emit('viewnbqinfo',row,nodedata)
      },

      headercellstyle(){
          return{'background': ' #1da63b','color':'#FFF','border-right-color':'#8dd5b5','border-bottom-color':'38dd5b5'}
        },
        cellstyle(){
          return {
            'color':'#1bac6b','border-right-color':'#8dd5b5','border-bottom-color':'#8dd5b5'
          }
        },
  }
}
</script>
<style>
#list .el-table__body-wrapper{
    height: 330px!important;
}
</style>

