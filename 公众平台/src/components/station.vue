<template>
    <!-- <div> -->
        <div class="stationSelect">
            <span>
                <img src="/img/station.png" alt="" style="cursor:pointer" />
                <span :class="{nameClass:selName.length>2}">{{selName}}:</span>
                
            </span>
            <el-select   v-model="stationid" @change="change" :multiple="multipleStat" collapse-tags :class="{nameClass:selName.length>2}">
                <el-option :value="item[defaultKey.value]" :label="item[defaultKey.label]" v-for="item in optindata" :key="item.id"></el-option>
            </el-select>
        </div>
    <!-- </div> -->
</template>
<script>
export default {
    props: {
        optindata:{
            defalult:function(){
                return []
            }
        },
        selName:{
            type:String,
            default:"电站"
        },
        url: {
            default: "/StatisticsApi/RealTimeData/GetProList", //注意电站查询接口不一样
            type: String
        },
        allType: {
            default: false,
            type: Boolean
        },
        defaulState: {
            default: false,
            type: Boolean
        },
        defaultKey:{
            default:function () {
                return {
                    value:"projectCode",
                    label:"projectName"
                }
            }
        },
        emitState: {
            default: false,
            type: Boolean
        },
        multipleStat:{
            default: false,
            type: Boolean
        }
    },

    data() {
        return {
            stationData: [],
            stationid: this.defaulState ? [] : '',
            stationname: this.multipleStat ? [] : ''
        }
    },

    mounted() {
        // this.getStationsData()
        this.getinit()
    },
    methods: {
        getinit(){
            this.$fetchGet({url:'/MtrBase/GetBatchBaseTree'}).then(res =>{
                if (this.stationid) return
                if(this.selName == "批次"&&this.defaulState){
                    this.stationid = res.data[2].name
                }else if(this.selName == "基地"&&this.defaulState){
                    this.stationid = res.data[2].childTreeNode[2].name
                }else if(this.selName == "电站"&&this.defaulState){
                    this.onSelectedJD(res.data[2].childTreeNode[2].id)
                }else if(this.selName == "光资源设备"&&this.defaulState){
                    this.onSelectedGZY(res.data[2].childTreeNode[2].id)
                }
            })
        },
        onSelectedGZY(data){
            this.$fetchGet({url:'/RealTimeData/GetResourceCode',params:{baseid:data}}).then(res =>{
                this.stationid = res.data[0].projectName
                
            })
        },
        onSelectedJD(data){
            this.$fetchGet({url:'/RealTimeData/GetProList',params:{baseid:data}}).then(res =>{
               if(res.data &&res.data.length==0) return
                this.stationid = res.data[0].projectName
                this.$emit('selectedStation', res.data[0].projectCode)
            })
        },
        change(val){
            for(let j=0,len=val.length;j<len;j++){
                for(let i of this.stationData){
                    if(val[j] == i.projectCode){
                        this.stationname[j]=i.projectName;
                        // break;
                }
                }
            } 
            // if(this.selName == "批次"){
            //     this.$emit('selectedStation', this.stationid)
            // }else if(this.selName == "基地"){
            //     this.$emit('selectedStation', this.stationid)
            // }else if(this.selName == "电站"){
            //     this.$emit('selectedStation', this.stationid)
            // }else if(this.selName == "光资源设备"){
                this.$emit('selectedStation', this.stationid)
            // }     
            // this.stationid= '' 
            // this.$emit('selectedStation', this.stationid,this.stationname)
        },
        getStationsData() {
            this.$ajax({
                url: this.url
            }).then(res => {
                // console.log(999,res.data)
                this.stationData=res.data;
                // this.stationData = res.data.map(item=>{item.type="集中";return item})//添加类型模拟数据
                // if (this.allType) {
                //     this.stationData.unshift({ projectCode: "all", projectName: "全部",type:"全部" });
                // }
                if (this.defaulState) {
                   let  obj = this.stationData[0].projectCode,obj1 = this.stationData[0].projectName;
                    let arr =[],arr1 = [];
                    arr.push(obj);
                    arr1.push(obj1)
                    this.stationid = this.multipleStat ? arr : obj;
                    this.stationname = this.multipleStat ? arr1 : obj1;
                    // 是否选中默认值后分发到父组件

                    if (this.emitState) {
                        this.$emit("selectedStation", this.stationid,this.stationid)
                    }
                }
            }).then(() =>{
             this.$emit('initialData1',this.stationid,this.stationid)
           })
        }
    }
}
</script>
<style lang="scss" scoped>

.stationSelect {
    position: relative;
    vertical-align: baseline !important;
    margin-right: 15px;
    // width:208px;
  
}

.stationSelect > span {
    position: absolute;
    top: 25%;
    left: 10px;
    z-index: 20;
    display: flex;
    align-items: center;
}

.stationSelect > span img {
    margin-right: 10px;
}

.stationSelect > span span {
    color: #666;
    top: -10px;
    
}
.stationSelect .nameClass span {
  width: 40px;
}
.stationSelect .el-select {
    width: 100%;
}

.stationSelect .el-select .el-input__inner {
    background: transparent;
    height: 42px ;
    border-radius: 0;
    border-color: rgb(50, 97, 166);
    color: rgb(0, 235, 251);
    font-size: 16px;
}
</style>
<style lang="scss">
//   .select-bj{
//     background: rgb(26, 58, 99);
//     border-color: #409EFF;
//     .el-select-dropdown__item {
//         color: #d4e7ff;
//     }
//     .el-select-dropdown__item.selected {
//         color: #00ebfb;
//     }
//     .el-select-dropdown__item.hover,
//     .el-select-dropdown__item:hover {
//         background-color: transparent !important
//     }
// }
.stationSelect .el-select .el-input__inner {
    min-width: 300px;
    padding-left: 60px;
    height: 40px !important;
    cursor:pointer;
    text-align: left;
}
.stationSelect .nameClass  .el-input__inner {
    padding-left: 136px;
  
}
// .stationSelect  .el-input--suffix .el-input__inner{
//     padding-right: 0;
// }
</style>