<template>
  <el-dialog
    title="新增人员"
    :visible.sync="dialogVisible"
    @close="dialogClose"
    append-to-body
    width="650px"
    class="managedialog"
  >
    <div class="userform">
      <el-form
        ref="userform"
        style="width:100%;"
        :model="userData"
        label-width="100px"
        inline
        size="medium"
        :rules="rules"
        label-position="right"
      >
        <el-form-item label="用户账号:" prop="userName">
          <el-input
            v-model="userData.userName"
            placeholder="请输入用户账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="管理员:">
          <el-checkbox v-model="userData.isSuper"></el-checkbox>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            v-model="userData.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="secondPassword">
          <el-input
            v-model="userData.secondPassword"
            type="password"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>

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
        <el-form-item label="电话: " prop="phone">
          <el-input
            v-model="userData.phone"
            placeholder="请输入电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="积分: " prop="integral">
          <el-input
            v-model="userData.integral"
            placeholder="请输入积分"
          ></el-input>
        </el-form-item>
        
        <el-form-item label="基地批次: " prop="batch">
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
        <el-form-item label="所属基地: " prop="baseId">
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
export default {
  data() {
    var checkPassword = (rule, value, callback) => {
      if (this.userData.password != this.userData.secondPassword) {
        return callback(new Error("密码和确认密码不一致"));
      } else {
        callback();
      }
    };
    return {
      stationPro: [],
      optinedataPC:[],//批次数组
      optinedataJD:[],//基地数组
      optinedataDZ: [],//电站数组
      dialogVisible: true,
      userData: {
        userName: "",
        isSuper: false,
        password: "",
        secondPassword: "",
        staffName: "",
        sex: "",
        phone: "",
        integral:"",
        age: "",
        batch:"",//批次名称
        baseId:'',//基地编号
        baseName:'',//基地名称
        projects: ""//电站
      },
      
      sexList: [],
      educationList: [],
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        secondPassword: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "blur"
          },
          {
            validator: checkPassword,
            trigger: "blur"
          }
        ],
        staffName: [
          {
            required: true,
            message: "请输入人员名称",
            trigger: "blur"
          }
        ],
        age: [
          {
            required: true,
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
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur"
          }
        ],
        phone: [
          {
              required: true,
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
        ],
        integral: [
          {
            required: true,
            message: "请填写积分",
            trigger: "blur"
          }
        ],
        batch: [
          {
            required: true,
            message: "请选择基地批次",
            trigger: "blur"
          }
        ],
        baseId: [
          {
            required: true,
            message: "请选择所属基地",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
      this.getSelateData();//获取批次
  },
  methods: {
    //获取批次数据
    getSelateData() {
      this.$fetch("/MtrBase/GetBatchBaseTree").then(res => {
        this.optinedataPC = res.data;
        this.optinedataJD = res.data[0].childTreeNode;
      });
    },
    //选择批次后修改基地
    changePCName(data) {
      //清除基地名称项目名称
      this.userData.baseId = ""
      this.userData.projects = ""
      this.optinedataJD = [];
      this.optinedataDZ = [];
      this.stationPro = []
      this.optinedataPC.map(item => {
        if (item.name == data) {
          this.optinedataJD = item.childTreeNode;
        }
      });
    },
    //选择基地名称
    changeJDName(val){
      //清除电站名称
      this.userData.projects = ""
      this.optinedataDZ = [];
      this.stationPro = []
      this.$fetch( "/RealTimeData/GetProList?baseid="+val).then(res => {
        if (res.data && res.data.length > 0) this.optinedataDZ = res.data;
      });
    },
    dialogClose() {
      this.$parent.dialogTypeName = null;
    },

    CheckValue() {
      this.$refs["userform"].validate(valid => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    submit() {
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
      this.$post("/SystemUser/Add",this.userData).then(() => {
        this.$emit("Refresh");
        this.dialogClose();
      });
    },
    Hiden() {
      this.$emit("Show", false);
    }
  }
};
</script>
<style scoped>
/* .el-input,.el-select{
  width: 180px;
} */
#age .el-form-item__label::before {
  content: "*";
  color: #ff4949;
  margin-right: 4px;
}
</style>
<style lang="scss" scoped>
.userform {
  width: 650px;
  .el-form-item__content {
    line-height: 0px;
    position: relative;
    font-size: 14px;
  }
}
</style>
<style lang="scss">
.managedialog{
    .el-select {
        // width: 100%;
        .el-input{
            display: inline-block !important;
            top: 0 !important;
        }
    }
    .el-dialog .el-dialog__body {
        padding: 30px !important;
        font-size: 16px;
    }
  }
.userform {
  .el-input {
    width: 185px;
  }
}
</style>
