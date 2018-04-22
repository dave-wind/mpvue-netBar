<template>
  <div class="address-data" v-if="addrShow">
    <div class="name" @click="$emit('click',$event)">{{netName}}</div>
    <div class="address">
      地址:{{addr}}
    </div>
    <div class="distance">距离你：{{distance}}米</div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  export default {
    props: ['addrShow'],
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
      },
    },
  };
</script>
<style scoped type="text/scss" lang="scss">
  @import "../../static/scss/mixin.scss";

  .address-data {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: rpx(180);
    padding: 0 0 0 rpx(20);
    font-size: 10pt;
    z-index: 80;
    .name {
      width: 100%;
      color: #f39800;
      font-weight: 600;
      font-size: 12pt;
      text-decoration: underline;
    }
    .address {
      width: 100%;
      font-size: 10pt;
    }
  }
</style>
