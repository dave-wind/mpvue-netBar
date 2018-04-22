/**
 * Created by dave on 2018/4/10.
 */
import Vue from 'vue';
import App from './index';

const app = new Vue(App)
app.$mount()

export default  {
  config: {
    navigationBarTitleText: '步行路线规划',
  },
};
