<template>
  <div>
    <div :class="[paneClass,cname]" v-show="fxShow" @click="$emit('click',arguments[0])">
      <icon :type="typeInfo" class="weui-flex__item" :size="40" v-if="iconShow"/>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      cname: {
        type: String,
        default: '',
      },
      fxShow: {
        type: Boolean,
        default: true,
      },
      typeInfo: {
        type: String,
        default: '',
      },
      iconShow: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        paneClass: 'position',
      };
    },
  };
</script>
<style scoped type="text/scss" lang="scss">
  @import "../../static/scss/mixin.scss";

  .position {
    position: fixed;
    right: rpx(30);
    bottom: rpx(40);
    z-index: 100;
  }
</style>
