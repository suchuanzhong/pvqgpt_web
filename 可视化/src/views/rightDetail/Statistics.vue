<template>
  <div class="arrs">
    <div class="left-btn" @click="toggleLeft" :class="{hideRight:(hideRight||!showRightBtn)}" v-show="showlegend"></div>
    <div class="right-btn" @click="toggleRight" v-if="showRightBtn" :class="{hideRight:hideRight}"></div>
    <div class="legend" :class="{hideRight:(hideRight||!showRightBtn)}" v-show="showlegend"></div>
    <div class="right-shadow">
    <div class="right-box hideContentRight">
      <div class="right-bg">
      
        <div class="seationbg">
          <Title :title="DataType+'基地排名'"></Title>
          <div style="padding-right:10px">
            <echartsBarVertical style="height:840px;" :title="DataType" v-if="barDatas.dataArr.length>0" :dataArr="barDatas.dataArr" :unit="barDatas.unit" :axisData="barDatas.xAsixData"></echartsBarVertical>
          </div>
        </div>
        
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import Title from "@/components/public/TitleName";
import echartsBarVertical from "@/components/public/echarts/echartsBarVertical";
import { mapGetters} from 'vuex'
export default {
  name: "Overview",
  components: {
    Title,echartsBarVertical
  },
  data() {
    return {
      hideLeft: false,
      hideRight: true,
      showRightBtn: true,
      showlegend: false,
      barDatas:{},
      DataType:""
      
    };
  },
   computed:{
     getStaticDatas(){
       return this.$store.state.staticData;
     },
     statistics(){
       return localStorage.getItem('JDstatisticData')
     }
    },
  watch: {
    statistics(data){
    },
    $route(route) {
      this.hideLeft = false;
      this.hideRight = false;
      this.showRightBtn = true;
    },
    getStaticDatas(data){
    },
    '$store.state.staticData':(data)=>{
    }
  },
  created() {
    let barDatas=localStorage.getItem('JDstatisticData');
    let locData=JSON.parse(barDatas);
    this.barDatas=locData.barData;
    this.DataType=locData.dataType;
  },
  methods: {
    toggleLeft() {
      this.hideLeft = !this.hideLeft;
      $(".left-shadow").toggleClass("hideContentLeft");
    },
    toggleRight() {
      this.hideRight = !this.hideRight;
      $(".right-shadow").toggleClass("hideContentRight");
    },
  }
};
</script>
<style scoped lang="scss">

</style>


  
