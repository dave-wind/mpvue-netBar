<template>
  <div class="container">
    <div v-if="permit">
      <net-map
        :longitude="longitude"
        :latitude="latitude"
        :search="search">
      </net-map>
      <net-address></net-address>
      <fixed-btn :cname="fxClass" typeInfo="info" :fxShow="fxShow" @click="goDetail"></fixed-btn>
    </div>
    <permission
      @changePermit="changePermit"
      @setLocation="setLocation"
      @getUserInfo="getUserInfo"
      @openSetting="openSetting">
    </permission>
  </div>
</template>

<script>
  import Permission from '../../components/permis';
  import NetMap from '../../components/net-map';
  import NetAddress from '../../components/address';
  import FixedBtn from '../../components/fixation';
  import {mapGetters} from 'vuex';

  export default {
    components: {
      Permission,
      NetMap,
      NetAddress,
      FixedBtn,
    },
    data() {
      return {
        permit: false,
        longitude: 0,
        latitude: 0,
        search: '网吧',
        fxClass: 'goBar',
        fxShow: false,
      };
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo',
        address: 'getAddress',
        stepList: 'getStepList',
        routeInfo: 'getRouteInfo',
      }),
    },
    methods: {
      setLocation(val) {
        this.longitude = val.longitude;
        this.latitude = val.latitude;
        return this.longitude;
      },
      getUserInfo(val) {
        if (val) {
          this.$store.commit('SET_USER', val);
        } else {
          this.$store.commit('SET_USER', '游客');
        }
      },
      changePermit(val) {
        return val;
      },
      //  查看详情路线
      goDetail() {
        const para = {
          stepList: this.stepList,
          netName: this.address.netName,
          address: this.address.address,
          duration: this.routeInfo.duration,
          jin: this.routeInfo.end_jin,
          wei: this.routeInfo.end_wei,
        };
        wx.navigateTo({
          url: `../goBar/goBar?para=${JSON.stringify(para)}`,
        });
      },
    },
    watch: {
      'userInfo': function () {
        this.permit = true;
      },
      'stepList': function () {
        this.fxShow = true;
      },
    },
  };
</script>

<style type="text/scss" lang="scss">
  @import "../../../static/scss/mixin.scss";

  .txt {
    font-size: 11pt;
  }

  .goBar {
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
  /*btn*/
  .fixed {
    position: fixed;
    right: rpx(30);
    bottom: rpx(60);
    z-index: 100;
  }
</style>
