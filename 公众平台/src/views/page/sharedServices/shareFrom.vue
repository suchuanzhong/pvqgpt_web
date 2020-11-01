<template>
  <el-dialog
    :visible.sync="dialogVisible"
    @close="close"
    width="500px"
    class="dialog-wrap managedialog"
    id="dialogaddform"
  >
    <div slot="title">
      <span v-if="dialogType=='Add'" class="title-gradient" style="border:none;color:#666;">新增</span>
      <span v-else-if="dialogType=='Up'" class="title-gradient" style="border:none;color:#666;">修改</span>
      <span v-else-if="dialogType=='Sub'" class="title-gradient" style="border:none;color:#666;">提交</span>
    </div>
    <div class="wrap addMultitype">
      <div>
        <el-form
          :size="size"
          label-width="100px"
          :model="dataFrom"
          ref="dataForm"
          :rules="rules"
        >
          <el-row :gutter="20">
          
            <el-col :span="20">
              <el-form-item label="文件名称：" prop="fileName">
                <el-input
                  placeholder="请输入文件名称"
                  v-model="dataFrom.fileName"
                  style="width:260px"
                ></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="4">
                  <el-upload
                    style="display: inline-block;"
                    ref="multiUpload1"
                    :action="upconfig.uploadurl"
                    
                    name="file"
                    
                    :limit="1"
                    multiple
                    :show-file-list="false"
                    :on-success="onloadsuccess1"
                    :on-exceed="handleExceed"
                    :beforeUpload="beforeUpload"
                  >
                    <el-button :size="size" type="primary">上传</el-button>
                  </el-upload>
            </el-col>
            <el-col :span="23">
              <el-form-item label="行业：" prop="industry">
                <el-input
                  placeholder="请输入行业"
                  v-model="dataFrom.industry"
                  style="width:260px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="类型：" prop="documentType">
                <el-input
                  placeholder="请输入类型"
                  v-model="dataFrom.documentType"
                  style="width:260px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="上传时间：" prop="uploadTime">
                <el-input
                  placeholder="请选择上传时间"
                  disabled
                  v-model="dataFrom.uploadTime"
                  style="width:260px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="文件大小：" prop="fileSize">
                <el-input
                  placeholder="请输入文件大小"
                  disabled
                  v-model="dataFrom.fileSize"
                  style="width:260px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="积分数：" prop="integral">
                <el-input
                  placeholder="请输入积分数"
                  v-model="dataFrom.integral"
                  style="width:260px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="23">
              <template v-if="dataFrom.fileSaveName">
                <div class="multiplyUp">
                  <span>{{dataFrom.fileSaveName}}{{dataFrom.fileType}}</span>
                  <a @click="deletefile(1, 0)">删除</a>
                </div>
              </template>
            </el-col>
          </el-row>
        </el-form>
      </div>
      
      <div></div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">提 交</el-button>
      <el-button v-if="dialogType=='Add'" type="primary" plain @click="keepfuc">保 存</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
      
    </div>
  </el-dialog>
