/**
 * Created by dave on 2018/3/20.
 */
const install = (Vue) => {
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
};

export default {
  install,
};
