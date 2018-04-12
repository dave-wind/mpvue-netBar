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
  import wxp from 'minapp-api-promise';

  export default {
    data() {
      return {
        obj: null,
        netName: '',
        duration: 0,
        stepList: [],
      };
    },
    mounted() {
      this.init();
    },
    computed: {
      'list': function () {
//        在计算属性里 不能直接获取对象下属性
//        console.log(this.obj.stepList);
      },
    },
    methods: {
      init() {
        // npm i mpvue-router-patch -D 插件
        this.obj = JSON.parse(this.$route.query.para);
        this.netName = this.obj.netName;
        this.duration = this.obj.duration;
        const t = `需用时：${this.duration / 60} 分钟`;
        this.stepList = this.obj.stepList;
        this.stepList.push(t);
      },
//       内置wx 地图导航
      navigation() {
        wxp.getLocation({type: 'gcj02'}).then(() => {
          wx.openLocation({
            latitude: parseFloat(this.obj.disLatitude),
            longitude: parseFloat(this.obj.disLongitude),
            name: this.obj.netName,
            address: this.obj.address,
          });
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
