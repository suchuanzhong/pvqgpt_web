<template id="systemMenu">
  <div class="whole Wrap">
    <main class="view-box flex-column">
      <ul class="operateList">
        <li class="operateBtn" @click="openFormPage(true, 1)">
          <img src="../../../assets/img/add.png" height="20" width="20" /><span
            class="operateTitle"
            >添加主菜单</span
          >
        </li>
        <li class="operateBtn" @click="openFormPage(true, 2)">
          <img src="../../../assets/img/add.png" height="20" width="20" /><span
            class="operateTitle"
            >添加子菜单</span
          >
        </li>
        <li class="operateBtn" @click="openFormPage(true, 3)">
          <img src="../../../assets/img/eidt.png" height="20" width="20" /><span
            class="operateTitle"
            >编辑</span
          >
        </li>
        <li class="operateBtn" @click="DeleteMenu()">
          <img
            src="../../../assets/img/delete.png"
            height="20"
            width="20"
          /><span class="operateTitle">删除</span>
        </li>
      </ul>
      <div class="table-box tableData formcls" style="height:calc(100% - 80px)">
        <el-table
          :data="tableData"
          highlight-current-row
          class="table"
          style="width: 100%;margin-top:10px"
          @current-change="handleCurrentChange"
          stripe
          size="medium"
          border
          ref="table"
          row-key="id"
        >
          <el-table-column label="值名称" width="250" class="name">
            <template slot-scope="scope">
              <el-button
                :style="SetRowHeadLeft(scope.row)"
                @click="InsertTr(scope.$index, scope.row, scope)"
                type="text"
                showType="(0)"
                :class="scope.row.class"
              ></el-button>
              {{ scope.row.menuName }}
            </template>
          </el-table-column>
          <el-table-column
            property="sort"
            label="排序"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            property="menuCode"
            label="编码"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            property="menuUrl"
            label="Url地址"
            show-overflow-tooltip
            min-width="200"
          >
          </el-table-column>
          <el-table-column
            property="pathUrl"
            label="路径"
            show-overflow-tooltip
            min-width="300"
          >
          </el-table-column>
          <el-table-column
            property="enable"
            label="是否显示"
            show-overflow-tooltip
            width="100"
          >
            <span slot-scope="scope">{{ scope.row.enable ? "是" : "否" }}</span>
          </el-table-column>
          <el-table-column property="remark" label="备注" show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <component
        :is="dialogTypeName"
        :title="dialogName"
        :editData="editData"
        :btnType="btnType"
        :menuPid="menuPid"
        :level="level"
        ref="form"
        @Refresh="Refresh"
      ></component>
    </main>
  </div>
</template>
<script>
import Form from "./Form/Form.vue";

