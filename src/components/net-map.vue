<template>
  <map id="map"
       :longitude="longitude"
       :latitude="latitude"
       :scale="scale"
       :markers="markers"
       :polyline="polyline"
       @markertap="doMarkertap"
       show-location>
  </map>
</template>
<script>
  import {mapGetters} from 'vuex';

  const gdKey = 'ac2233f4c7b653b3b4cca74e72bd90bd';
  const qqKey = 'XCEBZ-MEE3F-XAZJN-NKBX7-HXLTS-BIF6J';
  const QQMapWX = require('../utils/map/qqmap-wx-jssdk.js');
  const amapFile = require('../utils/map/amap-wx.js');

  export default {
    props: {
      longitude: {
        type: String,
        default: 0,
      },
      latitude: {
        type: String,
        default: 0,
      },
      search: {
        type: String,
        default: '网吧',
      },
    },
    data() {
      return {
        amapInstance: null,
        qqMapSdk: null,
        markers: [],
        polyline: [],
        stepList: [],
        scale: 15,
        // 目标地点 经纬度
        disLongitude: 0,
        disLatitude: 0,
      };
    },
    mounted() {
      this.mapInitSDK().then(() => {
        this.scale = 16;
        this.showUserInfo();
      });
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo',
        address: 'getAddress',
      }),
    },
    methods: {
      async mapInitSDK() {
        this.amapInstance = new amapFile.AMapWX({key: gdKey});
        this.qqMapSdk = new QQMapWX({key: qqKey});
        this.searchNetWork();
      },
      showUserInfo() {
        this.tip(`${this.userInfo.nickName}你好`).then(() => {
          this.tip('默认展示您最近的网咖');
        });
      },
      searchNetWork() {
        this.loading.show('Loading...');
        this.qqMapSdk.search({
          keyword: this.search,
          location: {
            longitude: this.longitude,
            latitude: this.latitude,
          },
          success: (res) => {
            this.loading.hide();
            // 根据返回的结果marker在地图上面
            const data = res.data;
            this.refactorMapArray(data);
          },
          fail: () => {
            this.loading.hide();
            this.tip('查无结果');
          },
        });
      },
      refactorMapArray(array) {
        const result = [];
        array.forEach((item) => {
          result.push({
            width: 30,
            height: 30,
            iconPath: "/static/img/marker.png",
            distance: item['_distance'],
            briefAddr: item.address,
            address: item.address,
            category: item.category,
            id: item.id,
            latitude: item.location.lat,
            longitude: item.location.lng,
            name: item.title,
          });
          result[0].callout = {
            content: '离你最近',
            color: '#ffffff',
            fontSize: 12,
            borderRadius: 10,
            bgColor: '#1dd388',
            padding: 5,
            display: 'ALWAYS',
          };
        });
        this.markers = result;
        this.initShowAddsByDis(result[0]).then(() => {
          this.drawWalkingRoute();
        });
      },
//      初始化的展示最近的 网咖数据
      async initShowAddsByDis(val) {
        const temp = {
          netName: val.name,
          address: val.address,
          distance: val.distance,
        }
        this.$store.commit('SET_ADDRESS', temp);
        this.disLongitude = val.longitude;
        this.disLatitude = val.latitude;
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
            const temp = {
              netName: name,
              address: address,
              distance: distance,
            }
            this.$store.commit('SET_ADDRESS', temp);
            this.disLongitude = longitude;
            this.disLatitude = latitude;
          }
        });
      },
      // 绘制路线
      drawWalkingRoute() {
        this.amapInstance.getWalkingRoute({
          origin: this.longitude + ',' + this.latitude,
          destination: this.disLongitude + ',' + this.disLatitude,
          success: (data) => {
            const duration = data.paths[0].duration;
            const temp = {
              duration: duration,
              end_jin: this.disLongitude,
              end_wei: this.disLatitude,
            }
            this.$store.commit('SET_ROUTEINFO', temp);
            this.getStepList(data.paths[0].steps);
            const points = []
            if (data.paths && data.paths[0] && data.paths[0].steps) {
              const steps = data.paths[0].steps;
              steps.forEach((item, i) => {
                const poLen = steps[i].polyline.split(';');
                poLen.forEach((jtem, j) => {
                  points.push({
                    longitude: parseFloat(poLen[j].split(',')[0]),
                    latitude: parseFloat(poLen[j].split(',')[1]),
                  });
                });
              });
            }
            this.polyline = [];
            this.polyline.push({
              points: points,
              color: '#f39800',
              width: 6,
            });
          },
        });
      },
      // 获取步行路线
      getStepList(list) {
        this.stepList = []
        list.forEach(({instruction}) => {
          this.stepList.push(instruction);
        })
        this.$store.commit('SET_STEPLIST', this.stepList);
      },
    },
    watch: {
      'longitude': function () {
        this.searchNetWork();
      },
    },
  };
</script>
<style>
  #map {
    width: 100%;
    height: calc(100vh - 180rpx);
    transform: translateZ(-100px);
  }
</style>
