/**
 * Created by dave on 2018/3/20.
 */

const install = (Vue) => {
  Vue.prototype.locationPermis = () => {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'gcj02',
        success: resolve,
        fail: reject,
      });
    });
  },
    Vue.prototype.tip = (msg, type = 'none', second = 1500) => {
      return new Promise((resolve) => {
        wx.showToast({
          title: msg,
          icon: type,
          duration: second,
          complete: setTimeout(resolve, second),
        });
      });
    };
  Vue.prototype.loading = {
    show: (txt) => {
      wx.showLoading({title: txt});
    },
    hide: () => {
      wx.hideLoading();
    }
  }
};

export default {
  install,
};
