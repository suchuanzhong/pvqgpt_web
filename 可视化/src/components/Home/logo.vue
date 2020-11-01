<template>
    <div class="logo">
        <img src="../../assets/img/logo.png" alt="">
    </div>
</template>

<script>
    export default {
        name: "logo"
    }
</script>

<style scoped>
    .logo{
        position: absolute;
        left: 50%;
        top:0;
        transform: translate(-50%);
        z-index: 999;
    }
</style>
