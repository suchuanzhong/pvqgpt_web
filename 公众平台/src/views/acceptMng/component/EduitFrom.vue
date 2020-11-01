<template>
  <el-dialog
    :visible.sync="dialogVisible"
    @close="close"
    width="900px"
    class="dialog-wrap managedialog"
  >
    <div slot="title">
      <span class="title-gradient">编辑</span>
    </div>
    <div class="wrap multiTypeUpload">
      <div>
        <el-form
          :size="size"
          label-width="150px"
          :model="dataFrom"
          ref="dataForm"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="批次名称："
                prop="batch"
                :rules="[{ required: true, message: '请选择批次', trigger: 'blur' }]"
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
            <el-col :span="12">
              <el-form-item
                label="基地名称："
                prop="baseId"
                :rules="[{ required: true, message: '请选择基地名称', trigger: 'blur' }]"
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
            <el-col :span="12">
              <el-form-item
                label="电站名称："
                prop="projectcode"
                :rules="[{ required: true, message: '请选择电站名称', trigger: 'blur' }]"
              >
                <el-select
                  v-model="dataFrom.projectcode"
                  placeholder="请选择电站名称"
                  style="width:260px"
                  @change="changeProName"
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
            <el-col :span="12">
              <el-form-item label="装机容量：">
                <el-input
                  placeholder="请输入装机容量"
                  v-model="dataFrom.dataList[0].datavalue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="检查时间："
                prop="checktime"
                :rules="[
                  { required: true, message: '请选择检查时间', trigger: 'blur' }
                ]"
              >
                <el-date-picker
                  type="date"
                  placeholder="请选择检查时间"
                  v-model="dataFrom.checktime"
                  :size="size"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  style="width:260px"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查地点：">
                <el-input
                  placeholder="请输入检查地点"
                  v-model="dataFrom.dataList[1].datavalue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组件型号：">
                <el-select
                  v-model="dataFrom.modelid"
                  placeholder="请输入组件型号"
                  style="width:260px"
                  @change="changeComType"
                >
                  <el-option
                    :label="mol.model + '(' + mol.factor + ')'"
                    :value="mol.pvstringcode"
                    v-for="mol in modelList"
                    :key="mol.pvstringcode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="制造商：">
                <el-input
                  placeholder="请输入制造商"
                  v-model="dataFrom.dataList[2].datavalue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组件编号：">
                <el-input
                  placeholder="请输入组件编号"
                  v-model="dataFrom.modelcode"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组件认证监测情况：">
                <el-input
                  placeholder="请输入组件认证监测情况"
                  v-model="dataFrom.dataList[3].datavalue"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="section2 form-label-2">
        <el-form :size="size">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item>
                <div class="form-label2">
                  <p>国家批准认证机构出具的检测认证报告和证书：</p>
                  <p>(报告、单位、有效期)</p>
                </div>
                <div>
                  <el-upload
                    style="display: inline-block;"
                    ref="multiUpload4"
                    :headers="upconfig.header"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    accept=".doc, .docx, .xls, .xlsx"
                    name="formfile"
                    multiple
                    :show-file-list="false"
                    :on-success="onloadsuccess1"
                    :beforeUpload="beforeUpload"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
              <template>
                <div
                  v-for="(item, num1) in fileList4"
                  :key="num1"
                  class="multiplyUp"
                >
                  <span v-if="item">{{ item.split("\\")[2] }}</span>
                  <a v-if="item" @click="deletefile(4, num1)">删除</a>
                </div>
              </template>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <div class="form-label2">
                  <p>设备出厂合格证、出厂检测报告、采购协议：</p>
                  <p></p>
                </div>
                <div>
                  <el-upload
                    style="display: inline-block;"
                    ref="multiUpload5"
                    :headers="upconfig.header"
                    name="formfile"
                    :action="upconfig.uploadurl"
                    :show-file-list="false"
                    :before-remove="beforeRemove"
                    accept=".doc, .docx, .xls, .xlsx"
                    multiple
                    :on-success="onloadsuccess2"
                    :beforeUpload="beforeUpload"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
              <template v-if="fileList5.length > 0">
                <div
                  v-for="(item, num2) in fileList5"
                  :key="num2"
                  class="multiplyUp"
                >
                  <span v-if="item">{{ item.split("\\")[2] }}</span>
                  <a v-if="item" @click="deletefile(5, num2)">删除</a>
                </div>
              </template>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <div class="form-label2">
                  <p>到货验收报告完整性检查：</p>
                  <p>(报告编号、单位)</p>
                </div>
                <div>
                  <el-upload
                    style="display: inline-block;"
                    ref="multiUpload6"
                    :headers="upconfig.header"
                    :action="upconfig.uploadurl"
                    :show-file-list="false"
                    name="formfile"
                    :before-remove="beforeRemove"
                    accept=".doc, .docx, .xls, .xlsx"
                    multiple
                    :on-success="oonloadauccess3"
                    :beforeUpload="beforeUpload"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
              <template v-if="fileList6.length > 0">
                <div
                  v-for="(item, num3) in fileList6"
                  :key="num3"
                  class="multiplyUp"
                >
                  <span v-if="item">{{ item.split("\\")[2] }}</span>
                  <a v-if="item" @click="deletefile(6, num3)">删除</a>
                </div>
              </template>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <div class="form-label2">
                  <p>组件更换记录文件：</p>
                  <p>(报告编号、单位)</p>
                </div>
                <div>
                  <el-upload
                    style="display: inline-block;"
                    ref="multiUpload7"
                    :headers="upconfig.header"
                    name="formfile"
                    :action="upconfig.uploadurl"
                    :show-file-list="false"
                    :before-remove="beforeRemove"
                    accept=".doc, .docx, .xls, .xlsx"
                    multiple
                    :on-success="onloadsuccess4"
                    :beforeUpload="beforeUpload"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
              <template v-if="fileList7.length > 0">
                <div
                  v-for="(item, num4) in fileList7"
                  :key="num4"
                  class="multiplyUp"
                >
                  <span v-if="item">{{ item.split("\\")[2] }}</span>
                  <a v-if="item" @click="deletefile(7, num4)">删除</a>
                </div>
              </template>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div></div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import $ from "jquery";
