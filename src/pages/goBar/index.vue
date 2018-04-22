<template>
  <div>
    <div class="weui-cells__title">{{netName}}路线如下：</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell" v-for="(item,index) in list" :key="index">
        <div class="weui-cell__bd">{{item}}</div>
      </div>
    </div>
    <net-fixed
      :cname="fxClass"
      iconShow="false"
      :iconShow="iconShow"
      @click="navigation">
      <img class="go" src="http://s1.axhome.com.cn/wechat/nv-icon.png" alt="">
    </net-fixed>
  </div>
</template>
<script>
  import NetFixed from '../../components/net-fixed';

  export default {
    components: {
      NetFixed,
    },
    data() {
      return {
        fxClass: 'navigation',
        iconShow: false,
      };
    },
    mounted() {
    },
    computed: {
      'obj': function () {
        // If you must reassign references, use let  Use const for all of your references
        const para = JSON.parse(this.$root.$mp.query.para);
        return para;
      },
      'netName': function () {
//       {{}}不能直接获取对象下属性 ex: this.obj.netName
        const name = this.obj.netName;
        return name;
      },
      'list': function () {
        const time = parseInt(this.obj.duration / 60);
        const t = `用时：约${time} 分钟`;
        this.obj.stepList.push(t)
        return this.obj.stepList;
      },
    },
    methods: {
//       内置wx 地图导航
      navigation() {
        wx.getLocation({
          type: 'gcj02',
          success: () => {
            wx.openLocation({
              longitude: this.obj.jin,
              latitude: this.obj.wei,
              name: this.obj.netName,
              address: this.obj.address,
              scale: 18,
            });
          },
        });
      },
    },
  };
</script>
<style type="text/scss" lang="scss">
  @import "../../../static/scss/mixin.scss";

  .navigation {
    width: rpx(80);
    height: rpx(80);
    z-index: 100;
    animation: scale 0.5s 0.5s infinite;
    img.go {
      display: block;
      width: rpx(80);
      height: rpx(80);
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
