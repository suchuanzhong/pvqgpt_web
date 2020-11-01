<template>
  <h3 class="short_title">
    <label>{{ title }}</label><span v-if="subTitle">&emsp;{{ subTitle }}</span>
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
  background: url("/img/index/underline_short.png") no-repeat bottom;
  background-size: 100% auto;
  font-weight: normal;
  font-size: 20px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  //   color: #00baff;
  label{
    color: #000;
  }
  span {
    display: inline-block;
    font-family:MStiffHeiPRC;
    font-size: 10px;
    color: #878787;
    padding-left: 10px;
  }
  img {
    position: absolute;
    right: 0;
  }
}
</style>
