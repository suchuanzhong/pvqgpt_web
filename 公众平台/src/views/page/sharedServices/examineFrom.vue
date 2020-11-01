<template>
  <el-dialog
    :visible.sync="dialogVisible"
    @close="close"
    width="500px"
    class="dialog-wrap managedialog"
    id="dialogaddform"
  >
    <div slot="title">
      <span class="title-gradient" style="border:none;color:#666;">上传文件审核</span>
    </div>
    <div class="wrap addMultitype">
      <div>
        <el-form
          :size="size"
          label-width="95px"
          :model="dataFrom"
          ref="dataForm"
        >
          <el-row :gutter="20">
          
            <el-col :span="23">
              <el-form-item label="文件名称">
                <el-input
                  placeholder="请输入文件名称"
                  disabled
                  v-model="dataFrom.fileName"
                  style="width:300px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="行业">
                <el-input
                  placeholder="请输入行业"
                  disabled
                  v-model="dataFrom.industry"
                  style="width:110px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="上传时间">
                <el-input
                  placeholder="请输入文件大小"
                  disabled
                  v-model="dataFrom.uploadTime"
                  style="width:110px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="文件大小">
                <el-input
                  placeholder="请输入文件大小"
                  disabled
                  v-model="dataFrom.fileSize"
                  style="width:110px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="积分数">
                <el-input
                  placeholder="请输入积分数"
                  disabled
                  v-model="dataFrom.integral"
                  style="width:110px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="备注">
                    <el-input
                        type="textarea"
                        v-model="note"
                        placeholder="请输入备注"
                        :rows="3"
                        style="width:300px"
                    ></el-input>
                </el-form-item>
             
            </el-col>
            <el-col :span="23">
              <el-form-item label="文件上传">
                   <span>{{dataFrom.fileSaveName}}{{dataFrom.fileType}}</span>
                <!-- </div> -->
              </el-form-item>
             
            </el-col>
            
            
          </el-row>
        </el-form>
      </div>
      
      <div></div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit('yes')">通 过</el-button>
      <el-button type="primary" plain @click="submit('no')">不通过</el-button>
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
        industry:'',
        uploadTime:'',
        fileSize:'',
        integral:'',
        filesaveName: ""
      },
      note:'',
      upconfig: { header: { Authorization: "" }, uploadurl: "" },
      // fileList1: [],
      
     
    
    };
  },
  mounted() {
    let token = sessionStorage.getItem("token");
    if (token) {
      this.upconfig.header = { Authorization: "Bearer" + " " + token };
    }
    if(this.dialogType == "Examine"){
      this.getInitUpData()
    }
  },
  methods: {
    //渲染数据
    getInitUpData(){
      let Updata = JSON.parse(JSON.stringify(this.shareData))
         this.dataFrom.id =Updata.id;
         this.dataFrom.version =Updata.version
         this.dataFrom.userId =sessionStorage.getItem('UserId')
         this.dataFrom.fileName =Updata.fileName
         this.dataFrom.industry =Updata.industry
         this.dataFrom.uploadTime =Updata.uploadTime.substring(0,10)
         this.dataFrom.fileSize =Updata.fileSize
         this.dataFrom.integral =Updata.integral
         this.dataFrom.fileSaveName = Updata.fileSaveName
         this.dataFrom.fileType= Updata.fileType
    },
    close() {
      this.$parent.dialogShareFrom = null;
    },
  
    submit(typename) {
      var that = this;
        let examineData={
            Note:this.note,
            IsApproved:typename=='yes'?1:2,
            ApproveUserId:sessionStorage.getItem('UserId'),
            Id:this.dataFrom.id
        }
        let str = `Note=${examineData.Note}&IsApproved=${examineData.IsApproved}&ApproveUserId=${examineData.ApproveUserId}&Id=${examineData.Id}`
 
        that.$post("/SharedServices/UpdateShared?"+str).then((res) => {
            console.log(res)
            if(res.data){
                that.close();
                that.$parent.refresh();
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
