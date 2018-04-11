<template>
  <div>
    You are the best one
  </div>
</template>
<script>
  //  const amapFile = require('../../utils/map/amap-wx.js');
  export default {
    data() {
      return {
        myAmapFun: null,
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        const obj = JSON.parse(this.$route.query.para);
        wx.getLocation({
          type: 'gcj02',
          success: () => {
            wx.openLocation({
              latitude: obj.disLatitude,
              longitude: obj.disLongitude,
              name: obj.netName,
              address: obj.address,
            });
          },
        });
      },
    },
  };
</script>
<style>
</style>
