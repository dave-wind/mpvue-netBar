/**
 * Created by dave on 2018/4/16.
 */
import * as types from './mutation-types';

export default {
  [types.SET_PERMIT] (state, v) {
    state.permit = v;
  },
  [types.SET_MAP_DATA] (state, v) {
    state.mapData = [...{}, v];
  },
  [types.SET_USER] (state, v) {
    state.userInfo = [...{}, v];
  },
  [types.SET_ADDRESS] (state, v) {
    state.addObj = [...{}, v];
  }
}
