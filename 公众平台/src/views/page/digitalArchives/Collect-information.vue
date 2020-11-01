<template>
  <div class="collect">
    <div class="collect-title">
      <div class="collect-report-tab" >
        <div class="icon-button" v-for="(item,index) in collectData" :key="index"
             @click="getProjectType(item,index)"
             :class="{ 'my-icon-report' :item.typeName=='项目可研报告',
             'my-icon-drawing' :item.typeName=='项目竣工图',
             'my-icon-other' :item.typeName=='其他资料','active':activeIndex == index}" >
          {{item.typeName}}
        </div>
      </div>
    </div>
    <div class="collect-report-content" style="width: calc(100% - 175px);">
      <div class="select-wrap">
        <el-form>
          <el-form :inline="true" ref="search">
            <el-form-item label="文件名称">
              <el-input
                      style="width: 180px;"
                      placeholder="请输入文件名称"
                      v-model="searchDatatitle"
                      clearable
              ></el-input>
            </el-form-item>
            <el-button class="Btn-blue" @click="onClick_search">搜索</el-button>
          </el-form>
        </el-form>
      </div>
      <div class="table-box">
        <el-table
                :data="tableData"
                :stripe="true"
                highlight-current-row
                :header-cell-style="tableHeaderCellStyle"
                @current-change="handleChange"
                style="width: 100%;color:#606266;"
        >
          <el-table-column
                  type="index"
                  label="序号"
                  width="80px"
                  align="center"
          >
          </el-table-column>
          <el-table-column
                  label="文件名称"
                  prop="fileName"
                  show-overflow-tooltip
                  align="center"
          >
          </el-table-column>
          <el-table-column
                  prop="baseName"
                  label="基地"
                  show-overflow-tooltip
                  align="center"
          >
          </el-table-column>
          <el-table-column
                  prop="projectName"
                  label="项目名称"
                  show-overflow-tooltip
                  align="center"
          >
          </el-table-column>
          <el-table-column
                  prop="thefileSize"
                  label="文件大小"
                  show-overflow-tooltip
                  align="center"
          >
          </el-table-column>
          <el-table-column
                  prop="uploadtime"
                  label="上传时间"
                  show-overflow-tooltip
                  align="center"
          >
           <span slot-scope="scope">{{
              $moment(scope.row.uploadtime).format("YYYY-MM-DD HH:mm:ss")
            }}</span>
          </el-table-column>
          <el-table-column label="操作" size="mini">
            <template slot-scope="scope">
              <button
                      class="result-imgs-btn color-download"
                      size="mini"
                      @click="downloadfile(scope.row.id)"
              >
                <i class="my-icon-downs"></i>下载
              </button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <el-pagination
              background
              class="bdPage"
              @current-change="handleCurrentChange"
              :current-page="queryData.page"
              :page-size="queryData.pageSize"
              layout="total,prev, pager, next"
              :total="parseInt(total)"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { getFormatDate } from "@/utils/auth";
  export default {
    components: {

    },
    data() {
      return {
        searchDatatitle:'',
        tableData:[],
        equipList: [],
        queryData: {
          pageSize: 10,
          page: 1,
        },
        total: 0,
        collectData:[],
        activeIndex:0,
      };
    },
    filters: {
      MMdd(val) {
        return getFormatDate("MM-dd", val);
      },
      yyyy(val) {
        return getFormatDate("yyyy", val);
      },
      yyyyMMdd(val) {
        return getFormatDate("yyyy-MM-dd", val);
      }
    },
    watch: {

    },
    methods: {
      getProjectTypeList(){
        var _this=this;
        _this.tableData=[];
        _this.total = 0;
        _this.$fetch('/MtrProjectType/GetProjectType').then(res=>{
          _this.collectData=res.data;
          if(_this.collectData.length>0){
            _this. getProjectType(null,0);
          }

        })
      },
      //查询类型传入  typeCode
      getProjectType(cont,index){
        this.activeIndex = index;
        this.tableData=[];
        this.total = 0;
        if(this.collectData.length>0){
          this.getProjectinformation(this.collectData[index].typeCode);
        }

      },
      // 修改 table header cell的背景色
      tableHeaderCellStyle () {
        return ' color: #fff;background-color:#1bac6b;'
      },
      //查询
      onClick_search(){
        this.queryData= {
          pageSize: 10,
          page: 1,
          fileName:this. searchDatatitle
        };
        this.getProjectinformation();
      },
      //点击下载
      downloadfile(id) {
          this.$fetchGet({url:'/MtrProjectinformation/DownloadTemplate?id=' + id}).then(res=>{
            if(res.code==1){
              let a = document.createElement('a')
              a.href = res.data
              a.click()
            }else {
              alert(res.errorMsg)
            }
          })
      },
      //点击下载
      // downloadfile(id) {
      //   //   this.$store.commit('SET_LOADING')
      //   var $eleForm = $("<form method='get'></form>")
      //   $eleForm.attr(
      //           'action',
      //           this.api + '/MtrProjectinformation/DownloadTemplate?id=' + id
      //   )
      //   $(document.body).append($eleForm)
      //   //提交表单，实现下载
      //   $eleForm.submit()
      // },
      //列表
      getProjectinformation(cont){
        var _this=this;
        _this.type=cont
        _this.$fetch('/MtrProjectinformation',{
          page: this.queryData,
          projectType:_this.type
        }).then(res=>{
          if(res.data.data&&res.data.data.length>0) {
            _this.tableData=res.data.data;
            _this.total = res.data.totalCount;
          }
        })
      },
      handleCurrentChange(data) {
        this.queryData.page = data;
        this.getProjectinformation();
      },
      handleChange() {},
    },
    created() {
      this.getProjectTypeList();
    }
  };
