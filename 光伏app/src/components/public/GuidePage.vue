<template>
  <div class="guidePage">
    <img src="static/img/guideImg.jpg" alt width="100%" height="100%" class="guideImg" />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      this.$router.push("/login");
    }, 3000);
  },
  computed: {},
  watch: {}
};
</script>
<style lang="less" scoped>
.guidePage {
  height: 100%;
  width: 100%;
  .guideImg {
    animation: slideEnter 5s infinite;
  }
}
@keyframes slideEnter {
  0% {
    left: 0;
  }
  100% {
    left: 100%;
  }
}
</style>