export default {
  props: ["detailData"],
  name: "AddFrom",
  components: {},
  data() {
    return {
      dialogVisible: true,
      size: "medium",
      optinedataPC:[],//批次数组
      optinedataJD:[],//基地数组
      optinedataDZ: [],//电站数组
      modelList: [], //组件型号
      dataFrom: {
        checktime: "",
        dataList: [
          { itemkey: "zjrl", itemname: "装机容量", datavalue: "" },
          { itemkey: "jcdd", itemname: "检查地点", datavalue: "" },
          { itemkey: "zzs", itemname: "制造商", datavalue: "" },
          { itemkey: "zjrzjcqk", itemname: "组件认证监测情况", datavalue: "" },
          {
            itemkey: "jcrzbg",
            itemname: "国家批准认证机构出具的检测认证报告和证书",
            datavalue: ""
          },
          {
            itemkey: "sbcchgz",
            itemname: "设备出厂合格证、出厂检测报告、采购协议",
            datavalue: ""
          },
          {
            itemkey: "bgwzxjc",
            itemname: "到货验收报告完整性检查",
            datavalue: ""
          },
          { itemkey: "zjghjlwj", itemname: "组件更换记录文件", datavalue: "" }
        ],
        modelcode: "",
        modelid: "",
        batch:"",//批次名称
        baseId:'',//基地编号
        projectcode: "",
        projectname: "",
        createtime: "",
        id: "",
        version: ""
      },
      upconfig: { header: { Authorization: "" }, uploadurl: "" },
      fileList4: [],
      fileList5: [],
      fileList6: [],
      fileList7: []
    };
  },
  mounted() {
    this.getcommonURL(); //获取上传地址
    this.getSelateData();//获取批次
    let token = sessionStorage.getItem("token");
    if (token) {
      this.upconfig.header = { Authorization: "Bearer" + " " + token };
    }
   
  },
  methods: {
    getcommonURL() {
      $.ajax({
        url: "/config.json",
        type: "get",
        success: res => {
          // api = res.baseURL
          this.upconfig.uploadurl =
            res.baseURL + "ManagerApi/BisProjectqualityreport/upload"; //上传地址
        }
      });
    },
    //获取初始化数据
    getInitData(){
      var _this = this;
      var url = "/BisComponentAcceptance/GetInfoById";
      _this.$fetchGet({ url, params: { id: _this.detailData.id } }).then(res => {
        _this.dataFrom.checktime = res.data.checktime;
        _this.dataFrom.modelcode = res.data.modelcode;
        _this.dataFrom.modelid = res.data.modelid;
        _this.dataFrom.baseId = res.data.baseId;
        _this.dataFrom.batch = res.data.batch;
        _this.dataFrom.projectcode = res.data.projectcode;
        _this.dataFrom.projectname = res.data.projectname;
        _this.dataFrom.createtime = res.data.createtime;
        _this.dataFrom.id = res.data.id;
        _this.dataFrom.version = res.data.version;
        res.data.dataList.forEach(item => {
          _this.dataFrom.dataList.forEach(items => {
            if (item.itemkey == items.itemkey) {
              items.datavalue = item.datavalue;
            }
          });
        });
        _this.changePCName(this.dataFrom.batch, "1")
        _this.changeJDName(this.dataFrom.baseId, "1")
        _this.changeProName(this.dataFrom.projectcode, "1");
        if (this.dataFrom.dataList[4].datavalue) {
          this.fileList4 =
            this.dataFrom.dataList[4].datavalue.indexOf(";") > 0
              ? this.dataFrom.dataList[4].datavalue.split(";")
              : [this.dataFrom.dataList[4].datavalue];
        }
        if (this.dataFrom.dataList[5].datavalue) {
          this.fileList5 =
            this.dataFrom.dataList[5].datavalue.indexOf(";") > 0
              ? this.dataFrom.dataList[5].datavalue.split(";")
              : [this.dataFrom.dataList[5].datavalue];
        }
        if (this.dataFrom.dataList[6].datavalue) {
          this.fileList6 =
            this.dataFrom.dataList[6].datavalue.indexOf(";") > 0
              ? this.dataFrom.dataList[6].datavalue.split(";")
              : [this.dataFrom.dataList[6].datavalue];
        }
        if (this.dataFrom.dataList[7].datavalue) {
          this.fileList7 =
            this.dataFrom.dataList[7].datavalue.indexOf(";") > 0
              ? this.dataFrom.dataList[7].datavalue.split(";")
              : [this.dataFrom.dataList[7].datavalue];
        }
      });
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
    // 选择项目名称之后触发的事件
    changeProName(val, loadCount) {
      if (loadCount != "1") {
        //首次加载不需要清空
        this.dataFrom.modelid = "";
        this.modelList = [];
        this.dataFrom.dataList[0].datavalue = "";
        this.dataFrom.dataList[2].datavalue = "";
        this.fileList4 = [];
        this.fileList5 = [];
        this.fileList6 = [];
        this.fileList7 = [];
      }
      this.$fetch("/DevPvstring/GetPvstringList?projectcode="+ val ).then(res => {
        if (res.data && res.data.length > 0) {
          if (loadCount == "1") {
            for (let i = 0; i < res.data.length; i++) {
              if (this.dataFrom.dataList[2].datavalue == res.data[i].factor) {
                this.dataFrom.modelid =
                  res.data[i].model + "(" + res.data[i].factor + ")";
              }
            }
          }
          this.modelList = res.data;
        }
      });
      // 获取当前的装机容量
      if (loadCount != "1") {
        this.optinedataDZ.map(item => {
          if (item.projectCode == val)
            this.dataFrom.dataList[0].datavalue = item.capacity;
        });
      }
    },
    // 组件型号触发制造商的事件
    changeComType() {
      // 获取当前的制造商
      this.dataFrom.dataList[2].datavalue = "";
      for (let i = 0; i < this.modelList.length; i++) {
        if (this.modelList[i].pvstringcode == this.dataFrom.modelid) {
          this.dataFrom.dataList[2].datavalue = this.modelList[i].factor;
        }
      }
    },
    // 上传文件成功
    onloadsuccess1(file) {
      this.fileList4.push(file.data);
      this.dataFrom.dataList[4].datavalue = this.fileList4[0].fileName+';';
    },

    onloadsuccess2(file) {
      this.fileList5.push(file.data);
      this.dataFrom.dataList[5].datavalue = this.fileList5[0].fileName+';';
    },
    oonloadauccess3(file) {
      this.fileList6.push(file.data);
      this.dataFrom.dataList[6].datavalue = this.fileList6[0].fileName+';';
    },
    onloadsuccess4(file) {
      this.fileList7.push(file.data);
      this.dataFrom.dataList[7].datavalue = this.fileList7[0].fileName+';';
    },
    // 删除当前上传的文件
    deletefile(index, currentIndex) {
      this.$confirm(
        `确定移除 ${
          this.dataFrom.dataList[index].datavalue.indexOf(";") > 0
            ? this.dataFrom.dataList[index].datavalue.split(";")[currentIndex]
            : this.dataFrom.dataList[index].datavalue
        }？`
      )
        .then(() => {
          this.$refs["multiUpload" + index].clearFiles();
          this["fileList" + index].splice(currentIndex, 1);
          this.dataFrom.dataList[index].datavalue = this[
            "fileList" + index
          ].join(";");
        })
        .catch(() => {});
    },
    // 移除文件之前的钩子，参数为上传的文件
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传之前文件类型的判断
    beforeUpload(file) {
      let fileType = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = fileType === "doc";
      const extension2 = fileType === "docx";
      const extension3 = fileType === "xls";
      const extension4 = fileType === "xlsx";
      if (!extension && !extension2 && !extension3 && !extension4) {
        this.$message({
          message: "上传文件只能是doc、docx、.xls、.xlsx格式",
          type: "warning",
          offset:80
        });
        this.close();
      }
      return extension || extension2 || extension3 || extension4;
    },
    close() {
      this.$parent.dialogTypeName = null;
    },
    submit() {
      // 对组件类型进行解析
      for (let i = 0; i < this.modelList.length; i++) {
        if (this.modelList[i].pvstringcode == this.dataFrom.modelid) {
          this.dataFrom.modelid = this.modelList[i].model;
        }
      }
      var _this = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
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
          var url = "/BisComponentAcceptance/Update";
          _this.$post(url,_this.dataFrom).then(() => {
              this.close();
              this.$parent.Refresh();
            });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.multiplyUp {
  padding-left: 380px;
  line-height: 50px;
  margin-top: -20px;
  a {
    color: #0089ff;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.multiTypeUpload{
    .el-select {
        // width: 100%;
        .el-input{
            display: inline-block !important;
            top: 0 !important;
        }
    }
  }
.multiTypeUpload {
  .form-label-2 .form-label2 {
    width: 44%;
  }
}
</style>
