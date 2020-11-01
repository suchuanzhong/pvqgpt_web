<template>
  <el-dialog
    :visible.sync="dialogVisible"
    @close="close"
    width="900px"
    class="dialog-wrap"
  >
    <div slot="title">
      <span class="title-gradient"> 详情查看 </span>
    </div>
    <div class="wrap indicatorinfo">
      <div style="margin-bottom:10px">
        <el-form :size="size" label-width="150px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="批次名称">
                <el-input v-model="detailData.projectname" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="基地名称：">
                <el-input v-model="detailData.projectname" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目名称：">
                <el-input v-model="detailData.projectname" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上报时间：">
                <el-input v-model="detailData.reporttime" disabled></el-input>
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
                  v-model="data.dzsbzsgz"
                  disabled
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
                  v-model="data.jhjxwh"
                  disabled
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
                  v-model="data.dwddmlyq"
                  disabled
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
                  v-model="data.gztj"
                  disabled
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检修维护停机：">
                <el-input
                  v-model="data.jxwhtj"
                  disabled
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="限电停机：">
                <el-input
                  v-model="data.xdtj"
                  disabled
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
                  v-model="data.tjzxss"
                  disabled
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
                  v-model="data.nbgz"
                  disabled
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="外部故障：">
                <el-input
                  v-model="data.wbgz"
                  disabled
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="内部检修：">
                <el-input
                  v-model="data.nbjx"
                  disabled
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他：">
                <el-input
                  v-model="data.qt"
                  disabled
                  placeholder="请输入"
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
import LabelName from "@/components/Label";
export default {
  props: ["detailData"],
  name: "detailFrom",
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
    if (this.detailData.yearNum && this.detailData.monthNum) {
      this.detailData.reporttime =
        this.detailData.yearNum +
        "-" +
        (this.detailData.monthNum > 10
          ? this.detailData.monthNum
          : "0" + this.detailData.monthNum);
    }
  },
  methods: {
    close() {
      this.$parent.dialogTypeName = null;
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
<style lang="scss">
.componentinfo {
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #1c3a5d !important;
  }
}
</style>
