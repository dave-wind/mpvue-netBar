/**
 * Created by dave on 2018/4/16.
 */
import * as types from './mutation-types';

export default {
  [types.SET_USER](state, v) {
    state.userInfo = {...v};
  },
  [types.SET_ADDRESS](state, v) {
    state.address = {...v};
  },
  [types.SET_ROUTEINFO](state, v) {
    state.routeInfo = {...v};
  },
  [types.SET_STEPLIST](state, v) {
    state.stepList = [...v];
  },
};
