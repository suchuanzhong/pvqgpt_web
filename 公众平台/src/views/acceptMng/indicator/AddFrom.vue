<template>
  <el-dialog
    :visible.sync="dialogVisible"
    @close="close"
    width="800px"
    class="dialog-wrap fixedHeight managedialog"
  >
    <div slot="title">
      <span class="title-gradient">新增</span>
    </div>
    <div class="wrap">
      <div style="margin-bottom:10px">
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
                  @change="changeJDName"
                >
                  <el-option
                    :label="pro.name"
                    :value="pro.id"
                    v-for="pro in optinedataJD"
                    :key="pro.projectCode"
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
              <el-form-item label="上报时间：" required>
                <el-date-picker
                  type="month"
                  v-model="reportTime"
                  placeholder="年月选择"
                  :size="size"
                  value-format="yyyy-MM"
                  style="width: 100%"
                  format="yyyy-MM"
                  :clearable="false"
                ></el-date-picker>
                <label style="font-size:12px;color:#f56c6c;position:absolute;top:27px;left:0;" v-if="showTimeTips">请选择时间</label>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div>
        <LabelName title="弃光量"></LabelName>
        <el-form :size="size" class="section2 form-label-2">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item>
                <div class="form-label2" style="width: 450px;">
                  <p>电站因设备自身故障造成的停机损失电量：</p>
                </div>
                <el-input
                  v-model="dataFrom.dataList[0].dataValue"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <div class="form-label2" style="width: 450px;">
                  <p>因计划检修维护导致停机损失电量：</p>
                </div>
                <el-input
                  v-model="dataFrom.dataList[1].dataValue"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <div class="form-label2" style="width: 450px;">
                  <p>因电网调度命令要求限负荷或因电网故障</p>
                  <p>导致的非正常停机损失电量：</p>
                </div>
                <el-input
                  v-model="dataFrom.dataList[2].dataValue"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div>
        <LabelName title="停机小时数"></LabelName>
        <el-form :size="size" label-width="150px" class="section2">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="故障停机：">
                <el-input
                  v-model="dataFrom.dataList[3].dataValue"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检修维护停机：">
                <el-input
                  v-model="dataFrom.dataList[4].dataValue"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="限电停机：">
                <el-input
                  v-model="dataFrom.dataList[5].dataValue"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div>
        <LabelName title="电站停机小时数"></LabelName>
        <el-form :size="size" class="section2 form-label-2">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item>
                <div class="form-label2" style="width: 650px;">
                  <p>在太阳能辐射强度达到光电设备正常发电的条件下全站</p>
                  <p>逆变器在统计时间内的正常停机和故障停机总小时数：</p>
                </div>
                <el-input
                  v-model="dataFrom.dataList[6].dataValue"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div>
        <LabelName title="故障统计"></LabelName>
        <el-form :size="size" label-width="150px" class="section2">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="内部故障：">
                <el-input
                  v-model="dataFrom.dataList[7].dataValue"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="外部故障：">
                <el-input
                  v-model="dataFrom.dataList[8].dataValue"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="内部检修：">
                <el-input
                  v-model="dataFrom.dataList[9].dataValue"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他：">
                <el-input
                  v-model="dataFrom.dataList[10].dataValue"
                  placeholder="请输入"
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
import LabelName from "@/components/Label";
export default {
  name: "AddFrom",
  components: { LabelName },
  data() {
    return {
      dialogVisible: true,
      showTimeTips: false,
      size: "medium",
      optinedataPC:[],//批次数组
      optinedataJD:[],//基地数组
      optinedataDZ: [],//电站数组
      reportTime: null,
      dataFrom: {
        dataList: [
          {
            itemType: "1",
            itemTypeName: "弃光电量",
            itemKey: "dzsbzsgz",
            itemName: "电站因设备自身故障造成的停机损失电量",
            dataValue: ""
          },
          {
            itemType: "1",
            itemTypeName: "弃光电量",
            itemKey: "jhjxwh",
            itemName: "因计划检修维护导致停机损失电量",
            dataValue: ""
          },
          {
            itemType: "1",
            itemTypeName: "弃光电量",
            itemKey: "dwddmlyq",
            itemName:
              "因电网调度命令要求限负荷或因电网故障导致的非正常停机损失电量",
            dataValue: ""
          },
          {
            itemType: "2",
            itemTypeName: "停机小时数",
            itemKey: "gztj",
            itemName: "故障停机",
            dataValue: ""
          },
          {
            itemType: "2",
            itemTypeName: "停机小时数",
            itemKey: "jxwhtj",
            itemName: "检修维护停机",
            dataValue: ""
          },
          {
            itemType: "2",
            itemTypeName: "停机小时数",
            itemKey: "xdtj",
            itemName: "限电停机",
            dataValue: ""
          },
          {
            itemType: "3",
            itemTypeName: "电站停机小时数",
            itemKey: "tjzxss",
            itemName:
              "在太阳能辐射强度达到光电设备正常发电的条件下，全站逆变器在统计时间内的正常停机和故障停机总小时数",
            dataValue: ""
          },
          {
            itemType: "4",
            itemTypeName: "故障统计",
            itemKey: "nbgz",
            itemName: "内部故障",
            dataValue: ""
          },
          {
            itemType: "4",
            itemTypeName: "故障统计",
            itemKey: "wbgz",
            itemName: "外部故障",
            dataValue: ""
          },
          {
            itemType: "4",
            itemTypeName: "故障统计",
            itemKey: "nbjx",
            itemName: "内部检修",
            dataValue: ""
          },
          {
            itemType: "4",
            itemTypeName: "故障统计",
            itemKey: "qt",
            itemName: "其他",
            dataValue: ""
          }
        ],
        monthNum: "",
        yearNum: "",
        projectcode: "",
        projectname: "",
        batch:"",//批次名称
        baseId:'',//基地编号
        baseName:''//基地名称
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
      this.dataFrom.baseId = ""
      this.dataFrom.projectcode = ""
      this.dataFrom.projectname = ""
      this.optinedataJD = [];
      this.optinedataDZ = [];
      this.optinedataPC.map(item => {
        if (item.name == data) {
          this.optinedataJD = item.childTreeNode;
        }
      });
    },
    //选择基地名称
    changeJDName(val){
      //清除电站名称
      this.dataFrom.projectcode = ""
      this.dataFrom.projectname = ""
      this.optinedataDZ = [];
      this.$fetch( "/RealTimeData/GetProList?baseid="+val).then(res => {
        if (res.data && res.data.length > 0) this.optinedataDZ = res.data;
      });
    },
    close() {
      this.$parent.dialogTypeName = null;
    },
    submit() {
      var _this = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid && _this.reportTime) {
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
          if (_this.reportTime != null) {
            _this.dataFrom.yearNum = _this.reportTime.substring(0, 4);
            _this.dataFrom.monthNum = _this.reportTime.substring(5, 7);
          }
          var url = "/BisIndexmonthreport/Add";
          _this.$post(url,_this.dataFrom).then(() => {
              this.close();
              this.$parent.Refresh();
            });
        } else {
          this.showTimeTips = true;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.form-label2 {
  padding-right: 12px;

  p {
    text-align: right;
    line-height: 16px;
  }

  p:last-child {
    color: #666;
    font-size: 14px;
    padding-right: 0;
  }
}
</style>
<style lang="scss"></style>
