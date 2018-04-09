/**
 * Created by dave on 2018/3/21.
 */
import Vue from 'vue'
import App from './map'

const app = new Vue(App)
app.$mount()

export default  {
  config: {
    navigationBarTitleText: '小宝带你找网咖'
  }
}
