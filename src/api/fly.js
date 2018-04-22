/**
 * Created by dave on 2018/4/22.
 */
import Fly from 'flyio'

const request = new Fly();

// 请求拦截器
request.interceptors.request.use((request, promise) => {
  //给所有请求添加自定义header
  // request.headers["X-Tag"] = "flyio";
  wx.showNavigationBarLoading();
  return request;
})

// 响应拦截器
request.interceptors.response.use((response, promise) => {
    wx.hideNavigationBarLoading()
    return promise.resolve(response.data)
  }, (err, promise) => {
    wx.hideNavigationBarLoading()
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)
export default request