export default {
  components: {
    // pageBox,
    Form
    // queryForm
  },
  data() {
    return {
      dialogTypeName: null,
      pageInfo: {
        page: 1,
        pageSize: 9999
      },
      queryInfo: {},
      tableData: [],
      DiallogVisible: false,
      btnType: -1,
      level: 1,
      selectedRow: null,
      tableHeight: null,
      editData: {
        menuName: "",
        menuCode: "",
        menuUrl: "",
        pathUrl: "",
        icon: "",
        level: 1,
        createTime: "",
        hasChild: false,
        enabled: true,
        isManagement:0,
        sortId: 1,
        menuPid: null,
        statusValue: true,
        version: ""
      },
      menuPid: null,
      buttonPageState: false,
      dialogName: ""
    };
  },
  mounted() {
    this.Refresh();
  },
  methods: {
    Refresh() {
      let that = this;
      this.$fetch("/SystemMenu/GetUserMenus?type=1").then(tree => {
        that.tableData = [];
        this.HandleTreeGrid(tree.data, that.tableData);
        that.tableData.forEach(item => {
          item.class = that.GetIsOpenClass(item);
        });
      });
    },
    //添加或编辑权限
    openFormPage(state, type) {
      if (type > 1) {
        if (this.selectedRow == null) {
          this.$message({
            message: "请选择数据",
            type: "error",
            offset:70
          })
          return;
        } else if (type == 3) {
          this.dialogName = "编辑";
          this.SetFormData(type);
        }
      }
      if (type == 2) {
        this.level = this.selectedRow.menuLevel + 1;
        this.menuPid = this.selectedRow.id;
        this.dialogName = "新增子级";
      }
      if (type == 1) {
        this.menuLevel = 1;
        this.menuPid = null;
        this.dialogName = "新增";
      }
      this.dialogTypeName = "Form";
      this.btnType = type;
    },

    DeleteMenu() {
      if (this.selectedRow == null) {
          this.$message({
            message: "请选择数据",
            type: "error",
            offset:70
          })
        return;
      } else if (this.selectedRow.child && this.selectedRow.child.length > 0) {
        this.$message({
          message: "警告，请先删除子节点",
          type: "warning",
          offset:70
        });
      } else {
        this.$confirm("是否删除当前数据？", "提示", {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$delete("/SystemMenu/" + this.selectedRow.id).then(() => {
            this.Refresh();
          });
        });
      }
    },
    handleCurrentChange(val) {
      this.selectedRow = val;
    },
    //编辑
    SetFormData() {
      this.$fetch("/SystemMenu/" + this.selectedRow.id).then(data => {
        this.editData = data.data;
      });
    },

    HandleTreeGrid(treeNode, menuList) {
      // console.log(treeNode,menuList)
      for (var item of treeNode) {
        menuList.push(item.attributes.data);
        if (item.child != null) {
          if (item.attributes.data.hasChild && item.child.length > 0) {
            if (item.attributes.data.childs == undefined||item.attributes.data.childs == null) {
              item.attributes.data.childs = [];
            }
            item.attributes.data.isOpen = true;

            item.child.forEach(node => {
              item.attributes.data.childs.push(node.attributes.data);
            });
            this.HandleTreeGrid(item.child, menuList);
          }
        }
      }
    },

    GetIsOpenClass(row) {
      if (row.hasChild) {
        return {
          "el-icon-arrow-down": row.isOpen != undefined && row.isOpen == true,
          "el-icon-arrow-right": row.isOpen == undefined || row.isOpen == false
        };
      } else {
        return {
          iocClose: true
        };
      }
    },
    InsertTr(index, row) {
      if (row.isOpen == undefined || row.isOpen == false) {
        if (row.childs.length > 0) {
          this.InsertChildTableData(index, row);
        } else {
          // this.GetChild(index, row);
        }
      } else {
        if (row.childs != undefined) {
          if (row.childs.length > 0) {
            this.RemoveChildTableData(index, row);
          }
        }
      }
    },
    InsertChildTableData(index, row) {
      this.HandleAddChild(index, row);
      if (row.childs.length == 0) {
        row.hasChild = false;
      }
      row.isOpen = true;
      row.class = this.GetIsOpenClass(row);
    },
    RemoveChildTableData(index, row) {
      let num = this.HandleRowChildCount(row);
      this.tableData.splice(index + 1, num);
      row.isOpen = false;
      row.class = this.GetIsOpenClass(row);
    },
    HandleAddChild(index, row) {
      if (row.childs.length > 0) {
        row.childs.forEach(item => {
          index = index + 1;
          this.tableData.splice(index, 0, item);
          if (item.isOpen && item.childs != undefined) {
            index = this.HandleAddChild(index, item);
          }
        });

        return index;
      }
    },
    HandleRowChildCount(row) {
      if (row.childs != undefined && row.isOpen) {
        if (row.childs.length > 0) {
          let i = parseInt(row.childs.length);
          row.childs.forEach(item => {
            i = i + this.HandleRowChildCount(item);
          });
          return i;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
    // GetIsOpenClass(row) {
    //   if (row.hasChild) {
    //     return {
    //       "el-icon-arrow-down": row.isOpen != undefined && row.isOpen == true,
    //       "el-icon-arrow-right": row.isOpen == undefined || row.isOpen == false
    //     };
    //   } else {
    //     return {
    //       iocClose: true
    //     };
    //   }
    // },

    SetRowHeadLeft(row) {
      return {
        "margin-left": (parseInt(row.menuLevel) - 1) * 20 + "px",
        "margin-right": parseInt(row.menuLevel) * 5 + "px"
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.el-button--text {
  color: #1bac6b !important;
}
.el-table .el-button--text {
  padding: 2px 0 !important;
}
.Wrap {
  padding-bottom: 0;
}
</style>

<style lang="scss">
.el-tooltip__popper {
  font-size: 14px;
  max-width: 24%;
  position: relative;
  right: 72px;
  background-color: #8dd5b5 !important;
}
</style>
