<template>
  <div class="container">
    <div v-if="permit">
      <net-map
        :longitude="longitude"
        :latitude="latitude"
        :search="search">
      </net-map>
      <net-address
        :addrShow="fxShow"
        @click="goDetail">
      </net-address>
      <net-fixed
        :cname="fresh"
        :fxShow="fxShow"
        iconShow="false"
        @click="reFresh">
        <image class="img" src="/static/img/refresh.png"></image>
      </net-fixed>
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
  import NetFixed from '../../components/net-fixed';
  import {mapGetters} from 'vuex';

  export default {
    components: {
      NetFixed,
      Permission,
      NetMap,
      NetAddress,
    },
    data() {
      return {
        permit: false,
        longitude: 0,
        latitude: 0,
        search: '网吧',
        fxShow: false,
        fresh: 'fresh',
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
      },
      getUserInfo(val) {
        if (val) {
          this.$store.commit('SET_USER', val);
        } else {
          const temp = {
            nickName: '游客',
          }
          this.$store.commit('SET_USER', temp);
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
      reFresh() {
        this.locationPermis().then((res) => {
          if (res.longitude === this.longitude) {
            this.tip('已是最新定位');
          } else {
            this.setLocation(res);
          }
          this.changeName();
        });
      },
      changeName() {
        this.fresh = 'fresh swing';
        setTimeout(() => {
          this.fresh = 'fresh';
        }, 1000);
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

  .container {
    position: relative;
    box-sizing: border-box;
    min-height: 100vh;
    overflow: hidden;
  }

  .txt {
    font-size: 11pt;
  }

  .container {
    .fresh {
      position: absolute;
      width: rpx(80);
      height: rpx(80);
      bottom: rpx(35);
      font-size: 9pt;
      text-align: center;
      border-radius: 100%;
      .img {
        width: rpx(80);
        height: rpx(80);
      }
    }
    .swing {
      transform-origin: top center;
      animation-name: swing;
      animation-duration: 1s;
      animation-fill-mode: both
    }
  }
  //10n
  @keyframes swing {
    20% {
      transform: rotate3d(0, 0, 1, 45deg);
    }

    40% {
      transform: rotate3d(0, 0, 1, -30deg);
    }

    60% {
      transform: rotate3d(0, 0, 1, 20deg);
    }

    80% {
      transform: rotate3d(0, 0, 1, -10deg);
    }

    to {
      transform: rotate3d(0, 0, 1, 0deg);
    }
  }
</style>
