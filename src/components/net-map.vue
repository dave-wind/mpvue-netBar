<template>
  <map id="map"
       :longitude="longitude"
       :latitude="latitude"
       scale="14"
       :markers="markers"
       :polyline="polyline"
       @markertap="doMarkertap"
       show-location>
  </map>
</template>
<script>
  import wxp from '../api/wxp';
  import Bus from '../bus';
  import {mapGetters} from 'vuex';

  const gdKey = 'cd17f895f7d70ef688f4bf600e067a8e';
  const qqKey = 'XCEBZ-MEE3F-XAZJN-NKBX7-HXLTS-BIF6J';
  const QQMapWX = require('../utils/map/qqmap-wx-jssdk.js');
  const amapFile = require('../utils/map/amap-wx.js');

  export default {
    data () {
      return {
        amapInstance: null,
        qqMapSdk: null,
        longitude: 0,
        latitude: 0,
        markers: [],
        polyline: [],
        stepList: [],
        duration: '',
        // 目标地点 经纬度
        disLongitude: 0,
        disLatitude: 0,
        // Address 组件
        netName: '',
        address: '',
        distance: '',
      }
    },
    mounted () {
//      this.initBus();
      this.init();
    },
    computed: {
      ...mapGetters({
        permit: 'getPermit',
        mapData: 'getMapData',
        userInfo: 'getUserInfo',
      }),
    },
    methods: {
      initBus () {
        Bus.$on('init', this.init);
      },
      getUserInfo() {
        this.mapInitSDK();
        if (!this.userInfo) {
          this.tip('游客你好');
        } else {
          const name = this.userInfo.nickName;
          this.tip(`${name} 你好`)
        }
      },
      init() {
        console.log(23333);
        return false
//        this.longitude = this.mapData.longitude;
//        this.latitude = this.mapData.latitude;
//        this.destination = this.mapData.destination;
//        this.briefAddr = this.mapData.briefAddr;
        this.getUserInfo();
      },
      mapInitSDK() {
        this.amapInstance = new amapFile.AMapWX({key: gdKey});
        this.qqMapSdk = new QQMapWX({key: qqKey});
        this.searchNetWork();
      },
      searchNetWork() {
        this.loading.show('Loading...');
        this.qqMapSdk.search({
          keyword: '网吧',
          location: {
            latitude: this.latitude,
            longitude: this.longitude,
          },
          success: (res) => {
            this.loading.hide();
            // 根据返回的结果marker在地图上面
            const data = res.data;
            this.refactorMapArray(data);
          },
          fail: () => {
            this.loading.hide();
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
        let temp = {
          netName: val.name,
          address: val.address,
          distance: val.distance,
          disLongitude: val.disLongitude,
          disLatitude: val.disLatitude,
        }
        this.$store.commit('SET_ADDRESS', temp);
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
            let temp = {
              netName: name,
              address: address,
              distance: distance,
              disLongitude: longitude,
              disLatitude: latitude,
            }
            this.$store.commit('SET_ADDRESS', temp);
          }
        });
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
    },
  }
</script>
<style>
  #map {
    width: 100%;
    height: calc(100vh - 175rpx);
  }
</style>
