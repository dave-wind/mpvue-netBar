/**
 * Created by dave on 2018/4/16.
 */
export default {
  getPermit: state => {
    return state.permit;
  },
  getMapData: state => {
    return state.mapData;
  },
  getUserInfo: state => {
    return state.userInfo;
  },
  getAddress: state => {
    return state.addObj;
  }
}
