<template>
  <el-dialog
    :visible.sync="dialogVisible"
    @close="close"
    width="900px"
    class="dialog-wrap managedialog"
  >
    <div slot="title">
      <span class="title-gradient">详情查看</span>
    </div>
    <div class="wrap componentinfo">
      <div>
        <el-form :size="size" label-width="150px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="批次名称：">
                <el-input v-model="detailData.batch" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="基地名称：">
                <el-input v-model="detailData.baseName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电站名称：">
                <el-input v-model="detailData.projectname" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="装机容量：">
                <el-input v-model="data.zjrl" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查时间：">

                <el-date-picker
                  type="date"
                  placeholder="请选择检查时间"
                  disabled
                  v-model="detailData.checktime"
                  :size="size"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查地点：">
                <el-input v-model="data.jcdd" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组件型号：">
                <el-input v-model="detailData.modelid" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="制造商：">
                <el-input v-model="data.zzs" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组件编号：">
                <el-input v-model="detailData.modelcode" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组件认证监测情况：">
                <el-input v-model="data.zjrzjcqk" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="section2 form-label-2">
        <el-form :size="size" label-width="350px">
          <el-row :gutter="20">
            <el-col :span="24" class="detail-upload">
              <el-form-item>
                <div class="form-label2" slot="label">
                  <p>国家批准认证机构出具的检测认证报告和证书：</p>
                  <p>(报告、单位、有效期)</p>
                </div>
                <!-- <el-input v-model="data.jcrzbg" disabled type="textarea"></el-input> -->
                <div class="file-list">
                  <div
                    v-for="(item, index) in fileList1"
                    :key="Math.random() + index"
                    class="fileListBox"
                  >
                    <a @click="downloadfile(item, index)" v-if="item">{{
                      item.split("\\")[2]
                    }}</a>
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <div class="form-label2" slot="label">
                  <p>设备出厂合格证、出厂检测报告、采购协议：</p>
                  <p></p>
                </div>
                <div class="file-list">
                  <div
                    v-for="(item, index) in fileList2"
                    :key="Math.random() + index"
                    class="fileListBox"
                  >
                    <a @click="downloadfile(item, index)" v-if="item">{{
                      item.split("\\")[2]
                    }}</a>
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <div class="form-label2" slot="label">
                  <p>到货验收报告完整性检查：</p>
                  <p>(报告编号、单位)</p>
                </div>
                <div>
                  <div
                    v-for="(item, index) in fileList3"
                    :key="Math.random() + index"
                    class="fileListBox"
                  >
                    <a @click="downloadfile(item, index)" v-if="item">{{
                      item.split("\\")[2]
                    }}</a>
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <div class="form-label2" slot="label">
                  <p>组件更换记录文件：</p>
                  <p>(报告编号、单位)</p>
                </div>
                <div>
                  <div
                    v-for="(item, index) in fileList4"
                    :key="Math.random() + index"
                    class="fileListBox"
                  >
                    <a @click="downloadfile(item, index)" v-if="item">{{
                      item.split("\\")[2]
                    }}</a>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div></div>
    </div>
  </el-dialog>
</template>
<script>
import { loadwithurl } from "@/plugins/exportXlsx.js";
// import LabelName from "@/components/Label"
export default {
  props: ["detailData"],
  name: "AddFrom",
  components: {},
  data() {
    return {
      dialogVisible: true,
      size: "medium",
      data: {},
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: []
    };
  },
  created() {
    // console.log(this.detailData)
    var object = {};
    this.detailData.dataList.forEach(element => {
      object[element.itemkey] = element.datavalue;
    });
    this.data = JSON.parse(JSON.stringify(object));
    this.fileList1 = this.data.jcrzbg ? this.data.jcrzbg.split(";") : [];
    this.fileList2 = this.data.sbcchgz ? this.data.sbcchgz.split(";") : [];
    this.fileList3 = this.data.bgwzxjc ? this.data.bgwzxjc.split(";") : [];
    this.fileList4 = this.data.zjghjlwj ? this.data.zjghjlwj.split(";") : [];
  },
  methods: {
    close() {
      this.$parent.dialogTypeName = null;
    },
    submit() {
      this.close();
    },
    downloadfile(fileUrl) {
      if (fileUrl != null && fileUrl != "") {
        var index = fileUrl.lastIndexOf("\\");
        var fileName = fileUrl.substring(index + 1, fileUrl.length);
        loadwithurl(
          "ManagerApi/BisProjectqualityreport/download?fileAddress=" + fileUrl,
          fileName
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
<style lang="scss">
.componentinfo {
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #1c3a5d !important;
  }
  .form-label-2 .form-label2 {
    width: 100%;
  }
  .file-list {
    vertical-align: top;
  }
  .fileListBox {
    line-height: 20px;
  }
  .fileListBox a:hover {
    color: #0090ff;
  }
  .fileListBox a {
    text-decoration: underline;
    cursor: pointer;
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
