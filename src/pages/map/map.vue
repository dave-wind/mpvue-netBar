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
        polyline: [],
        netName: '',
        address: '',
        permit: false,
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
            const name = userInfo.nickName || '游客';
            wxp.showToast({title: `${name} 你好`});
          },
        });
        this.mapInitSDK();
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
//        this.initShowAddsByDis(result[0]);
      },
      initShowAddsByDis(val) {
        wxp.showToast({title: '只展示1000米内网咖哦~'}).then(() => {
          this.netName = val.name;
          this.address = val.address;
        });
      },
      doMarkertap(e) {
        this.netWorkAddressById(e.mp.markerId);
      },
      netWorkAddressById(val) {
        this.markers.forEach(({id, name, address}) => {
          if (id === val) {
            this.netName = name;
            this.address = address;
          }
        });
      },
      alertPermit() {
        this.permit = false;
        // 当用户已经开启 A权限设置 则不会出现A权限是否提示弹框
        this.getLocation();
      },
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
</style>
