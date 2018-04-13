<template>
  <div>
    <div class="weui-cells__title">{{netName}}路线如下：</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell" v-for="(item,index) in list" :key="index">
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
        a: '233',
      };
    },
    mounted() {
    },
    computed: {
      'obj': function () {
        // If you must reassign references, use let  Use const for all of your references
        const para = JSON.parse(this.$root.$mp.query.para);
        return para
      },
      'netName': function () {
//       {{}}不能直接获取对象下属性 ex: this.obj.netName
        const name = this.obj.netName;
        return name;
      },
      'list': function () {
        const time = parseInt(this.obj.duration / 60);
        const t = `需用时：${time} 分钟`;
        this.obj.stepList.push(t)
        return this.obj.stepList;
      }
    },
    methods: {
//       内置wx 地图导航
      navigation() {
        wxp.getLocation({type: 'gcj02'}).then(() => {
          wx.openLocation({
            latitude: parseFloat(this.obj.disLatitude),
            longitude: parseFloat(this.obj.disLongitude),
            name: this.obj.netName,
            address: this.obj.address,
            scale: 28
          })
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
