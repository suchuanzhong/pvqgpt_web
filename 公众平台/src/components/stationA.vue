<template>
  <div>
    <div class="stationSelect">
            <span>
                <img src="/img/station.png" alt="" style="cursor:pointer" />
                <span>电站:</span>
            </span>
      <el-select v-model="stationid" @change="returnStationInfo">
        <el-option :value="item[defaultKey.value]" :label="item[defaultKey.label]" v-for="item in stationData" :key="item.id"></el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      url: {
        default: "/StatisticsApi/Contrast/GetBaseProList", //注意电站查询接口不一样
        type: String
      },
      defaultIndex:{
        default:0
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
      }
    },

    data() {
      return {
        stationData: [],
        stationid: ''
      }
    },

    mounted() {
      this.getStationsData()
    },
    methods: {
      getStationsData() {
        this.$ajax({
          url: this.url
        }).then(res => {
          this.stationData=res.data;

          if (this.defaulState) {
            this.stationid = this.stationData[this.defaultIndex][this.defaultKey.value];
            // 是否选中默认值后分发到父组件
            if (this.emitState) {
              this.$emit("selectedStation", this.stationid);
              this.$emit("selectedStationName", res.data[this.defaultIndex][this.defaultKey.label]);
            }
          }
        })
      },
      returnStationInfo(stationId){
        this.$emit('selectedStation', stationId);
        for(let item of this.stationData){
          if(item.projectCode === stationId){
            this.$emit("selectedStationName", item.projectName);
            break;
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .stationSelect {
    position: relative;
  }

  .stationSelect > span {
    position: absolute;
    top: 25%;
    left: 20px;
    z-index: 20;
    display: flex;
    align-items: center;
  }

  .stationSelect > span img {
    margin-right: 10px;
  }

  .stationSelect > span span {
    color: #d4e7ff;
  }

  .stationSelect .el-select {
    width: 100%;
  }

  .stationSelect .el-select .el-input__inner {
    padding-left: 100px;
    background: transparent;
    height: 42px;
    border-radius: 0;
    border-color: rgb(50, 97, 166);
    color: rgb(0, 235, 251);
    font-size: 16px;
  }
</style>