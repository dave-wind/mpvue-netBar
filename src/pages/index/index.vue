<template>
  <div class="container">
    <div v-if="show">
      <net-map></net-map>
      <!--<div class="go-bar" v-show="stepList.length>0" @click="goDetail">-->
      <!--<icon type="info" class="weui-flex__item" :size="40"/>-->
      <!--</div>-->
    </div>
    <permission></permission>
  </div>
</template>

<script>
  import wxp from '../../api/wxp';
  import Permission from '../../components/permis';
  import NetMap from '../../components/net-map';
  import Bus from '../../bus';
  import {mapGetters} from 'vuex';
  import NetAddress from '../../components/address';

  export default {
    components: {
      Permission,
      NetMap,
      NetAddress,
    },
    data() {
      return {
        show: false,
//      Address 组件
        netName: '',
        address: '',
        distance: '',
      };
    },
    computed: {
      ...mapGetters({
        permit: 'getPermit'
      }),
    },
    methods: {
      //  查看详情路线
      goDetail() {
//        const para = {
//          stepList: this.stepList,
//          netName: this.netName,
//          address: this.address,
//          duration: this.duration,
//          jin: this.disLongitude,
//          wei: this.disLatitude,
//        };
        wx.navigateTo({
          url: '../goBar/goBar',
        });
      },
    },
    watch: {
      'permit': function (val) {
        if (!val) {
//          this.init();
          console.log(val);
        }
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  @import "../../../static/scss/mixin.scss";

  .txt {
    font-size: 11pt;
  }

  .address-data {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: rpx(20) 0 rpx(20) rpx(20);
    font-size: 12pt;
    background-color: #ffffff;
    .name {
      width: 100%;
      font-weight: 600;
    }
    .address {
      width: 90%;
      font-size: 11pt;
    }
  }

  .go-bar {
    position: fixed;
    right: rpx(30);
    bottom: rpx(60);
    z-index: 100;
    animation: scale 0.5s 0.5s both;
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
