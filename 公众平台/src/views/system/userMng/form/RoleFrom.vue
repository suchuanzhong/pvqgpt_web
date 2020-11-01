<template>
  <el-dialog
    title="配置角色"
    :visible.sync="dialogVisible"
    @close="dialogClose"
    append-to-body
    width="900px"
  >
    <div style="margin-bottom: 20px;">
      <label for>角色名称：</label>
      <el-input
        style="margin: 0 10px;width:200px"
        placeholder="请输入角色名称"
        v-model="queryInfo.roleName"
        :size="size"
      ></el-input>
      <el-button type="primary" :size="size" @click="query">查询</el-button>
    </div>
    <div class="table-box config-character role-setting">
      <el-table
        :data="tableData"
        ref="table"
        highlight-current-row
        @selection-change="handleSelectionChange"
        height="400"
        border
        :size="size"
        stripe
      >
        <el-table-column type="selection" min-width="10%"></el-table-column>
        <el-table-column property="roleName" label="角色名称" min-width="50%"></el-table-column>
        <el-table-column label="电站类型">
          <template slot-scope="scope">
            <span>{{ scope.row.roleType == 1 ? "项目用户" : "基地用户" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          property="remark"
          label="备注"
          min-width="50%"
        ></el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" :size="size">取 消</el-button>
      <el-button type="primary" @click="submit" :size="size">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
// import pagination from "@/components/Pagination.vue";
export default {
  props: ["selectedRow"],
  components: {},
  data() {
    return {
      size: "small",
      dialogVisible: true,
      tableData: [],
      pageNo: 1,
      pageSize: 99999999999999,
      total: 0,
      queryInfo: {},
      selectedRowData: []
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    dialogClose() {
      this.$parent.dialogTypeName = null;
    },
    query() {
      this.getTableData();
    },
    getTableData() {
      var _this = this;
      this.$fetch("/SystemRole",this.queryInfo ).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.totalCount;
        this.$nextTick(() => {
          _this.tableData.forEach(item => {
            if (item.roleName == _this.selectedRow.roleNames) {
              _this.$refs.table.toggleRowSelection(item);
            }
          });
        });
      });
    },
    handleSelectionChange(selection) {
      this.selectedRowData = selection;

      if (this.selectedRowData.length > 1) {
          this.$message({
            message: "只能选择一个角色",
            type: "warning",
            offset:70
          })
      }
    },
    submit() {
      if (this.selectedRowData.length > 1) {
        this.$message({
          message: "只能选择一个角色",
          type: "warning",
          offset:70
        })
        return false;
      }
      let systemUserRoleDtos = {};
      if (this.selectedRowData.length == 1) {
        systemUserRoleDtos = [
          {
            roleId: this.selectedRowData[0].id,
            userId: this.selectedRow.id
          }
        ];
      }

      this.$post("/SystemUser/SaveUserRoles",{
          userId: this.selectedRow.id,
          systemUserRoleDtos: systemUserRoleDtos
        }
      ).then(() => {
        this.dialogClose();
        this.$emit("Refresh");
      });
    }
  }
};
</script>
<style lang="scss">
.config-character {
  thead .el-table-column--selection .cell {
    display: none;
  }
}
.role-setting span {
  height: 14px;
}
</style>
