<template>
  <div class="address-data">
    <div class="name">{{netName}}</div>
    <div class="address">
    地址:{{addr}}
    </div>
    <div class="distance">距离你：{{distance}}米</div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default {
    computed: {
      ...mapGetters({
        address: 'getAddress',
      }),
      'netName': function () {
        return this.address.netName;
      },
      'addr': function () {
        return this.address.address;
      },
      'distance': function () {
        return this.address.distance;
      }
    },
  }
</script>
<style scoped type="text/scss" lang="scss">
  @import "../../static/scss/mixin.scss";

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
</style>
