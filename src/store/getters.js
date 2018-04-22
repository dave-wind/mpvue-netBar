/**
 * Created by dave on 2018/4/16.
 */
export default {
  getUserInfo: state => {
    return state.userInfo;
  },
  getAddress: state => {
    return state.address;
  },
  getStepList: state => {
    return state.stepList;
  },
  getRouteInfo: state => {
    return state.routeInfo;
  },
};
