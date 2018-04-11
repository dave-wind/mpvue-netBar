<template>
  <div>
    You are the best one
  </div>
</template>
<script>
  //  const amapFile = require('../../utils/map/amap-wx.js');
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
        wx.chooseLocation({
          success: (res) => {
            console.log(res);
          }
        })
      },
    },
  }
</script>
<style>
</style>
