<template>
  <el-dialog
    title="编辑角色"
    :visible.sync="dialogVisible"
    @close="dialogClose"
    append-to-body
    width="500px"
    class="managedialog"
  >
    <el-form
      ref="form"
      style="padding-right:20px"
      :rules="rules"
      :model="data"
      label-width="100px"
      label-position="right"
      size="medium"
    >
      <el-form-item label="角色名称:" prop="roleName">
        <el-input
          v-model="data.roleName"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色类型:">
        <el-select v-model="data.roleType">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input
          v-model="data.remark"
          type="textarea"
          placeholder="请输入备注"
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
  props: ["selectedRow"],
  data() {
    return {
      data: {},
      dialogVisible: true,
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur"
          }
        ]
      },
      initData: {},
      options: [
        { label: "项目用户", value: 1 },
        { label: "基地用户", value: 0 }
      ]
    };
  },
  mounted() {
    this.data = JSON.parse(JSON.stringify(this.selectedRow));
    if (this.data.roleType == 1) {
      //1--项目用户，其他为基地用户，用0表示
      this.$set(this.data, "roleType", 1);
    } else {
      this.$set(this.data, "roleType", 0);
    }
  },
  methods: {
    dialogClose() {
      this.$parent.dialogTypeName = null;
    },
    OnSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$post("/SystemRole/UpdateRole", this.data).then(() => {
            this.dialogClose();
            this.$message({
              message: "修改成功",
              type: "sucess",
              offset:70
            })
            this.$emit("Refresh");
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.managedialog{
    .el-select {
        // width: 100%;
        .el-input{
            display: inline-block !important;
            top: 0 !important;
        }
    }
  }
</style>
