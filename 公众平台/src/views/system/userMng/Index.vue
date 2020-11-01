<template>
  <div class="whole Wrap">
    <main class="view-box flex-column">
      <ul class="operateList">
        <li class="operateBtn" @click="addform">
          <img src="../../../assets/img/add.png" height="20" width="20" />
          <span class="operateTitle">新增</span>
        </li>
        <li class="operateBtn" @click="eduitForm">
          <img src="../../../assets/img/eidt.png" height="20" width="20" />
          <span class="operateTitle">编辑</span>
        </li>
        <li class="operateBtn bigWidth" @click="ResetPassword">
          <img src="../../../assets/img/resetpwd.png" height="20" width="20" />
          <span class="operateTitle">重置密码</span>
        </li>
        <li class="operateBtn" @click="DeleteData()">
          <img src="../../../assets/img/delete.png" height="20" width="20" />
          <span class="operateTitle">删除</span>
        </li>
        <li class="operateBtn bigWidth" @click="ShowRoleForm(true)">
          <img src="../../../assets/img/flowname.png" height="20" width="20" />
          <span class="operateTitle">配置角色</span>
        </li>
      </ul>
      <queryFrom @Refresh="Refresh"></queryFrom>
      <div class="table-box flex-1 formcls">
        <el-table
          :data="tableData"
          highlight-current-row
          class="table"
          @current-change="handleCurrentChange"
          style="width: 100%"
          stripe
          size="medium"
          border
        >
          <el-table-column prop="userName" label="用户账号" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="staffName" label="人员名称" show-overflow-tooltip align="center"></el-table-column>align="center"
          <el-table-column prop="roleNames" label="角色" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="integral" label="积分" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="batch" label="批次名称" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="baseName" label="基地名称" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="phone" label="电话" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" show-overflow-tooltip align="center"></el-table-column>
        </el-table>
      </div>
      <component :is="dialogTypeName" :selectedRow="selectedRow" @Refresh="Refresh"></component>
      <div class="p-t-20">
        <pageBox :totalNum="totalNum" @Refresh="Refresh"></pageBox>
      </div>
    </main>
  </div>
</template>
<script>
import addForm from "./form/Form.vue";
import queryFrom from "./form/QueryForm";
import pageBox from "@/components/Page1.vue";
import eduitForm from "./form/Edit";
import roleForm from "./form/RoleFrom";
// import {calc_tableHeight} from "@/plugins/tableHeight";
export default {
  components: {
    queryFrom,
    pageBox,
    eduitForm,
    addForm,
    roleForm
  },
  data() {
    return {
      tableData: null,
      selectedRow: null,
      dialogTypeName: null,
      tableHeight: null,
      pageInfo: {
        page: 1,
        pageSize: 20
      },
      queryInfo: {},
      totalNum: 0,
      storeStationList: [] //存储所有电站列表
    };
  },
  mounted() {
    // this.tableHeight = calc_tableHeight(150);
    this.Refresh();
    this.getStationMsg();
  },
  methods: {
    filterProjects(val) {
     if(val){
      let strVal = isNaN(val) ? val : String(val);
        if (strVal.indexOf(";") > -1) {
          let stationVal = strVal.split(";");
          let storeStation = [];
          for (let i in stationVal) {
            for (let j in this.storeStationList) {
              if (stationVal[i] == this.storeStationList[j].projectCode) {
                storeStation.push(this.storeStationList[j].projectName);
              }
            }
          }
          return storeStation.join(",").replace(/,/g, ";");
        } else {
          for (let k in this.storeStationList) {
            if (strVal == this.storeStationList[k].projectCode) {
              return this.storeStationList[k].projectName;
            }
          }
        }
      }else{
        return ""
      }
    },
    // 获取电站所有信息
    getStationMsg() {
      this.$fetch("/RealTimeData/GetProList").then(res => {
        if (res.data && res.data.length > 0) {
          this.storeStationList = res.data;
        }
      });
    },
    handleCurrentChange(val) {
      this.selectedRow = val;
    },
    ShowRoleForm() {
      if (this.selectedRow == null) {
        this.$message({
          message: "请选择数据",
          type: "error",
          offset:70
        })
        return;
      }
      this.dialogTypeName = "roleForm";
    },
    addform() {
      this.dialogTypeName = "addForm";
    },
    eduitForm() {
      if (this.selectedRow == null) {
        this.$message({
          message: "请选择数据",
          type: "error",
          offset:70
        })
        return;
      }
      this.dialogTypeName = "eduitForm";
    },
    Refresh(data) {
      this.queryInfo.page = this.pageInfo.page;
      this.queryInfo.pageSize = this.pageInfo.pageSize;
      data = data || {}
    
      this.$fetch("/SystemUser/Query", Object.assign({}, this.queryInfo, data)).then(res => {
        this.tableData = res.data;
        // this.totalNum = res.data.totalCount;
        this.totalNum = res.data.length;
      });
    },

    DeleteData() {
      if (this.selectedRow == null) {
        this.$message({
          message: "请选择数据",
          type: "error",
          offset:70
        })
      } else {
        this.$confirm("是否删除当前数据？", "提示", {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$delete("/SystemUser/"+this.selectedRow.id).then(() => {
            this.$message({
              message: "删除成功",
              type: "sucess",
              offset:70
            })
            this.Refresh();
          });
        });
      }
    },
    ResetPassword() {
      if (this.selectedRow == null) {
        this.$message({
          message: "请选择数据",
          type: "error",
          offset:70
        })
      } else {
        this.$confirm("是否重置密码为123456？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.selectedRow.passWord = "123456";
            this.$post("/SystemUser/ResetPassword",this.selectedRow).then(()=>{
              this.$message({
                message: "重置密码成功",
                type: "sucess",
                offset:70
              })
              this.Refresh();
            })
          }).catch(() => {});
      }
    }
  }
};
</script>
<style lang="scss">
.el-tooltip__popper {
  font-size: 14px;
  max-width: 24%;
  position: relative;
  right: 72px;
  background-color: #8dd5b5 !important;
}
</style>

