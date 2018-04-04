<template>
  <div>
    <div class="notLine">
      <div class="img-wrap">
        <img src="http://s1.axhome.com.cn/anxin/images/not-404.png" alt="">
      </div>
      <div class="txt">没权限你 找个锤子网吧~</div>
      <div class="btn-wrap">
        <button type="bottom" @click="resetGetpermis">重新获取权限</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        userRefuse: null,
      };
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.userRefuse = this.$route.query.user;
      },
      resetGetpermis() {
      },
    },
  };
</script>
<style scoped type="text/scss" lang="scss">
  .notLine {
    width: 100%;
    height: 60vh;
    padding-top: 30vh;
  }

  .img-wrap {
    width: 100%;
    text-align: center;
    margin-bottom: 50rpx;
  }

  .img-wrap image {
    width: 240rpx;
    height: 103rpx;
  }

  .txt {
    width: 100%;
    text-align: center;
    font-weight: 500;
  }

  .btn-wrap {
    width: 350rpx;
    margin-top: 50rpx;
    margin-left: auto;
    margin-right: auto;
  }
</style>
