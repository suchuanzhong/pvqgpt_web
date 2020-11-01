<template>
  <mt-header :title="title">
    <router-link :to="{'name':backPagePathName}" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>
</template>
<script>
export default {
    props:['backPagePathName'],
    data(){
        return{
           pathName:'',
           title:''
        }
    },
    mounted(){
        this.title=this.$route.meta.name;
    },
    methods:{

    }
}
</script>