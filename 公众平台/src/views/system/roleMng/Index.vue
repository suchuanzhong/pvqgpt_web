<template>
  <div class="whole Wrap">
    <main class="view-box flex-column">
      <ul class="operateList">
        <li class="operateBtn" @click="addForm">
          <img src="../../../assets/img/add.png" height="20" width="20" /><span
            class="operateTitle"
            >新增</span
          >
        </li>
        <li class="operateBtn" @click="editForm">
          <img src="../../../assets/img/eidt.png" height="20" width="20" /><span
            class="operateTitle"
            >编辑</span
          >
        </li>
        <li class="operateBtn" @click="DeleteData">
          <img src="../../../assets/img/delete.png" height="20" width="20" />
          <span class="operateTitle">删除</span>
        </li>
        <li class="operateBtn bigWidth" @click="showRoleMenuPage">
          <img src="../../../assets/img/key.png" height="20" width="20" />
          <span class="operateTitle">配置菜单</span>
        </li>
      </ul>
      <queryFrom @Refresh="Refresh"></queryFrom>
      <div class="table-box flex-1 formcls">
        <el-table
          :data="tableData"
          class="table"
          stripe
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%; "
          size="medium"
          border
        >
          <el-table-column
            property="roleName"
            label="角色名称"
            min-width="50%"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="角色类型"
            min-width="50%"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <span>{{
                scope.row.roleType == 1 ? "项目用户" : "基地用户"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            property="remark"
            label="备注"
            min-width="50%"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            property="createTime"
            label="创建时间"
            min-width="50%"
            show-overflow-tooltip
            align="center"
          >
            <span slot-scope="scope">{{
              $moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss")
            }}</span>
          </el-table-column>
        </el-table>
      </div>
      <component
        :is="dialogTypeName"
        @Refresh="Refresh"
        :selectedRow="selectedRow"
      ></component>
      <div class="p-t-20">
        <pageBox :totalNum="totalNum" @Refresh="Refresh"></pageBox>
      </div>
    </main>
  </div>
</template>
<script>
import AddForm from "./Form/Form";
import EditForm from "./Form/Edit";
import queryFrom from "./Form/QueryForm";
import roleMenu from "./Form/RoleMenu";

import pageBox from "@/components/Page1.vue";

// import {calc_tableHeight} from "@/plugins/tableHeight";

export default {
  components: {
    AddForm,
    queryFrom,
    pageBox,
    EditForm,
    roleMenu
  },
  data() {
    return {
      tableData: [],
      selectedRow: null,
      tableHeight: null,
      dialogTypeName: null,
      pageInfo: {
        page: 1,
        pageSize: 20,
        order: " CreateTime desc "
      },
      queryInfo: {},
      totalNum: 0
    };
  },
  filters: {
    // timeFilter(val){
    //   return $moment(val).format('YYYY-MM-DD HH:mm:ss');
    // }
  },
  mounted() {
    // this.tableHeight = calc_tableHeight(150);
    this.Refresh(this.queryInfo);
  },
  methods: {
    handleCurrentChange(val) {
      this.selectedRow = val;
    },
    addForm() {
      this.dialogTypeName = "AddForm";
    },
    editForm() {
      if (this.selectedRow == null) {
        this.$message({
          message: "请选择数据",
          type: "error",
          offset:70
        })
        return;
      }
      this.dialogTypeName = "EditForm";
    },
    showRoleMenuPage() {
      if (this.selectedRow == null) {
        this.$message({
          message: "请选择数据",
          type: "error",
          offset:70
        })
        return;
      }
      this.dialogTypeName = "roleMenu";
    },

    Refresh(queryInfo) {
      if (queryInfo == undefined) {
        queryInfo = {};
      }
      queryInfo.page = this.pageInfo.page;
      queryInfo.pageSize = this.pageInfo.pageSize;
      this.$fetch( "/SystemRole/Query",queryInfo).then(res => {
        this.tableData = res.data;
        this.totalNum = res.data.length;
        // if (data.data.totalCount != this.totalNum) {
        //   this.totalNum = data.data.totalCount;
        // }
      });
    },
    DeleteData() {
      if (this.selectedRow == null) {
        this.$message({
          message: "请选择数据",
          type: "error",
          offset:70
        })
        return;
      } else {
        this.$confirm("是否删除当前数据？", "提示", {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$delete("/SystemRole/" + this.selectedRow.id).then(() => {
              this.$message({
                message: "删除成功",
                type: "sucess",
                offset:70
              })
              this.Refresh();
            });
          })
          .catch(() => {});
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