</script>
<style lang="scss">

  .result-imgs-btn.el-input--small .el-input__inner {
    height: 40px;
    line-height: 40px;
  }
  .result-imgs-btn.el-button:focus, .el-button:hover {
    color: #606266 !important;
    border-color: #DCDFE6 !important;
    background-color: #fff !important;
  }
  .el-table th.is-leaf, .el-table td{
    border-bottom: 1px solid #DCDFE6 !important;
  }
</style>
<style lang="scss" scope="scope">
  .collect-title{
    display: flex;
    padding-right: 20px;
    .collect-report-tab{
      .icon-button {
        width: 110px;
        height: 90px;
        text-align: center;
        line-height:135px;
        background: url(../../../assets/img/prject-info.png) no-repeat;
        color: #1BAC6B;
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 30px;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
        &.active {
          color: #fff;
          background: url(../../../assets/img/prjectInfo-active.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .my-icon-report{
        width: 110px;
        height: 90px;
        text-align: center;
        line-height:135px;
        margin-bottom: 30px;
        color: #1BAC6B;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        background: url("../../../assets/img/project-reports.png")no-repeat;
        &:hover {
          text-decoration: underline;
        }
        &.active {
          color: #fff;
          background: url(../../../assets/img/project-reportActive.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .my-icon-drawing{
        width: 110px;
        height: 90px;
        text-align: center;
        line-height:135px;
        margin-bottom: 30px;
        color: #1BAC6B;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        background: url("../../../assets/img/prject-drawing.png") no-repeat;
        &:hover {
          text-decoration: underline;
        }
        &.active {
          color: #fff;
          background: url(../../../assets/img/prject-drawingActive.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .my-icon-other{
        width: 110px;
        height: 90px;
        text-align: center;
        line-height:135px;
        /*margin-bottom: 30px;*/
        color: #1BAC6B;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        background: url("../../../assets/img/other-information.png") no-repeat;
        &:hover {
          text-decoration: underline;
        }
        &.active {
          color: #fff;
          background: url(../../../assets/img/other-informationActive.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }

  }


  .collect-report-content{
    display: flex;
    flex-direction: column;
    /*vertical-align: top;*/

  }
  .collect{
    width: 100%;
    height: 100%;
    display: flex;
    padding: 50px;
    .select-wrap{
      /*display: flex;*/
    }
  }
  .my-icon-downs{
    width: 16px;
    height: 18px;
    cursor: pointer;
    display: inline-block;
    background-image: url("../../../assets/img/download.png");
  }
  .result-imgs-btn {
    padding: 4px 8px;
    margin-bottom: 5px;
    i {
      margin-right: 5px;
      vertical-align: middle;
    }
    &.color-download {
      color: #606266;
    }
    &.color-warning {
      color: #ff8800;
    }

  }
</style>
