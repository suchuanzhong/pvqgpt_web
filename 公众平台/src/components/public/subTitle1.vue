<template>
  <div class="zui-sub-title">
    <h2>{{ text }}</h2>
    <img src="../../assets/img/index/bg-frame.png" alt="" />
    <p>{{ en | toUpperCase }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  filters: {
    toUpperCase(text) {
      return text.toUpperCase();
    }
  },
  props: {
    text: {
      default: "标题"
    },
    en: {
      default: "title"
    }
  }
};
</script>
<style lang="scss" scoped>
.zui-sub-title {
  h2 {
    font-size: 18px;
    color: #000;
    display: inline-block;
  }
  img {
    padding-left: 6px;
  }
  p {
    font-size: 14px;
    color: #888888 !important;
  }
}
</style>
