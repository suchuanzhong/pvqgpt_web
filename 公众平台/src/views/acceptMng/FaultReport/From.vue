<template>
  <el-dialog
    :visible.sync="dialogVisible"
    @close="close"
    width="700px"
    class="dialog-wrap"
  >
    <div slot="title">
      <span class="title-gradient"> 详情查看 </span>
    </div>
    <div class="wrap faultFrom">
      <div>
        <el-form
          :model="form"
          :size="size"
          label-width="180px"
          :rules="rules"
          ref="ruleForm"
        >
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="批次名称：">
                <el-input
                  v-model="form.batch"
                  disabled
                  style="width:270px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="基地名称：">
                <el-input
                  v-model="form.baseName"
                  disabled
                  style="width:270px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="项目名称：">
                <el-input
                  v-model="form.projectname"
                  disabled
                  style="width:270px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="开始时间：">
                <el-date-picker
                  type="date"
                  placeholder="请选择检查时间"
                  disabled
                  style="width:270px"
                  v-model="form.begintime"
                  :size="size"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="结束时间：">
                <el-date-picker
                  type="date"
                  placeholder="请选择检查时间"
                  disabled
                  style="width:270px"
                  v-model="form.endtime"
                  :size="size"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="选择故障类型：">
                <template>
                  <el-checkbox-group disabled v-model="checkList">
                    <el-checkbox label="逆变器"></el-checkbox>
                    <el-checkbox label="组件"></el-checkbox>
                    <el-checkbox label="汇流箱"></el-checkbox>
                    <el-checkbox label="直流电缆"></el-checkbox>
                    <el-checkbox
                      label="交流电缆"
                      style="margin-left: 10px !important;"
                    ></el-checkbox>
                    <el-checkbox
                      label="变压器"
                      style="margin-left: 0px !important;"
                    ></el-checkbox>
                    <el-checkbox label="箱变"></el-checkbox>
                    <el-checkbox label="断路器"></el-checkbox>
                    <el-checkbox label="SVG"></el-checkbox>
                    <el-checkbox label="AGC"></el-checkbox>
                  </el-checkbox-group>
                </template>
                其他：
                <el-input
                  disabled
                  v-model="form.othertype"
                  style="width:270px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="损失电量（kWh）：">
                <el-input
                  disabled
                  v-model="form.electricity"
                  style="width:270px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="受影响装机容量（MW）：">
                <el-input
                  disabled
                  v-model="form.installedcapacity"
                  style="width:270px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注：">
                <el-input
                  type="textarea"
                  disabled
                  v-model="form.remark"
                  style="width:270px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: ["editData"],
  name: "AddFrom",
  data() {
    return {
      dialogVisible: true,
      size: "medium",
      form: {
        projectcode: "",
        begintime: "",
        electricity: "",
        endtime: "",
        faulttype: "",
        installedcapacity: "",
        othertype: "",
        projectname: "",
        remark: ""
      },
      checkList: [],
      prolist: [],
      rules: {
        projectcode: [
          { required: true, message: "请选择项目名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.editData));
    this.checkList = this.form.faulttype.split(",");
  },
  methods: {
    close() {
      this.$parent.dialogTypeName = null;
    }
  }
};
</script>
<style lang="scss" scoped></style>
<style lang="scss">
.faultFrom {
  .el-checkbox__input.is-checked + .el-checkbox__label {
    // color: #ffffff !important;
  }
  .el-checkbox__input.is-disabled+span.el-checkbox__label {
    color: #666;
    cursor: not-allowed;
  }
}
</style>
