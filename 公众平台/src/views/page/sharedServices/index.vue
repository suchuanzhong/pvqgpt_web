


<template>
    <div class="sharedServices">
        <div class="sharedNav">
            <h1>共享服务</h1>
            <p>SHARED  SERVICES</p>
        </div>
        <div class="shareMain">
            <el-row :gutter="70">
                <queryFrom @Refresh="refresh"></queryFrom>
                <div class="shareform">
                    <el-table :data="tableData" class="table" stripe size="medium" ref="table" row-key="id">
                    <el-table-column  property="fileName" label="文件名" show-overflow-tooltip  align="center"></el-table-column>
                    <el-table-column  property="documentType" label="类型" show-overflow-tooltip  align="center"></el-table-column>
                    <el-table-column  property="industry" label="行业"  show-overflow-tooltip  align="center"></el-table-column>
                    <el-table-column  property="fileSize" label="文件大小"  show-overflow-tooltip  align="center"></el-table-column>
                    <el-table-column  property="uploadTime" label="上传时间"  show-overflow-tooltip  align="center">
                        <template slot-scope="scope">
                           {{scope.row.uploadTime.substring(0,10)}}
                        </template>
                    </el-table-column>
                    <el-table-column  property="integral" label="积分"  show-overflow-tooltip  align="center"></el-table-column>
                    <el-table-column  property="isApprovedName" label="状态"  show-overflow-tooltip  align="center">
                        <template slot-scope="scope">
                           <span class="Approved" :class="'Approved_'+scope.row.isApproved">{{scope.row.isApprovedName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"  show-overflow-tooltip  align="center">
                        <template slot-scope="scope">
                            <el-button @click="handleDown(scope.row)" type="text">
                                <i class="el-icon-share-down"></i>下载
                            </el-button>
                        </template>
                    </el-table-column>
                    
                    </el-table>
                </div>
                <pageBox :totalNum="totalNum" @Refresh="refresh" ref="pages"></pageBox>
            </el-row>
      
        </div>
       <component :is="dialogShareFrom" :shareData="shareFromData" :dialogType="dialogType"></component>
       <el-dialog  @close="close" :visible.sync="dialogVisible1" width="500px" class="dialog-wrap managedialog">
            <div slot="title">
                <span class="title-gradient" style="border:none;color:#666;">提示</span>
            </div>
            <div class="tipstext">
                <img src="../../../assets/img/tips.png" alt="">
                <p>积分不够请点击上传按钮上传文件获取积分！</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="toUp">上 传</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script >
import ShareFrom from "./shareFrom";
import pageBox from "./sharePage";
import queryFrom from "./queryForm";
export default{
    components: {pageBox,ShareFrom,queryFrom},
    data(){
        return {
            dialogVisible1:false,
            shareFromData:{},
            dialogShareFrom:null,
            pageInfo: {
                page: 1,
                Type:1,
                pageSize: 20
            },
            queryInfo: {},
            totalNum: 0,
            dialogType:'',
            tableData: []
        }
    },
    mounted(){
        this.refresh()
    },
    methods:{
        toUp(){
            this.dialogVisible1 =false
             this.dialogType = "Add";
             this.dialogShareFrom = "ShareFrom";
        },
        refresh(data) {
            this.queryData(this.pageInfo.page,data);
        },
        queryData(page,querydata) {
        this.pageInfo.page = page ? page : 1;
        let data = querydata || {}
        this.$refs["pages"].pageInfo = this.pageInfo;
        this.$fetch("/SharedServices", Object.assign({},this.pageInfo,data)).then(res => {
           
            this.tableData = res.data.data;
            this.totalNum = res.data.totalCount;
        });
        },
        handleDown(data){
            if(!sessionStorage.getItem('UserId')){
                this.$message({
                    message: "请登录！",
                    type: "warning",
                    offset: 100,
                });
                return
            }
            
            let downData= {
                Id:data.id,
                UserId:sessionStorage.getItem('UserId')
            }
            let that = this
            let str = `UserId=${downData.UserId}&Id=${downData.Id}`
            that.$post("/SharedServices/GetDownloadCheck?"+str).then((res) => {
                console.log(res.data)
                if(res.data!=="积分不足请获取积分！"){
                    let address = res.data
                
                    let a = document.createElement('a')
                    // a.download=''
                    a.href = address
                    let event = new MouseEvent('click')
                     a.dispatchEvent(event)
                }else{
                    this.dialogVisible1= true
                }
                
            });
        }
    }
}
</script>

<style lang="scss">
    .sharedServices{
        width: 100%;
        margin: 0 auto;
        min-height:calc(100% - 114px);
        padding-top: 60px;
        .sharedNav{
            width: 100%;
            height:200px;
            background: url("../../../assets/img/shartedNav.png") no-repeat;
            background-size: 100% 100%;
            padding:45px 0 0 257px;
            color: #fff;
            h1{
                font-size: 40px;
                line-height: 70px;
            }
        }
        .shareMain{
            width: 1400px;
            margin: 70px auto 0;
        }
        .el-button--text:focus, .el-button--text:hover {
            color: #66b1ff !important;
            border-color: transparent !important;
            background-color: transparent !important;
        }
        .el-table__body-wrapper{
            min-height: 440px;
        }
        .el-icon-share-down{
            width: 16px;
            height: 18px;
            cursor: pointer;
            display: inline-block;
            background: url("../../../assets/img/shareDown.png") no-repeat;
            margin-right: 8px;
            vertical-align: middle;
        }
        .tipstext{
            font-size: 14px;
            text-align: center;
            color: #989898;
            padding: 40px 0 80px;
            img{
                margin-bottom: 40px;
            }
        }
    }
</style>