<template>
  <h3 class="short_title">
    <label style="cursor: pointer;">{{ title }}</label
    ><span v-if="subTitle">&emsp;{{ subTitle }}</span>
    <slot></slot>
  </h3>
</template>

<script>
export default {
  props: {
    title: {
      default: "基本概况"
    },
    subTitle: {
      default: "BASIC OVERVIEW"
    }
  }
};
</script>

<style lang="scss" scoped>
.short_title {
  padding-bottom: 5px;
  font-size: 18px;
  /*padding-right: 32px;*/
  color: #010101;

  span {
    display: inline-block;
    font-family: "MStiffHeiPRC-Bold";
    font-size: 18px;
    color: #1bac6b;
  }
  img {
    position: absolute;
    right: 0;
  }
}
/*.short_title :active{*/
/*    font-size: 18px;*/
/*    color: #1bac6b;*/
/*    border-bottom: 1px solid #1bac6b;*/
/*}*/
</style>
