<template>
  <div class="view-container measureRpt">
    <div class="titleWrap">
      <Title class="head-title"></Title>
    </div>
    <group class="groupWrap">
      <datetime v-model="selYear" format="YYYY" @on-change="onChangeYear">
        <span slot="title" class="soltTitleMounth">
          <img slot="icon" src="./../../../assets/img/rili.png" width="20" height="auto">
          年份
        </span>
      </datetime>
    </group>
    <div class="indexBox"  v-if="indexType && indexType.length>0">
      <!-- @click.native="viewPdf(item)" -->
      <group>
        <!-- <cell :inline-desc='item.title' v-for="(item,index) in indexType" :key="index">
          <span slot="title" class="soltTitle"> {{item.time}}</span>
          <span slot="value">
            <img src="./../../../assets/img/xiazai.png" alt="" slot="icon" height="24" width="auto" @click="downLoad(item)">
          </span>
        </cell> -->
        <div  class="weui-cell" v-for="(item,index) in indexType" :key="index">
          <div class="weui-cell__hd"></div>
          <div class="vux-cell-bd vux-cell-primary" @click="viewPdf(item)">
            <p><label class="vux-label"><span  class="soltTitle">{{getCurrentTime(item)}}</span></label> </p> <span
              class="vux-label-desc">{{item.name}}</span>
          </div>
          <div class="weui-cell__ft"><span ><img  slot="icon" src="./../../../assets/img/xiazai.png" alt="" height="24"
                width="auto"  @click="downLoad(item)"></span>
            <!---->
          </div>
        </div>
      </group>

      <group class="groupWrap">
        <popup-picker
          title="基地"
          :data="stationList"
          v-model="selStation"
          @on-change="onChange"
        >
          <template slot="title" slot-scope="props">
            <!-- use scope="props" when vue < 2.5.0 -->
            <span
              style="height:24px;"
              :class="props.labelClass"
              :style="props.labelStyle"
              class="soltTitle"
            >
              <span
                class="demo-icon demo-icon-big soltTitle"
                style="font-size:20px;vertical-align:middle;"
              >
                <img slot="icon" src="./../../../assets/img/dz.png" width="20" height="auto" />
              </span>
              <span style="vertical-align:middle;padding:0 0.12rem">基地</span>
            </span>
          </template>
        </popup-picker>
      </group>
    </div>
     <div v-else class="nodata-show">
        暂无数据
      </div>
  </div>
</template>
<script>
import Title from "@/components/public/HeadTitle";
import { Datetime, Group, Cell } from "vux";
export default {
  components: {
    Title,
    Datetime,
    Group,
    Cell
  },
  data() {
    return {
      indexType: [
        // {
        //   title: "光伏发电基地运行监测月报",
        //   value: "867.1",
        //   unit: "万千瓦时",
        //   time: "2018.12",
        //   url: "static/pdf/ruicheng0807.pdf"
        // },
        
      ],
       stationList: [[]],
       allStationMsg: [],
        selStation: [],
      selYear: String((new Date()).getFullYear())
    };
  },
  mounted() {
    // 获取电站集合
    this.allStationMsg = JSON.parse(localStorage.getItem("storeStationMsg"));
    let msg = [];
    this.allStationMsg.forEach(ss => {
      msg.push(ss.projectName);
    });
    this.stationList = [msg]; //当前的电站
    this.getCheckRepportData("/AppApi/Base/QueryRunReportData",this.selYear);
  },
  methods: {
    // 时间格式
    getCurrentTime(val){
        return val.year+'.'+(val.month<10?'0'+val.month:val.month)
    },
    // 获取监测月报的数据
    getCheckRepportData(url,year){
      this.indexType =[];
        this.$fetch(url,{year:year}).then(res => {
            // debugger
            if(res.data && res.data.length>0) this.indexType = res.data
        })
    },
        // 获取不同电站的统计总量
    onChange(val) {
  
      this.allStationMsg.forEach(t => {
        if (val[0] == t.projectName) this.powerNum = t.projectCode;
      });
      this.getCheckRepportData(
        "/AppApi/Base/QueryRunReportData",
        this.selYear
      );
    },
    viewPdf(pdfData) {
      this.$router.push({ name: "viewPDF", query: pdfData });
      // window.open('static/build/generic/web/viewer.html?file='+encodeURIComponent('http://114.116.102.217:4303/Content/大同报告测试（2019年4月）.pdf'))
      // window.open('static/build/generic/web/viewer.html?file='+encodeURIComponent('http://114.116.102.217:4303/Content/大同报告测试（2019年4月）.pdf'))

    },
    downLoad(pdfData) {
      
      mui.plusReady(function() {
        console.log(pdfData.url);
        //   plus.io.requestFileSystem( plus.io.PRIVATE_WWW, function( fs ) {
        //   // 可通过fs操作PRIVATE_WWW文件系统

        // });
        plus.nativeUI.showWaiting("正在下载中,请勿操作");
        var wgtOption = { filename: "_downloads/", retry: 1, method: "GET" };
        var dtask = plus.downloader.createDownload(
          // pdfData.url,
          "http://www.creei.cn/upload/portal/20190118/fb41433d9046b4befbac1f0ba2e14d32.pdf",
          wgtOption,
          function(d, status) {
            if (status == 200) {
              console.log("进入下载功能" + status + "d.filename");
              var fileUrl = d.filename;
              plus.nativeUI.closeWaiting();
              mui.toast("下载成功,文件保存在" + d.filename);
            } else {
              plus.nativeUI.alert("下载失败！");
              plus.nativeUI.closeWaiting();
            }
          }
        );
        dtask.start();
      });
    },
    cancel() {},
    onChangeYear(val) {
      this.selYear = val;
      this.getCheckRepportData("/AppApi/Base/QueryRunReportData",this.selYear);
    }
  },
  filters: {}
};
</script>
<style lang="less" scoped>
.measureRpt {
  display: flex;
  flex-direction: column;
  .indexBox {
    flex: 1;
    overflow-x: hidden;
  }
  .nodata-show{
    flex: 1;
    overflow-x: hidden;
    text-align: center;
    margin-top: 0.2rem;
  }
}
.titleWrap {
  background: linear-gradient(to right, #65be24 0%, #48a73c 50%, #65be24 100%);
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.head-title {
  padding-top: 0 !important;
}
.soltTitle {
  display: flex;
  align-items: center;
  color: #ff9810;
  font-family: "number";
  font-size: 0.18rem;
  img {
    margin-right: 0.1rem;
  }
}
</style>
<style lang="less">
.measureRpt .indexBox {
  margin-top: 0.1rem;
  .weui-cell {
    padding: 0.08rem 0.15rem;
  }
  .weui-cells.vux-no-group-title {
    margin-top: 0 !important;
    .vux-cell-bd.vux-cell-primary p {
      display: flex;
      align-items: center;
    }
  }
  .value {
    color: #ff9810;
    font-size: 0.2rem;
  }
  .vux-label-desc {
    color: #333;
    font-size: 0.14rem;
  }
}
</style>
