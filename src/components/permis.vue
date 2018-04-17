<template>
  <div class="notLine" v-if="permit">
    <div class="img-wrap">
      <img src="http://s1.axhome.com.cn/anxin/images/not-404.png" alt="">
    </div>
    <div class="txt">没权限 你找个锤子~</div>
    <div class="btn-wrap">
      <button type="bottom" @click="resetGetpermis">重新获取权限</button>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        userRefuse: null,
      };
    },
    computed: {
      ...mapGetters({
        permit: 'getPermit',
      })
    },
    mounted () {
      this.locationPermis();
    },
    methods: {
      locationPermis() {
        wx.getLocation({
          type: 'gcj02',
          success: (res) => {
            const temp = {
              longitude: res.longitude,
              latitude: res.latitude,
              destination: res.destination,
              briefAddr: res.briefAddr,
            }
            this.$store.commit('SET_MAP_DATA', temp)
            this.getUserInfo();
          },
          fail: () => {
            // 展示没权限的 组件
            this.$store.commit('SET_PERMIT', true);
          }
        });
      },
      getUserInfo() {
        wx.getUserInfo({
          complete: ({userInfo}) => {
            this.$store.commit('SET_USER', userInfo);
          },
        });
      },
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
            // 点击“确认”时打开设置页面
            if (res.confirm) {
              console.log('用户点击确认');
              wx.openSetting({ // 当用户已经开启 A权限设置 则不会出现A权限是否提示弹框
                success: () => {
                  this.$store.commit('SET_PERMIT', false);
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
  @import "../../static/scss/mixin.scss";

  .notLine {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    padding-top: 30vh;
    z-index: 120;
    background-color: #fff;
  }

  .img-wrap {
    width: 100%;
    text-align: center;
    margin-bottom: rpx(50);
  }

  .img-wrap image {
    width: rpx(240);
    height: rpx(103);
  }

  .txt {
    width: 100%;
    text-align: center;
    font-weight: 500;
  }

  .btn-wrap {
    width: rpx(350);
    margin-top: rpx(50);
    margin-left: auto;
    margin-right: auto;
  }
</style>
