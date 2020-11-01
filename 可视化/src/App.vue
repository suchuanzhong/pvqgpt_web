<template>
  <div id="app">
    <!-- <left></left>
    <Logo></Logo>
    <Weather></Weather> -->
    <!-- <div id="nav">
      <NavList></NavList>
    </div> -->
    <router-view/>

  </div>
</template>
<script>
import left from '@/components/Home/left'
import Logo from '@/components/Home/logo'
import Weather from "./components/Home/weather";
// import NavList from "./components/NavList.vue";
  export  default {
    data(){
      return {
      }
    },
    components:{
    //   left,
    //   Weather,
    //   Logo,
      // NavList
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
@import url(./assets/scss/style.scss);
</style>
