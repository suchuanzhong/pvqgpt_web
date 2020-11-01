<template>
  <el-dialog
    title="编辑人员"
    :visible.sync="dialogVisible"
    @close="dialogClose"
    append-to-body
    width="670px"
    class="managedialog"
  >
    <div class="editUserInfo">
      <el-form
        ref="staffform"
        style="width:100%;"
        :model="userData"
        label-width="100px"
        inline
        size="medium"
        :rules="rules"
      >
        <el-form-item label="人员名称:" prop="staffName">
          <el-input
            v-model="userData.staffName"
            placeholder="请输入人员名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-radio v-model="userData.sex" label="男">男</el-radio>
          <el-radio v-model="userData.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄:" prop="age">
          <el-input
            type="age"
            v-model="userData.age"
            placeholder="请输入年龄"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input v-model="userData.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="积分:" prop="integral">
          <el-input v-model="userData.integral" placeholder="请输入积分"></el-input>
        </el-form-item>
         <el-form-item label="基地批次: ">
          <el-select
            v-model="userData.batch"
            collapse-tags
            placeholder="请选择基地批次"
            @change="changePCName"
          >
            <el-option
              v-for="item in optinedataPC"
              :label="item.name"
              :value="item.name"
              :key="item.projectName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属基地: ">
          <el-select
            v-model="userData.baseId"
            collapse-tags
            placeholder="请选择所属基地"
            @change="changeJDName"
          >
            <el-option
              v-for="item in optinedataJD"
              :label="item.name"
              :value="item.id"
              :key="item.projectName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input
            type="textarea"
            v-model="userData.remark"
            placeholder="请输入备注"
            :rows="3"
            style="width:480px"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
      <el-button type="primary" @click="CheckValue" size="medium"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
// import validateRule from "@/plugins/validate";
export default {
  props: ["selectedRow"],
  data() {

    return {
      stationPro: [],
      optinedataPC:[],//批次数组
      optinedataJD:[],//基地数组
      optinedataDZ: [],//电站数组
      dialogVisible: true,
      userData: {},
      data: {},
      sexList: [],
      educationList: [],
      rules: {
        staffName: [
          {
            required: true,
            message: "请输入人员名称",
            trigger: "blur"
          }
        ],
        age: [
          {
            type: "number",
            message: "请填写1-100的数值",
            trigger: "blur",
            transform(value) {
              let age = Number.parseInt(value);
              if (value != "") {
                if (age <= 0 || age > 100) {
                  return false;
                } else {
                  return age;
                }
              }
            }
          }
        ],
        sexId: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ],
        educationId: [
          {
            required: true,
            message: "请选择学历",
            trigger: "change"
          }
        ],
        phone: [
          {
            type: "number",
            message: "请填写正确的手机号码",
            trigger: "blur",
            transform(value) {
              let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
              if (value != "") {
                if (!reg.test(value)) {
                  return false;
                } else {
                  return Number(value);
                }
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.getSelateData();
    // this.data = JSON.parse(JSON.stringify(this.selectedRow));
    
  },
  methods: {
    //获取编辑数据
    getinitData(){
      this.$fetch( "/SystemUser/" + this.selectedRow.id).then(res => {
        this.userData = res.data;
        this.changePCName(this.userData.batch, "1")
        this.changeJDName(this.userData.baseId, "1")
        let pro = res.userData.projects;
        if (pro) {
          if (pro.indexOf(";") > -1) {
            this.stationPro = pro.split(";");
          } else {
            this.stationPro.push(pro);
          }
        }
      });
    },
    //获取批次数据
    getSelateData() {
      this.$fetch("/MtrBase/GetBatchBaseTree").then(res => {
        this.optinedataPC = res.data;
        this.optinedataJD = res.data[0].childTreeNode;
        this.getinitData()
      });
    },
    //选择批次后修改基地
    changePCName(data,loadCount) {
      //清除基地名称项目名称
      if (loadCount != "1") {
        this.userData.baseId = ""
        this.userData.projects = ""
        this.optinedataJD = [];
        this.optinedataDZ = [];
        this.stationPro = []
      }
      this.optinedataPC.map(item => {
        if (item.name == data) {
          this.optinedataJD = item.childTreeNode;
        }
      });
    },
    //选择基地名称
    changeJDName(val,loadCount){
      //清除电站名称
      if (loadCount != "1") {
        this.userData.projects = ""
        this.optinedataDZ = [];
        this.stationPro = []
      }
      this.$fetch( "/RealTimeData/GetProList?baseid="+val).then(res => {
        if (res.data && res.data.length > 0) this.optinedataDZ = res.data;
      });
    },
    dialogClose() {
      this.$parent.dialogTypeName = null;
    },
    CheckValue() {
      this.$refs["staffform"].validate(valid => {
        if (valid) {
          this.submit();
        } else return false;
      });
    },
    submit() {
      this.userData.projects = "";
      if (this.userData.age && this.userData.age != "") {
        this.userData.age = Number(this.userData.age);
      }
      if (this.stationPro && this.stationPro.length > 0) {
        this.userData.projects = this.stationPro.join(";");
      }
        this.optinedataJD.forEach(item => {
        if (item.id == this.userData.baseId) {
          this.userData.baseName = item.name;
        }
      });
      this.$post("/SystemUser/UpdateUser", this.userData).then(() => {
        this.$emit("Refresh");
        this.$message({
          message: "编辑成功",
          type: "sucess",
          offset:70
        })
        this.$parent.dialogTypeName = null;
      });
    }
  }
};
</script>
<style lang="scss">
.editUserInfo{
    .el-select {
        // width: 100%;
        .el-input{
            display: inline-block !important;
            top: 0 !important;
        }
    }
  }
.editUserInfo {
  .el-input {
    width: 185px;
  }
}
</style>
