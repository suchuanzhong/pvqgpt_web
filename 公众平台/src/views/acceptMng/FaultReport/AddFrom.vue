<template>
  <el-dialog
    :visible.sync="dialogVisible"
    @close="close"
    width="700px"
    class="dialog-wrap managedialog"
  >
    <div slot="title">
      <span class="title-gradient"> {{ title }} </span>
    </div>
    <div class="wrap faultAdd">
      <div>
        <el-form
          :model="dataFrom"
          :size="size"
          label-width="180px"
          :rules="rules"
          ref="ruleForm"
        >
          <el-row :gutter="20">
             <el-col :span="24">
              <el-form-item
                label="批次名称："
                prop="batch"
                :rules="[
                  { required: true, message: '请选择批次', trigger: 'blur' }
                ]"
              >
                <el-select
                  v-model="dataFrom.batch"
                  placeholder="请选择批次名称"
                  style="width:260px"
                  @change="changePCName"
                >
                  <el-option
                    :label="pro.name"
                    :value="pro.name"
                    v-for="pro in optinedataPC"
                    :key="pro.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="24">
              <el-form-item
                label="基地名称："
                prop="baseId"
                :rules="[
                  { required: true, message: '请选择基地名称', trigger: 'blur' }
                ]"
              >
                <el-select
                  v-model="dataFrom.baseId"
                  placeholder="请选择基地名称"
                  style="width:260px"
                  @change="changeJDName"
                >
                  <el-option
                    :label="pro.name"
                    :value="pro.id"
                    v-for="pro in optinedataJD"
                    :key="pro.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                label="电站名称："
                prop="projectcode"
                :rules="[
                  { required: true, message: '请选择电站名称', trigger: 'blur' }
                ]"
              >
                <el-select
                  v-model="dataFrom.projectcode"
                  placeholder="请选择电站名称"
                  style="width:270px"
                >
                  <el-option
                    :label="pro.projectName"
                    :value="pro.projectCode"
                    v-for="pro in optinedataDZ"
                    :key="pro.projectCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                label="开始时间："
                prop="begintime"
                :rules="[
                  { required: true, message: '请选择开始时间', trigger: 'blur' }
                ]"
              >
                <el-date-picker
                  type="date"
                  placeholder="请选择开始时间"
                  v-model="dataFrom.begintime"
                  :size="size"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  style="width:270px"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                label="结束时间："
                prop="endtime"
                :rules="[{ required: true, message: '请选择结束时间', trigger: 'blur' }]"
              >
                <el-date-picker
                  type="date"
                  placeholder="请选择结束时间"
                  v-model="dataFrom.endtime"
                  :size="size"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  style="width:270px"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="选择故障类型：" required>
                <template>
                  <el-checkbox-group v-model="checkList">
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
                <el-checkbox label="其他" v-model="otherType"></el-checkbox>
                <el-form-item
                  prop="othertype"
                  style="display: inline-block"
                  :rules="[
                    {
                      required: true,
                      message: '请输入其他故障类型',
                      trigger: 'blur'
                    }
                  ]"
                  v-if="otherType"
                >
                  <el-input
                    placeholder="请输入其他故障类型"
                    v-model="dataFrom.othertype"
                    style="width:270px;margin-left:10px;"
                  ></el-input>
                </el-form-item>
                <label style="font-size:12px;color:#f56c6c;position:absolute;bottom: -27px;;left:0;" 
                v-if="showCheckList">
                  请选择故障类型
                </label>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="损失电量（kW.h）："
                prop="electricity"
                :rules="[{ required: true, message: '请输入损失电量', trigger: 'blur' }]">
                <el-input
                  placeholder="请输入损失电量"
                  v-model="dataFrom.electricity"
                  style="width:250px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="受影响装机容量(MW):"
                prop="installedcapacity"
                :rules="[{ required: true, message: '请输入受影响装机容量', trigger: 'blur' }]">
                <el-input
                  placeholder="请输入受影响装机容量"
                  v-model="dataFrom.installedcapacity"
                  style="width:270px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注："
                prop="remark"
                :rules="[{ required: true, message: '请输入备注', trigger: 'blur' }]">
                <el-input
                  type="textarea"
                  placeholder="请输入备注"
                  v-model="dataFrom.remark"
                  style="width:270px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// import LabelName from "@/components/Label";
