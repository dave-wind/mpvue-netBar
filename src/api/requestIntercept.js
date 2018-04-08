/**
 * Created by dave on 2018/4/8.
 */

export default{
  // 发出请求时的回调函数
  config (config) {
    // 请求前设置token
    const globalData = getApp().globalData
    if (globalData.auth && globalData.auth.token) {
      config.header = {
        Authorization: globalData.auth.token
      }
    }
    return config
  },

  // 请求成功后的回调函数
  async success (resp) {
    this.hideLoading()
    let errorMesg = ''
    // 可以在这里对收到的响应数据对象进行加工处理
    switch (resp.statusCode) {
      case 200:
        console.log('正常请求')
        break
      case 401:
        console.log('未登陆,拦截重定向登陆界面')
        await this.redirectTo({
          url: 'login'
        })
        break
      case 403:
        console.log('未授权接口,拦截')
        this.showModal({
          title: '警告',
          content: (resp.data.error && (resp.data.error.details || resp.data.error.message)) || '无权请联系管理员',
          confirmText: '我知道了',
          showCancel: false
        })
        throw new Error(errorMesg)
      case 500:
      case 502:
        errorMesg = (resp.data.error && (resp.data.error.details || resp.data.error.message)) || '服务器出错'
        break
      case 503:
        errorMesg = '哦～服务器宕机了'
        break
    }
    if (errorMesg.length > 0) {
      this.showToast({
        title: errorMesg,
        icon: 'none'
      })
      throw new Error(errorMesg)
    }
    return resp
  },

  fail (resp) {
    this.hideLoading()
    this.showToast({
      title: '网络连接失败',
      icon: 'none'
    })
  }
}
