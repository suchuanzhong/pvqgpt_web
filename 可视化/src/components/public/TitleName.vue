<template>
  
    <div class="my-title">
      <div class="my-name">{{title}}</div>
        
    </div>
 
</template>
<script>

export default {
  props: {
    title: {
      default: "haha"
    },
   
  },

	filters:{
		upper(value){
			return value.toUpperCase();
		}
	},
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>

.gradient-blue {
  background-image: -webkit-gradient(linear,0 0,0 bottom,from(#02e1ff),to(#036cff));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.my-title {
  width: 370px;
  height: 47px;
  display: inline-block;
  background: url("../../assets/img/title-bg.png")center no-repeat;

  }
 .my-name{
   text-align: center;
   color: #fff;
   font-size: 20px;
   line-height: 44px;
 }
  

 
</style>
