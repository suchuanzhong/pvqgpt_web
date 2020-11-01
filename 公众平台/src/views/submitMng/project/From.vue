<template>
  <el-dialog
    :visible.sync="dialogVisible"
    @close="close"
    width="1000px"
    class="dialog-wrap fixedHeight managedialog"
  >
    <div slot="title">
      <span class="title-gradient"> 详情查看 </span>
    </div>
    <div class="wrap">
      <div>
        <LabelName title="基本信息"></LabelName>
        <el-form :size="size" label-width="200px" class="section2">
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
              <el-form-item label="开工时间：">
                <el-input v-model="data.kgsj" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="投产发电时间：">
                <el-input v-model="data.tcfdsj" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div>
        <LabelName title="参建单位名称及资质"></LabelName>
        <el-form :size="size" label-width="200px" class="section2">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="建设单位名称：">
                <el-input v-model="data.jsdwmc" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="建设单位资质及证书编号：">
                <el-input v-model="data.jsdwzz" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设计单位名称：">
                <el-input v-model="data.sjdwmc" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设计单位资质及证书编号：">
                <el-input v-model="data.sjdwzz" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="施工单位名称：">
                <el-input v-model="data.sgdwmc" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="施工单位资质及证书编号：">
                <el-input v-model="data.sgdwzz" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监理单位名称：">
                <el-input v-model="data.jldwmc" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监理单位资质及证书编号：">
                <el-input v-model="data.jldwzz" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调试单位名称：">
                <el-input v-model="data.tsdwmc" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调试单位资质及证书编号：">
                <el-input v-model="data.tsdwzz" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div>
        <LabelName title="质量体系管理文件"></LabelName>
        <el-form :size="size" label-width="300px" class="section2">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="施工单位工程安全项程序文件：">
                <div class="upload-wrap">
                  <a
                    @click="downloadfile(data.sgdwgcaqxcxwj)"
                    v-if="data.sgdwgcaqxcxwj"
                    >{{ data.sgdwgcaqxcxwj.split("\\")[2] }}</a
                  >
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="监理单位工程安全项程序文件：">
                <div class="upload-wrap">
                  <a
                    @click="downloadfile(data.jldwgcaqxcxwj)"
                    v-if="data.jldwgcaqxcxwj"
                    >{{ data.jldwgcaqxcxwj.split("\\")[2] }}</a
                  >
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="调试单位工程安全项程序文件：">
                <div class="upload-wrap">
                  <a
                    @click="downloadfile(data.tsdwgcaqxcxwj)"
                    v-if="data.tsdwgcaqxcxwj"
                    >{{ data.tsdwgcaqxcxwj.split("\\")[2] }}</a
                  >
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="运行单位工程安全项程序文件：">
                <div class="upload-wrap">
                  <a
                    @click="downloadfile(data.yxdwgcaqxcswj)"
                    v-if="data.yxdwgcaqxcswj"
                    >{{ data.yxdwgcaqxcswj.split("\\")[2] }}</a
                  >
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div>
        <LabelName title="工程建设过程文件"></LabelName>
        <el-form :size="size" label-width="400px" class="section2">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item
                label="光伏组件、逆变器招投标文件（技术部分）及技术协议："
              >
                <div class="upload-wrap">
                  <a
                    @click="downloadfile(data.ztbwjjxy)"
                    v-if="data.ztbwjjxy"
                    >{{ data.ztbwjjxy.split("\\")[2] }}</a
                  >
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="施工设计总说明：">
                <div class="upload-wrap">
                  <a @click="downloadfile(data.sgsjzsm)" v-if="data.sgsjzsm">{{
                    data.sgsjzsm.split("\\")[2]
                  }}</a>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="对组件、逆变器等设备到货验收记录：">
                <div class="upload-wrap">
                  <a
                    @click="downloadfile(data.sbdhysjl)"
                    v-if="data.sbdhysjl"
                    >{{ data.sbdhysjl.split("\\")[2] }}</a
                  >
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="质量监督检查意见：">
                <div class="upload-wrap">
                  <a
                    @click="downloadfile(data.zljdjcyj)"
                    v-if="data.zljdjcyj"
                    >{{ data.zljdjcyj.split("\\")[2] }}</a
                  >
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="">
        <LabelName title="监理单位工作文件"></LabelName>
        <el-form :size="size" label-width="400px" class="section2">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="检验批、分项、分部(子分部)和单位(子单位)：">
                <div class="upload-wrap">
                  <a @click="downloadfile(data.jy)" v-if="data.jy">{{
                    data.jy.split("\\")[2]
                  }}</a>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="工程质量验评记录：">
                <div class="upload-wrap">
                  <a
                    @click="downloadfile(data.gczlypjl)"
                    v-if="data.gczlypjl"
                    >{{ data.gczlypjl.split("\\")[2] }}</a
                  >
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="隐蔽工程验收记录：">
                <div class="upload-wrap">
                  <a
                    @click="downloadfile(data.ybgcysjl)"
                    v-if="data.ybgcysjl"
                    >{{ data.ybgcysjl.split("\\")[2] }}</a
                  >
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="">
        <LabelName title="调试文件"></LabelName>
        <el-form :size="size" label-width="400px" class="section2">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="调试大纲及项目划分：">
                <div class="upload-wrap">
                  <a
                    @click="downloadfile(data.tsdgjxmhf)"
                    v-if="data.tsdgjxmhf"
                    >{{ data.tsdgjxmhf.split("\\")[2] }}</a
                  >
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="调试报告：">
                <div class="upload-wrap">
                  <a @click="downloadfile(data.tsbg)" v-if="data.tsbg">{{
                    data.tsbg.split("\\")[2]
                  }}</a>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="">
        <LabelName title="专项验收"></LabelName>
        <el-form :size="size" label-width="400px" class="section2">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="林光互补专项验收意见（或阶段性成果）：">
                <div class="upload-wrap">
                  <a
                    @click="downloadfile(data.lghbzxysyj)"
                    v-if="data.lghbzxysyj"
                    >{{ data.lghbzxysyj.split("\\")[2] }}</a
                  >
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="电网接入验收报告（或阶段性成果）：">
                <div class="upload-wrap">
                  <a
                    @click="downloadfile(data.dwjrysbg)"
                    v-if="data.dwjrysbg"
                    >{{ data.dwjrysbg.split("\\")[2] }}</a
                  >
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="项目用地验收意见（或阶段性成果）：">
                <div class="upload-wrap">
                  <a
                    @click="downloadfile(data.xmydysyj)"
                    v-if="data.xmydysyj"
                    >{{ data.xmydysyj.split("\\")[2] }}</a
                  >
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="环保验收意见（或阶段性成果）：">
                <div class="upload-wrap">
                  <a @click="downloadfile(data.hbysyj)" v-if="data.hbysyj">{{
                    data.hbysyj.split("\\")[2]
                  }}</a>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="消防与安全验收意见（或阶段性成果）：">
                <div class="upload-wrap">
                  <a
                    @click="downloadfile(data.xfyaqysyj)"
                    v-if="data.xfyaqysyj"
                    >{{ data.xfyaqysyj.split("\\")[2] }}</a
                  >
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div> -->
  </el-dialog>
</template>
<script>
import { loadwithurl } from "@/plugins/exportXlsx.js";
import LabelName from "@/components/Label";
export default {
  props: ["detailData"],
  name: "AddFrom",
  components: { LabelName },
  data() {
    return {
      dialogVisible: true,
      size: "medium",
      data: {}
    };
  },
  created() {
    var object = {};
    this.detailData.dataList.forEach(element => {
      object[element.itemKey] = element.dataValue;
    });
    this.data = JSON.parse(JSON.stringify(object));
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
<style lang="scss" scoped>
.wrap {
  a {
    text-decoration: underline;
    cursor: pointer;
  }
  a:hover {
    color: #0090ff;
  }
}
</style>
<style lang="scss"></style>
