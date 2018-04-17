import Vue from 'vue';
import App from './App';
import store from './store'
import MpvueRouterPath from 'mpvue-router-patch';
import '../static/weui/css/weui.min.css';
import Tools from './global';

Vue.config.productionTip = false;
App.mpType = 'app'
Vue.prototype.$store = store
Vue.use(MpvueRouterPath);
Vue.use(Tools);
const app = new Vue(App);
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/index', 'pages/goBar/goBar'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#262930',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
    },
    tarBar: {},
  },
};