</template>
<script>
import $ from "jquery";
export default {
  props: ["shareData","dialogType"],
  components: {},
  data() {
    return {
      dialogVisible: true,
      size: "medium",
      dataFrom: {
        fileName:'',
        documentType:'',
        industry:'',
        uploadTime:'',
        fileSize:'',
        integral:'',
        filesaveName: ""
      },
       rules: {
        fileName: [
          {
            required: true,
            message: "请输入文件名称",
            trigger: "blur"
          }
        ],
        documentType: [
          {
            required: true,
            message: "请输入行业名称",
            trigger: "blur"
          }
        ],
        industry: [
          {
            required: true,
            message: "请输入类型名称",
            trigger: "blur"
          }
        ],
        uploadTime: [
          {
            required: true,
            message: "请上传文件获取上传时间",
            trigger: "blur"
          }
        ],
        fileSize: [
          {
            required: true,
            message: "请上传文件获取文件大小",
            trigger: "blur"
          }
        ],
      
        
        
        integral: [
          {
            required: true,
            message: "请填写积分",
            trigger: "blur"
          }
        ]
        
       
      },
      upconfig: { header: { Authorization: "" }, uploadurl: "" },
      
      
     
    
    };
  },
  mounted() {
   
    this.getcommonURL();
    let token = sessionStorage.getItem("token");
    if (token) {
      this.upconfig.header = { Authorization: "Bearer" + " " + token };
    }
    if(this.dialogType == "Up"||this.dialogType == "Sub"){
      this.getInitUpData()
    }
  },
  methods: {
    //渲染提交数据
    getInitUpData(){
      let Updata = JSON.parse(JSON.stringify(this.shareData))
     
         this.dataFrom.id =Updata.id;
         this.dataFrom.version =Updata.version
         this.dataFrom.userId =sessionStorage.getItem('UserId')
         this.dataFrom.fileName =Updata.fileName
         this.dataFrom.documentType =Updata.documentType
         this.dataFrom.industry =Updata.industry
         this.dataFrom.uploadTime =Updata.uploadTime
         this.dataFrom.fileSize =Updata.fileSize
         this.dataFrom.integral =Updata.integral
         this.dataFrom.fileSaveName = Updata.fileSaveName
         this.dataFrom.fileType= Updata.fileType
         this.dataFrom.isApproved= Updata.isApproved
    },
    getcommonURL() {
      $.ajax({
        url: "/config.json",
        type: "get",
        success: res => {
          this.upconfig.uploadurl = res.baseURL + "/MtrProjectinformation/UploadTemplate"; //上传地址
          // this.upconfig.uploadurl = res.baseURL + "ManagerApi" //上传地址
        }
      });
    },
    // 上传文件成功console.log(file.data)
    onloadsuccess1(file) {
      console.log(file.data)
      this.dataFrom.fileSize= file.data.size
      this.dataFrom.fileType= file.data.type
      this.dataFrom.uploadTime= file.data.dateTime
      // this.fileList1.push(`${file.data.fileName}${file.data.type}`)
      this.dataFrom.fileSaveName = file.data.fileName;
    },
    // 移除文件之前的钩子，参数为上传的文件
    beforeRemove(file) {
      return this.$message({
          message: "上传文件只能是doc、docx、.xls、.xlsx格式",
          type: "warning",
          offset: 60,
        });
    },
    //上传之前文件类型的判断
    beforeUpload(file) {
      let fileType = file.name.substring(file.name.lastIndexOf(".") + 1);
      
      var fileTypeList = [ 'doc','docx','dot','png','gif','jpg','bmp','jpeg','pdf']
      var extension = fileTypeList.indexOf(fileType)
      if (extension < 0) {
        this.$message({
          message: "上传文件只能是'doc'、'docx'、'dot'、'png'、'gif'、'bmp'、'jpg'、'jpeg'、'pdf'格式",
          type: "warning",
          offset:60
        });
        this.close();
      }
      return extension;
    },
    // 删除当前上传的文件
    deletefile(index, currentIndex) {
      this.$confirm(
        `确定移除 ${ this.dataFrom.fileSaveName}${this.dataFrom.fileType}？`
      )
        .then(() => {
          this.$refs["multiUpload" + index].clearFiles();
          // this["fileList" + index].splice(currentIndex, 1);
        
          this.dataFrom.fileSaveName = ""
          this.dataFrom.fileSize= ""
          this.dataFrom.fileType= ""
           this.dataFrom.uploadTime=""
        })
        .catch(() => {});
    },
    handleExceed(files, fileList) {
      this.$message({
          message:  `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
          type: "warning",
          offset:70
        });
    },
    close() {
      this.$parent.dialogShareFrom = null;
    },
    keepfuc(){
      var that = this;
      var url ='' ;
      if(this.dialogType == "Add"){
        url = "/SharedServices"
        that.dataFrom.isApproved = 0
        that.dataFrom.userId =sessionStorage.getItem('UserId')
      }
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          that.$post(url,that.dataFrom).then((res) => {
            console.log(res)
            if(res.data){
                that.close();
              that.$parent.refresh();
            }
            
          });
        }
      });
    },
    submit() {
      var that = this;
      var url ='' ;
      if(this.dialogType == "Up"||this.dialogType == "Sub"){
        url = "/SharedServices/"+that.shareData.id
      }else if(this.dialogType == "Add"){
        url = "/SharedServices"
        that.dataFrom.userId =sessionStorage.getItem('UserId')
      }
       that.dataFrom.isApproved = 3
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          that.$post(url,that.dataFrom).then((res) => {
            console.log(res)
            if(res.data){
                that.close();
              that.$parent.refresh();
            }
            
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.multiplyUp {
  padding-left: 100px;
  line-height: 50px;
  margin-top: -20px;
  a {
    color: #0089ff;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
<style lang="scss" scoped>

.addMultitype {
 .form-label2 {
    width: 44%;
  }
}
</style>
