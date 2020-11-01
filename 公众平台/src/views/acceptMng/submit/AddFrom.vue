<template>
  <el-dialog
    :visible.sync="dialogVisible"
    @close="close"
    width="1000px"
    class="dialog-wrap fixedHeight managedialog"
  >
    <div slot="title">
      <span class="title-gradient">新增</span>
    </div>
    <div class="wrap">
      <div>
        <LabelName title="基本信息"></LabelName>
        <el-form
          :size="size"
          label-width="200px"
          class="section2"
          ref="dataForm"
          :model="dataFrom"
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
            <el-col :span="12">
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
                  style="width:100%"
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
                  placeholder="请输入"
                  v-model="dataFrom.dataList[0].dataValue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开工时间：">
                <el-date-picker
                  type="date"
                  placeholder="请选择检查时间"
                  v-model="dataFrom.dataList[1].dataValue"
                  :size="size"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="投产发电时间：">
                <el-date-picker
                  type="date"
                  placeholder="请选择检查时间"
                  v-model="dataFrom.dataList[2].dataValue"
                  :size="size"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  style="width:100%"
                ></el-date-picker>
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
                <el-input
                  placeholder="请输入"
                  v-model="dataFrom.dataList[3].dataValue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="建设单位资质及证书编号：">
                <el-input
                  placeholder="请输入"
                  v-model="dataFrom.dataList[4].dataValue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设计单位名称：">
                <el-input
                  placeholder="请输入"
                  v-model="dataFrom.dataList[5].dataValue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设计单位资质及证书编号：">
                <el-input
                  placeholder="请输入"
                  v-model="dataFrom.dataList[6].dataValue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="施工单位名称：">
                <el-input
                  placeholder="请输入"
                  v-model="dataFrom.dataList[7].dataValue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="施工单位资质及证书编号：">
                <el-input
                  placeholder="请输入"
                  v-model="dataFrom.dataList[8].dataValue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监理单位名称：">
                <el-input
                  placeholder="请输入"
                  v-model="dataFrom.dataList[9].dataValue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监理单位资质及证书编号：">
                <el-input
                  placeholder="请输入"
                  v-model="dataFrom.dataList[10].dataValue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调试单位名称：">
                <el-input
                  placeholder="请输入"
                  v-model="dataFrom.dataList[11].dataValue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调试单位资质及证书编号：">
                <el-input
                  placeholder="请输入"
                  v-model="dataFrom.dataList[12].dataValue"
                ></el-input>
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
                  <span>{{
                    dataFrom.dataList[13].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[13].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(13)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload13"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="sgdwgcaqxcxwjsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="监理单位工程安全项程序文件：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[14].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[14].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(14)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload14"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="jldwgcaqxcxwjsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="调试单位工程安全项程序文件：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[15].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[15].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(15)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload15"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="tsdwgcaqxcxwjsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="运行单位工程安全项程序文件：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[16].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[16].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(16)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload16"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="yxdwgcaqxcswjsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
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
                  <span>{{
                    dataFrom.dataList[17].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[17].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(17)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload17"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="ztbwjjxysuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="施工设计总说明：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[18].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[18].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(18)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload18"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="sgsjzsmsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="对组件、逆变器等设备到货验收记录：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[19].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[19].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(19)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload19"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="sbdhysjlsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="质量监督检查意见：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[20].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[20].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(20)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload20"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="zljdjcyjsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class>
        <LabelName title="监理单位工作文件"></LabelName>
        <el-form :size="size" label-width="400px" class="section2">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="检验批、分项、分部(子分部)和单位(子单位)：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[21].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[21].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(21)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload21"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="jysuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="工程质量验评记录：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[22].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[22].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(22)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload22"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="gczlypjlsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="隐蔽工程验收记录：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[23].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[23].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(23)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload23"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="ybgcysjlsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class>
        <LabelName title="调试文件"></LabelName>
        <el-form :size="size" label-width="400px" class="section2">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="调试大纲及项目划分：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[24].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[24].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(24)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload24"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="tsdgjxmhfsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="调试报告：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[25].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[25].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(25)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload25"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="tsbgsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class>
        <LabelName title="专项验收"></LabelName>
        <el-form :size="size" label-width="400px" class="section2">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="林光互补专项验收意见（或阶段性成果）：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[26].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[26].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(26)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload26"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="lghbzxysyjsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="电网接入验收报告（或阶段性成果）：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[27].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[27].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(27)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload27"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="dwjrysbgsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="项目用地验收意见（或阶段性成果）：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[28].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[28].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(28)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload28"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="xmydysyjsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="环保验收意见（或阶段性成果）：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[29].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[29].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(29)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload29"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="hbysyjsuccess"
                    :beforeUpload="beforeUpload"
                    :on-exceed="handleExceed"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="消防与安全验收意见（或阶段性成果）：">
                <div class="upload-wrap">
                  <span>{{
                    dataFrom.dataList[30].dataValue.split("\\")[2]
                  }}</span>
                  <a
                    v-if="dataFrom.dataList[30].dataValue"
                    style="margin-left:10px"
                    @click="deletefile(30)"
                    >删除</a
                  >
                  <el-upload
                    style="display: inline-block;"
                    ref="upload30"
                    :action="upconfig.uploadurl"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    multiple
                    :limit="1"
                    accept=".doc, .docx, .xls, .xlsx"
                    :on-success="xfyaqysyjsuccess"
                    :on-exceed="handleExceed"
                    :beforeUpload="beforeUpload"
                    :data="uploadData"
                    name="formfile"
                  >
                    <el-button :size="size" type="primary">文件上传</el-button>
                  </el-upload>
                </div>
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
import $ from "jquery";
export default {
  name: "AddFrom",
  components: { LabelName },
  data() {
    return {
      dialogVisible: true,
      size: "medium",
      optinedataPC:[],//批次数组
      optinedataJD:[],//基地数组
      optinedataDZ: [],//电站数组
      upconfig: { header: { Authorization: "" }, uploadurl: "" },
      uploadData: {},
      indexs: -1,
      startTime: [],
      endTime: [],
      dataFrom: {
        dataList: [
          {
            itemType: "1",
            itemTypeName: "基本信息",
            itemKey: "zjrl",
            itemName: "装机容量",
            dataValue: ""
          },
          {
            itemType: "1",
            itemTypeName: "基本信息",
            itemKey: "kgsj",
            itemName: "开工时间",
            dataValue: ""
          },
          {
            itemType: "1",
            itemTypeName: "基本信息",
            itemKey: "tcfdsj",
            itemName: "投产发电时间",
            dataValue: ""
          },

          {
            itemType: "2",
            itemTypeName: "参建单位名称及资质",
            itemKey: "jsdwmc",
            itemName: "建设单位名称",
            dataValue: ""
          },
          {
            itemType: "2",
            itemTypeName: "参建单位名称及资质",
            itemKey: "jsdwzz",
            itemName: "建设单位资质及证书编号",
            dataValue: ""
          },
          {
            itemType: "2",
            itemTypeName: "参建单位名称及资质",
            itemKey: "sjdwmc",
            itemName: "设计单位名称",
            dataValue: ""
          },
          {
            itemType: "2",
            itemTypeName: "参建单位名称及资质",
            itemKey: "sjdwzz",
            itemName: "设计单位资质及证书编号",
            dataValue: ""
          },
          {
            itemType: "2",
            itemTypeName: "参建单位名称及资质",
            itemKey: "sgdwmc",
            itemName: "施工单位名称",
            dataValue: ""
          },
          {
            itemType: "2",
            itemTypeName: "参建单位名称及资质",
            itemKey: "sgdwzz",
            itemName: "施工单位资质及证书编号",
            dataValue: ""
          },
          {
            itemType: "2",
            itemTypeName: "参建单位名称及资质",
            itemKey: "jldwmc",
            itemName: "监理单位名称",
            dataValue: ""
          },
          {
            itemType: "2",
            itemTypeName: "参建单位名称及资质",
            itemKey: "jldwzz",
            itemName: "监理单位资质及证书编号",
            dataValue: ""
          },
          {
            itemType: "2",
            itemTypeName: "参建单位名称及资质",
            itemKey: "tsdwmc",
            itemName: "调试单位名称",
            dataValue: ""
          },
          {
            itemType: "2",
            itemTypeName: "参建单位名称及资质",
            itemKey: "tsdwzz",
            itemName: "调试单位资质及证书编号",
            dataValue: ""
          },

          {
            itemType: "3",
            itemTypeName: "质量体系管理文件",
            itemKey: "sgdwgcaqxcxwj",
            itemName: "施工单位工程安全项程序文件",
            dataValue: ""
          },
          {
            itemType: "3",
            itemTypeName: "质量体系管理文件",
            itemKey: "jldwgcaqxcxwj",
            itemName: "监理单位工程安全项程序文件",
            dataValue: ""
          },
          {
            itemType: "3",
            itemTypeName: "质量体系管理文件",
            itemKey: "tsdwgcaqxcxwj",
            itemName: "调试单位工程安全项程序文件",
            dataValue: ""
          },
          {
            itemType: "3",
            itemTypeName: "质量体系管理文件",
            itemKey: "yxdwgcaqxcswj",
            itemName: "运行单位工程安全项程序文件",
            dataValue: ""
          },

          {
            itemType: "4",
            itemTypeName: "工程建设过程文件",
            itemKey: "ztbwjjxy",
            itemName: "光伏组件、逆变器招投标文件（技术部分）及技术协议",
            dataValue: ""
          },
          {
            itemType: "4",
            itemTypeName: "工程建设过程文件",
            itemKey: "sgsjzsm",
            itemName: "施工设计总说明",
            dataValue: ""
          },
          {
            itemType: "4",
            itemTypeName: "工程建设过程文件",
            itemKey: "sbdhysjl",
            itemName: "对组件、逆变器等设备到货验收记录",
            dataValue: ""
          },
          {
            itemType: "4",
            itemTypeName: "工程建设过程文件",
            itemKey: "zljdjcyj",
            itemName: "质量监督检查意见",
            dataValue: ""
          },

          {
            itemType: "5",
            itemTypeName: "监理单位工作文件",
            itemKey: "jy",
            itemName: "检验批、分项、分部(子分部)和单位(子单位)",
            dataValue: ""
          },
          {
            itemType: "5",
            itemTypeName: "监理单位工作文件",
            itemKey: "gczlypjl",
            itemName: "工程质量验评记录",
            dataValue: ""
          },
          {
            itemType: "5",
            itemTypeName: "监理单位工作文件",
            itemKey: "ybgcysjl",
            itemName: "隐蔽工程验收记录",
            dataValue: ""
          },

          {
            itemType: "6",
            itemTypeName: "调试文件",
            itemKey: "tsdgjxmhf",
            itemName: "调试大纲及项目划分",
            dataValue: ""
          },
          {
            itemType: "6",
            itemTypeName: "调试文件",
            itemKey: "tsbg",
            itemName: "调试报告",
            dataValue: ""
          },

          {
            itemType: "7",
            itemTypeName: "专项验收",
            itemKey: "lghbzxysyj",
            itemName: "林光互补专项验收意见（或阶段性成果）",
            dataValue: ""
          },
          {
            itemType: "7",
            itemTypeName: "专项验收",
            itemKey: "dwjrysbg",
            itemName: "电网接入验收报告（或阶段性成果）",
            dataValue: ""
          },
          {
            itemType: "7",
            itemTypeName: "专项验收",
            itemKey: "xmydysyj",
            itemName: "项目用地验收意见（或阶段性成果）",
            dataValue: ""
          },
          {
            itemType: "7",
            itemTypeName: "专项验收",
            itemKey: "hbysyj",
            itemName: "环保验收意见（或阶段性成果）",
            dataValue: ""
          },
          {
            itemType: "7",
            itemTypeName: "专项验收",
            itemKey: "xfyaqysyj",
            itemName: "消防与安全验收意见（或阶段性成果）",
            dataValue: ""
          }
        ],
        batch:"",//批次名称
        baseId:'',//基地编号
        baseName:'',//基地名称
        projectcode: "",
        projectname: ""
      }
    };
  },
  mounted() {
    this.getcommonURL();
    this.getSelateData();
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
          this.upconfig.uploadurl =res.baseURL + "/BisProjectqualityreport/upload"; //上传地址
          // this.upconfig.uploadurl =res.baseURL + "/MtrProjectinformation/UploadTemplate"; //上传地址
        }
      });
    },
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
      this.dataFrom.dataList[0].dataValue = ""
      this.dataFrom.dataList[1].dataValue =""
      this.dataFrom.dataList[2].dataValue =""
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
      this.dataFrom.dataList[0].dataValue = ""
      this.dataFrom.dataList[1].dataValue =""
      this.dataFrom.dataList[2].dataValue =""
      this.$fetch( "/RealTimeData/GetProList?baseid="+val).then(res => {
        if (res.data && res.data.length > 0) this.optinedataDZ = res.data;
      });
    },
    // 改变电站名称触发的事件
    changeProName(val) {
      this.startTime = [];
      this.endTime = [];
      // 获取当前的装机容量
      for (let i = 0; i < this.optinedataDZ.length; i++) {
        if (this.optinedataDZ[i].projectCode == val) {
          this.dataFrom.dataList[0].dataValue = this.optinedataDZ[i].capacity; //装机容量
          this.startTime = this.optinedataDZ[i].buildTime.split(" ")[0].split("/");
          this.endTime = this.optinedataDZ[i].netTime.split(" ")[0].split("/");
          this.dataFrom.dataList[1].dataValue =this.startTime[0] +"-" +this.startTime[1] +"-" +this.startTime[2]; //开工时间
          this.dataFrom.dataList[2].dataValue =this.endTime[0] + "-" + this.endTime[1] + "-" + this.endTime[2]; //投资发电时间
        }
      }
    },
    close() {
      this.$parent.dialogTypeName = null;
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
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
          type: "warning"
        });
        this.close();
      }
      return extension || extension2 || extension3 || extension4;
    },
    submit() {
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
          var url = "BisProjectqualityreport/Add";
          _this.$post(url,_this.dataFrom).then(() => {
              this.close();
              this.$parent.Refresh();
            });
        }
      });
    },
    deletefile(index) {
      this.$confirm(`确定移除 ${this.dataFrom.dataList[index].dataValue}？`)
        .then(() => {
          this.$refs["upload" + index].clearFiles();
          this.dataFrom.dataList[index].dataValue = "";
        })
        .catch(() => {});
    },
    sgdwgcaqxcxwjsuccess(file) {
      this.dataFrom.dataList[13].dataValue = file.data;
    },

    jldwgcaqxcxwjsuccess(file) {
      this.dataFrom.dataList[14].dataValue = file.data;
    },
    tsdwgcaqxcxwjsuccess(file) {
      this.dataFrom.dataList[15].dataValue = file.data;
    },
    yxdwgcaqxcswjsuccess(file) {
      this.dataFrom.dataList[16].dataValue = file.data;
    },
    ztbwjjxysuccess(file) {
      this.dataFrom.dataList[17].dataValue = file.data;
    },
    sgsjzsmsuccess(file) {
      this.dataFrom.dataList[18].dataValue = file.data;
    },
    sbdhysjlsuccess(file) {
      this.dataFrom.dataList[19].dataValue = file.data;
    },
    zljdjcyjsuccess(file) {
      this.dataFrom.dataList[20].dataValue = file.data;
    },
    jysuccess(file) {
      this.dataFrom.dataList[21].dataValue = file.data;
    },
    gczlypjlsuccess(file) {
      this.dataFrom.dataList[22].dataValue = file.data;
    },
    ybgcysjlsuccess(file) {
      this.dataFrom.dataList[23].dataValue = file.data;
    },
    tsdgjxmhfsuccess(file) {
      this.dataFrom.dataList[24].dataValue = file.data;
    },
    tsbgsuccess(file) {
      this.dataFrom.dataList[25].dataValue = file.data;
    },
    lghbzxysyjsuccess(file) {
      this.dataFrom.dataList[26].dataValue = file.data;
    },
    dwjrysbgsuccess(file) {
      this.dataFrom.dataList[27].dataValue = file.data;
    },
    xmydysyjsuccess(file) {
      this.dataFrom.dataList[28].dataValue = file.data;
    },
    hbysyjsuccess(file) {
      this.dataFrom.dataList[29].dataValue = file.data;
    },
    xfyaqysyjsuccess(file) {
      this.dataFrom.dataList[30].dataValue = file.data;
    }
  }
};
</script>

<style lang="scss" >
.wrap{
    .el-select {
        // width: 100%;
        .el-input{
            display: inline-block !important;
            top: 0 !important;
        }
    }
  }
</style>

<style lang="scss" scoped>
.upload-wrap {
  a {
    cursor: pointer;
    text-decoration: underline;
    color: #0089ff;
  }
}
</style>
