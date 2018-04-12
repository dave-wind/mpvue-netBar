<template>
  <div>
    <div class="weui-cells__title">{{netName}}路线如下：</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell" v-for="(item,index) in stepList" :key="index">
        <div class="weui-cell__bd">{{item}}</div>
      </div>
    </div>
    <div class="navigation" @click="navigation">
      <img src="http://s1.axhome.com.cn/wechat/nv-icon.png" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        netName: '',
        stepList: []
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.obj = JSON.parse(this.$route.query.para);
        this.netName = this.obj.netName;
        this.stepList = this.obj.stepList;
      },
//       内置wx 地图导航
      navigation() {
        wx.getLocation({
          type: 'gcj02',
          success: () => {
            wx.openLocation({
              latitude: parseFloat(this.obj.disLatitude),
              longitude: parseFloat(this.obj.disLongitude),
              name: this.obj.netName,
              address: this.obj.address,
            });
          },
        });
      },
    },
  };
</script>
<style scoped type="text/scss" lang="scss">
  @import "../../../static/scss/mixin.scss";

  .navigation {
    position: fixed;
    right: rpx(30);
    bottom: rpx(60);
    width: rpx(48);
    height: rpx(48);
    animation: scale 0.5s 0.5s infinite;
    img {
      display: block;
      @include wh100;
    }
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
