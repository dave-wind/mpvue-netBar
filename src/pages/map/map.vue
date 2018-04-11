<template>
  <div>
    <map id="map"
         :longitude="longitude"
         :latitude="latitude"
         scale="14"
         :markers="markers"
         @markertap="doMarkertap"
         show-location
         style="width: 100%;height: 60vh">
    </map>
    <div class="address-data" v-if="address">
      <div>{{netName}}</div>
      <div>
        地址：{{address}}
      </div>
    </div>
    <permission :permit="permit" @alertPermit="alertPermit"></permission>
    <div class="go-bar" v-show="address" @click="goBar">
      <icon type="info" class="weui-flex__item" :size="40"/>
    </div>
  </div>
</template>

<script>
  import wxp from '../../api/wxp';
  import Permission from '../../components/no-permis';

  const gdKey = 'cd17f895f7d70ef688f4bf600e067a8e';
  const qqKey = 'XCEBZ-MEE3F-XAZJN-NKBX7-HXLTS-BIF6J';
  const QQMapWX = require('../../utils/map/qqmap-wx-jssdk.js');
  const amapFile = require('../../utils/map/amap-wx.js');

  export default {
    components: {
      Permission,
    },
    data() {
      return {
        amapInstance: null,
        qqMapSdk: null,
        longitude: 0,
        latitude: 0,
        markers: [],
        netName: '',
        address: '',
        permit: false,
        disLongitude: 0, //目标地点 经纬度
        disLatitude: 0
      };
    },
    mounted() {
      this.getLocation();
    },
    methods: {
      getUserInfo() {
        // 调用登录接口
        wx.getUserInfo({
          complete: ({userInfo}) => {
            if (!userInfo) {
              wxp.showToast({title: '游客你好', icon: 'none'});
              return false
            }
            const name = userInfo.nickName;
            wxp.showToast({title: `${name} 你好`, icon: 'none'});
            this.mapInitSDK();
          },
        });
      },
      mapInitSDK() {
        this.amapInstance = new amapFile.AMapWX({key: gdKey});
        this.qqMapSdk = new QQMapWX({key: qqKey});
        this.searchNetWork();
      },
      getLocation() {
        wxp.getLocation({type: 'gcj02'}).then((res) => {
          this.longitude = res.longitude;
          this.latitude = res.latitude;
          this.destination = res.destination;
          this.briefAddr = res.briefAddr;
          this.getUserInfo();
        }).catch(() => {
          // 没权限的 组件
          this.permit = true;
        });
      },
      searchNetWork() {
        this.qqMapSdk.search({
          keyword: '网吧',
          location: {
            latitude: this.latitude,
            longitude: this.longitude,
          },
          success: (res) => {
            // 关闭loading
            wx.hideLoading();
            // 根据返回的结果marker在地图上面
            const data = res.data;
            this.refactorMapArray(data);
          },
          fail: () => {
            // 关闭loading
            wx.hideLoading();
          },
        });
      },
      refactorMapArray(array) {
        const result = [];
        array.forEach((item) => {
          result.push({
            distance: item['_distance'],
            briefAddr: item.address,
            address: item.address,
            category: item.category,
            id: item.id,
            latitude: item.location.lat,
            longitude: item.location.lng,
            name: item.title,
          });
        });
        this.markers = result;
        this.initShowAddsByDis(result[0]);
      },
//      初始化的展示最近的 网咖数据
      initShowAddsByDis(val) {
        setTimeout(() => {
          wxp.showModal({content: '只展示1000米内网咖哦~', showCancel: false}).then(() => {
            this.netName = val.name;
            this.address = val.address;
            // 全局 的目的地经纬度
            this.disLongitude = val.longitude;
            this.disLatitude = val.latitude;
          });
        }, 1500);
      },
      doMarkertap(e) {
        this.netWorkAddressById(e.mp.markerId);
      },
//      展示 网吧地址信息
      netWorkAddressById(val) {
        this.markers.forEach(({id, name, address, longitude}) => {
          if (id === val) {
            // 展示信息
            this.netName = name;
            this.address = address;
            //  改变 全局的目的地经纬度
            this.disLongitude = val.longitude;
            this.disLatitude = val.latitude;
          }
        });
      },
      alertPermit() {
        this.permit = false;
        // 当用户已经开启 A权限设置 则不会出现A权限是否提示弹框
        this.getLocation();
      },
//      路线规划
      goBar() {
        let para = {
          disLongitude: this.disLongitude,
          disLatitude: this.disLatitude,
        };
        wx.navigateTo({
          url: `../goBar/goBar?para=${para}`,
        })
      }
    },
  };
</script>

<style scoped type="text/scss" lang="scss">
  @import "../../../static/scss/mixin.scss";

  .txt {
    font-size: 11pt;
  }

  .address-data {
    height: 40vh;
    padding: rpx(30);
    font-size: 13pt;
  }

  .go-bar {
    position: fixed;
    right: rpx(30);
    bottom: rpx(60);
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
