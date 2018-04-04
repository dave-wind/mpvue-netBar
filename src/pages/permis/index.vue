<template>
  <div>
    <div class="notLine" v-show="permit">
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
    props: ['permit'],
    data() {
      return {
        userRefuse: null,
      };
    },
    methods: {
      resetGetpermis() {
        wx.getSetting({
          success: (res) => {
            if (!res.authSetting['scope.userLocation']) {
              this.openConfirm();
            }
          },
        });
      },
      openConfirm() {
        wx.showModal({
          content: '检测到您没打开定位权限，是否去设置打开？',
          confirmText: '确认',
          showCancel: false,
          success: (res) => {
            console.log(res);
            // 点击“确认”时打开设置页面
            if (res.confirm) {
              console.log('用户点击确认');
              wx.openSetting({
                success: () => {
                  this.$emit('alertPermit');
                },
              });
            }
          },
        });
      },
    },
  };
</script>
<style scoped type="text/scss" lang="scss">
  .notLine {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    padding-top: 30vh;
    z-index: 100;
    background-color: #fff;
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