export default {
  props: ["title", "editData", "btnType"],
  name: "AddFrom",
  components: {},
  data() {
    return {
      otherType: false,
      showCheckList:false,
      dialogVisible: true,
      size: "medium",
      dataFrom: {
        batch:"",//批次名称
        baseId:'',//基地编号
        baseName:'',//基地名称
        projectcode: "",
        projectname: "",
        begintime: "",
        electricity: "",
        endtime: "",
        faulttype: "",
        installedcapacity: "",
        othertype: "",
        remark: ""
      },
      checkList: [],
      optinedataPC:[],//批次数组
      optinedataJD:[],//基地数组
      optinedataDZ: [],//电站数组
      rules: {
        projectcode: [
          { required: true, message: "请选择项目名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    
    this.getSelateData()
  },
  methods: {
    close() {
      this.$parent.dialogTypeName = null;
    },
    getInitData(){
      var _this = this;
      if (_this.btnType == 2) {
        //编辑回填数据
        let url = "/BisFaultReport/" + _this.editData.id;
        _this.$fetch(url).then(res => {
          _this.dataFrom = JSON.parse(JSON.stringify(res.data));
          _this.changePCName(this.dataFrom.batch, "1")
          _this.changeJDName(this.dataFrom.baseId, "1")
          try {
            _this.checkList = _this.dataFrom.faulttype.split(",");
          } catch (e) {
            _this.checkList = [];
          }
          _this.otherType = _this.dataFrom.othertype ? true : false;
        });
      }
    },
    //获取批次数据
    getSelateData() {
      this.$fetch("/MtrBase/GetBatchBaseTree").then(res => {
        this.optinedataPC = res.data;
        this.optinedataJD = res.data[0].childTreeNode;
        this.getInitData()
      });
    },
    //选择批次后修改基地
    changePCName(data,loadCount) {
      //清除基地名称项目名称
      if (loadCount != "1") {
        this.dataFrom.baseId = ""
        this.dataFrom.projectcode = ""
        this.dataFrom.projectname = ""
        this.optinedataJD = [];
        this.optinedataDZ = []; 
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
        this.dataFrom.projectcode = ""
        this.dataFrom.projectname = ""
        this.optinedataDZ = [];
      }
      this.$fetch( "/RealTimeData/GetProList?baseid="+val).then(res => {
        if (res.data && res.data.length > 0) this.optinedataDZ = res.data;
      });
    },
    submit() {
      var faulttype = this.checkList.join(",");
     
      var _this = this;
      _this.dataFrom.faulttype = faulttype;
      if(!_this.otherType){
        _this.dataFrom.otherType=""
      }
      _this.optinedataDZ.forEach(item => {
        if (item.projectCode == _this.dataFrom.projectcode) {
          _this.dataFrom.projectname = item.projectName;
        }
      });
      _this.optinedataJD.forEach(item => {
        if (item.id == _this.dataFrom.baseId) {
          _this.dataFrom.baseName = item.name;
        }
      });
      this.$refs.ruleForm.validate(valid => {
        if (valid && (_this.dataFrom.faulttype||_this.otherType)) {
          
          if (_this.btnType == 1) {
            let url = "/BisFaultReport";
            _this.$post(url, JSON.stringify(_this.dataFrom)).then(() => {
                this.close();
                this.$parent.Refresh();
              });
          } else if (_this.btnType == 2) {
            let url = "/BisFaultReport/" + _this.dataFrom.id;
            _this.$post(url,JSON.stringify(_this.dataFrom)).then(() => {
                this.close();
                this.$parent.Refresh();
              });
          }
        }else{
          if(_this.dataFrom.faulttype||_this.otherType){
            this.showCheckList=false
          }else{
            this.showCheckList=true
          }
          
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
<style lang="scss">
.faultAdd {
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #1bac6b !important;
  }
}
</style>
