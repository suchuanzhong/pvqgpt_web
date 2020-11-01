<template>
  <span>
    <ICountUp
      :startVal="startVal"
      :endVal="Number(endVal)"
      :decimals="decimals"
      :duration="duration"
    ></ICountUp>
  </span>
</template>

<script>
import ICountUp from "vue-count-to";

export default {
  // props:["endVal","decimals"],
  props: {
    endVal: {
      default: 0
    },
    decimals: {
      default: 0
    },
    startVal: {
      default: 0
    }
  },
  components: {
    ICountUp
  },
  watch: {
    endVal(newVal) {
      this.endVal = newVal;
    }
  },
  data() {
    return {
      // startVal: 0,
      duration: 2000
    };
  }
};
</script>

<style lang="css"></style>
