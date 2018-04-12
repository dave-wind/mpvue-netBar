<script>
export default {
};
</script>
<style>
  #app {
    position: relative;
  }
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
<!-- 公共css 引入 入口 App.vue-->
<style type="text/scss" lang="scss">
  @import "../static/scss/public.scss";
</style>
