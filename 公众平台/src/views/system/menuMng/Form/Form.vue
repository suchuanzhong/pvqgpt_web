<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="600px"
    @close="dialogClose"
    class="managedialog"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="130px"
      :rules="rules"
      size="medium"
    >
      <el-form-item label="名称:" prop="menuName">
        <el-input v-model="form.menuName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="编码:">
        <el-input v-model="form.menuCode" placeholder="请输入编码"></el-input>
      </el-form-item>
      <el-form-item label="排序:">
        <el-input v-model="form.sort" placeholder="请输入序号"></el-input>
      </el-form-item>
      <el-form-item label="Url:">
        <el-input v-model="form.menuUrl" placeholder="请输入Url"></el-input>
      </el-form-item>
      <el-form-item label="路径:">
        <el-input v-model="form.pathUrl" placeholder="请输入路径"></el-input>
      </el-form-item>
      <el-form-item label="图标:">
        <el-input v-model="form.icon" placeholder="请输入图标"></el-input>
      </el-form-item>
      <el-form-item label="是否显示:">
        <el-radio v-model="form.enable" :label="true">是</el-radio>
        <el-radio v-model="form.enable" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="是否是管理系统:">
        <el-radio v-model="form.isManageMent" :label="1">是</el-radio>
        <el-radio v-model="form.isManageMent" :label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input
          v-model="form.remark"
          placeholder="请输入备注"
          type="textarea"
          :rows="2"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
      <el-button type="primary" @click="OnSubmit" size="medium"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      form: {
        statusValue: 0,
        menuName: "",
        menuCode: "",
        menuUrl: "",
        pathUrl: "",
        remark: "",
        hasChild: false,
        icon: "",
        path: "",
        sort: "",
        menuLevel: 1,
        enable: true,
        isManageMent:0
      },
      dialogVisible: true,
      inputVisible: false,
      inputValue: {},
      rules: {
        menuName: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: ["title", "btnType", "menuPid", "level", "editData"],
  mounted() {
    if (this.btnType == 3) {
      //编辑
      this.form = this.editData;
    } else if (this.btnType == 2) {
      //新增子节点
      this.form.menuLevel = this.level;
      this.form.menuPid = this.menuPid;
    }
  },
  methods: {
    dialogClose() {
      this.$parent.dialogTypeName = null;
    },
    OnSubmit() {
      if (this.form.menuName == "") {
        return false;
      } else {
        this.save();
      }
    },
    save() {
      let apiAction = this.btnType < 3 ? "/SystemMenu/AddMenu" : "/SystemMenu/UpdateMenu";
      this.$post( apiAction,this.form).then(() => {
        this.$emit("Refresh");
        this.dialogClose();
      });
    }
  },
  watch: {
    editData: function(newVal) {
      this.form = newVal;
    },
    menuPid: function(newVal) {
      this.form.menuPid = newVal;
    },
    level: function(newVal) {
      this.form.level = newVal;
    }
  }
};
</script>
<style lang="scss">
  .managedialog .el-dialog__header .el-dialog__title {
      color: #1da63b;
  }
</style>
<style scoped>

.el-input {
  width: 100%;
}
</style>
