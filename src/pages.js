/**
 * Created by dave on 2018/4/2.
 */
// pages.js
module.exports = [
  {
    path: '/pages/map/map', // 页面路径，同时是 vue 文件相对于 src 的路径
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '小宝带你找网咖',
      enablePullDownRefresh: true,
    },
  },
  {
    path: '/pages/permis/index',
    config: {
      navigationBarTitleText: '小宝带你找网咖',
      enablePullDownRefresh: true,
    },
  },
];
