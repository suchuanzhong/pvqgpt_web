<template>
  <div class="StationDes">
    <MtHeader backPagePathName="mainNav"></MtHeader>
    <div class="viewWrap">
      <div class="dis-img">
        <img src="static/img/jdjj01.jpg" alt />
      </div>
      <div class="dis-word">
        <label>{{baseName}}</label>
        <p>{{discription}}</p>
      </div>
      <!-- <div class="imgWrap">
        <div v-for="(item,index) in baseImgCollect" :key="index">
          <img :src="item.img" alt @click="showBigImg(item.img)">
          <p>{{item.name}}</p>
        <wimg :show="isShowBigImg" :imgs="imgs" :currentImg="current" @close="isShowBigImg = false"></wimg>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
import MtHeader from "@/components/public/MtHeader";
import wimg from "w-previewimg";
export default {
  components: { MtHeader, wimg },
  data() {
    return {
      discription: "", //文字描述
      navImg: "", //基地头部图片
      baseName: "", //基地的名字
      baseImgCollect: [], //存储基地图片
      isShowBigImg: false, //是否显示预览图片
      current: "", //当前显示的图片
      imgs: [] //预览图片的集合
    };
  },
  mounted() {
    this.getBaseIntroductionData();
  },
  methods: {
    // 获取基地介绍的数据信息
    getBaseIntroductionData() {
      // this.$fetch("/ManagerApi/DevBase/GetBaseInfo").then(res => {
      //   this.discription = res.data.des;
      //   this.navImg = res.data.imgs;
      //   this.baseName = res.data.name;
      //   this.baseImgCollect = eval(res.data.fullimgs);
      //   this.imgs = this.baseImgCollect;
      // });
      this.$fetch("/AppApi/Base/GetBaseInfo").then(res => {
        // debugger
        res.data.map(item => {
          this.baseName = item.name;
          this.discription = item.des;
        });
      });
    }
    // 展示当前图片的预览图
    // showBigImg(imgurl){
    //     this.current = imgurl;
    //     this.isShowBigImg = true;
    // }
  }
};
</script>
<style lang="less" scoped>
.StationDes {
  height: 100%;
  display: flex;
  flex-direction: column;
  .viewWrap {
    flex: 1;
    overflow-x: hidden;
  }
  .dis-img {
    padding-bottom: 0.1rem;
    img {
      width: 100%;
      height: auto;
    }
  }
  .dis-word {
    padding: 0.1rem;
    background: #fff;
    margin-bottom: 0.1rem;
    label {
      font-family: pingfang-blod;
    }
    p {
      padding-top: 0.1rem;
      text-indent: 2em;
      // height: 134px;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // display: -webkit-box;
      // -webkit-line-clamp: 6;
      // -webkit-box-orient: vertical;
      font-size: 0.14rem;
      line-height: 1.5;
    }
  }
}
.imgWrap {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  padding-top: 0.1rem;
  & > div {
    width: 50%;
    padding: 0.1rem;
    padding-top: 0;
    box-sizing: border-box;
    p {
      text-align: center;
      font-size: 0.14rem;
      padding: 0.05rem;
    }
    img {
      width: 100%;
      height: 1.2rem;
    }
  }
  & > div:nth-child(2n-1) {
    padding-right: 0.05rem;
  }
  & > div:nth-child(2n) {
    padding-left: 0.05rem;
  }
}
</style>

