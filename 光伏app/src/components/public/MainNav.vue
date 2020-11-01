<template>
  <div class="viewBox">

    <div class="container">
  
        <router-view></router-view>
     
    </div>
    <mt-tabbar v-model="selected" class="mainNav" ref="tabbar">
      <mt-tab-item :id="item.id" v-for="(item,index) in mainNavList" :key="index" :class='{navone:index==0}'>
        <img slot="icon" :src='`static/img/0${index+1+(item.id==selected?"s":null)}.png`'>
        {{item.name}}
      </mt-tab-item>

    </mt-tabbar>
  </div>
</template>
<script>

export default {
  data() {
    return {
      selected: "stationBase",
      mainNavList: [
        { id: "stationBase", name: "光伏领跑" },
        { id: "runAnalysis", name: "运行分析" },
        { id: "measureRpt", name: "监测月报" },
        { id: "userSet", name: "个人中心" }
      ],
    
    };
  },
  mounted() {
    this.selected = this.$route.name;
  },
  computed: {},
  watch: {
    selected: function(newVal, oldVal) {
      this.$router.push({ name: newVal });
    },
  },
};
</script>
<style lang="less" scoped>
.viewBox {
  height: 100%;
  width: 100%;
  .container {
    height: calc(~"(100% - 0.55rem)");
  }
}


</style>
<style >
.navone .mint-tab-item-icon{
    width: 28px;
    height: 24px;
    margin: 0 auto 5px
}
</style>

