<template>
  <div>
    You are the best one
  </div>
</template>
<script>
  const amapFile = require('../../utils/map/amap-wx.js');
  export default {
    data () {
      return {
        myAmapFun: null,
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.myAmapFun = new amapFile.AMapWX({key: 'cd17f895f7d70ef688f4bf600e067a8e'});
        this.myAmapFun.getWalkingRoute({
          origin: '116.481028,39.989643',
          destination: '116.434446,39.90816',
          success: function (data) {
          },
        });
      },
    },
  }
</script>
<style>
</style>
