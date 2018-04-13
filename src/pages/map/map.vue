<template>
  <div>
    <map id="map"
         :longitude="longitude"
         :latitude="latitude"
         scale="14"
         :markers="markers"
         :polyline="polyline"
         @markertap="doMarkertap"
         show-location>
    </map>
    <div class="address-data" v-if="address">
      <div class="name">{{netName}}</div>
      <div class="address">
        地址:{{address}}
      </div>
      <div class="distance">距离你：{{distance}}米</div>
    </div>
    <div class="go-bar" v-show="stepList.length>0" @click="goDetail">
      <icon type="info" class="weui-flex__item" :size="40"/>
    </div>
    <permission :permit="permit" @alertPermit="alertPermit"></permission>
  </div>
</template>

<script>
  import wxp from 'minapp-api-promise';
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
        stepList: [],
        netName: '',
        address: '',
        distance: '',
        duration: '',
        permit: false,
        disLongitude: 0, // 目标地点 经纬度
        disLatitude: 0,
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
            this.distance = val.distance;
            // 全局 的目的地经纬度
            this.disLongitude = val.longitude;
            this.disLatitude = val.latitude;
          });
        }, 1500);
      },
      // 点击事件
      doMarkertap(e) {
        this.netWorkAddressById(e.mp.markerId);
        this.drawWalkingRoute();
      },
//      展示 网吧地址信息
      netWorkAddressById(val) {
        this.markers.forEach(({id, name, address, distance, longitude, latitude}) => {
          if (id === val) {
            // 展示信息
            this.netName = name;
            this.address = address;
            this.distance = distance;
            //  改变 全局的目的地经纬度
            this.disLongitude = longitude;
            this.disLatitude = latitude;
          }
        });
      },
      alertPermit() {
        this.permit = false;
        // 当用户已经开启 A权限设置 则不会出现A权限是否提示弹框
        this.getLocation();
      },
      // 绘制路线
      drawWalkingRoute() {
        this.amapInstance.getWalkingRoute({
          origin: this.longitude + ',' + this.latitude,
          destination: this.disLongitude + ',' + this.disLatitude,
          success: (data) => {
            this.duration = data.paths[0].duration;
            this.getStepList(data.paths[0].steps);
            let points = []
            if (data.paths && data.paths[0] && data.paths[0].steps) {
              let steps = data.paths[0].steps;
              steps.forEach((item, i) => {
                let poLen = steps[i].polyline.split(';');
                poLen.forEach((jtem, j) => {
                  points.push({
                    longitude: parseFloat(poLen[j].split(',')[0]),
                    latitude: parseFloat(poLen[j].split(',')[1])
                  })
                })
              })
            }
            this.polyline = [];
            this.polyline.push({
              points: points,
              color: '#f39800',
              width: 6
            })
          }
        })
      },
      // 获取步行路线
      getStepList (list) {
        this.stepList = []
        list.forEach(({instruction}) => {
          this.stepList.push(instruction);
        })
      },
      //  查看详情路线
      goDetail() {
        const para = {
          stepList: this.stepList,
          netName: this.netName,
          address: this.address,
          duration: this.duration,
          jin: this.disLongitude,
          wei: this.disLatitude,
        };
        wx.navigateTo({
          url: `../goBar/goBar?para=${JSON.stringify(para)}`,
        });
      },
    },
  };
</script>

<style scoped type="text/scss" lang="scss">
  @import "../../../static/scss/mixin.scss";

  .txt {
    font-size: 11pt;
  }

  #map {
    width: 100%;
    height: calc(100vh - 175rpx);
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
