<template>
  <el-dialog
    title="菜单配置"
    :visible.sync="dialogVisible"
    @close="dialogClose"
    append-to-body
    width="700px"
    class="setRoleMenu"
  >
    <div>
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        :highlight-current="true"
        @selection-change="handleSelectionChange"
        ref="tree"
        node-key="id"
        :default-checked-keys="defaultCheck"
        style="height:500px;;overflow: auto;"
      ></el-tree>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogClose" size="medium">取 消</el-button>
      <el-button type="primary" @click="onSubmit" size="medium"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ["selectedRow"],
  data() {
    return {
      
      dialogVisible: true,
      size: "medium",
      //数据配置
      data: [],
      // selectedRow: null, //选择行
      defaultCheck: [], //默认选中值
      indenterniateList: [], //菜单不定态列表选择状态
      selectKeys: []
    };
  },
  mounted() {
    this.$post("/SystemMenu/GetMenuTreeNodes/", JSON.stringify(this.selectedRow.id)).then(res => {
      
      this.init(res.data.list)
      this.data = res.data.list;
      this.defaultCheck = res.data.selectList.map(item => {
        return item.toLowerCase();
      });
      // this.indenterniateList = res.data.intenter;
    });
  },
  methods: {
    init(data){
      data.map(item=>{
       this.upperJSONKey(item)
       if(item.child){
         item.children = item.child
         this.init(item.children)
       }
      })
    },

    upperJSONKey(jsonObj){
        for (var key in jsonObj){
            jsonObj[key.toLowerCase()] = jsonObj[key];
            // delete(jsonObj[key]);
        }
        return jsonObj;
    },
    dialogClose() {
      this.$parent.dialogTypeName = null;
    },
    handleSelectionChange() {
      // this.selectedData = val;
    },
    onSubmit() {
      let ids = this.$refs.tree.getCheckedNodes(false, false).map(item => {
        return item.id;
      });
      let indenter = [];
      let indenterList = indenter.length > 0 ? indenter : "noIds";
      this.$post("/SystemRoleMenu/SaveRoleMenu?roleId=" +
          this.selectedRow.id +
          "&menuIds=" +
          ids +
          "&indenterMenuIds=" +
          indenterList
      ).then(() => {
        this.dialogClose();
        this.$emit("updataList");
      });
    }
  }
};
</script>
<style scoped lang="scss">
.custom-tree-node {
  font-size: 14px;
  padding-right: 8px;
}
</style>
