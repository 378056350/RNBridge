import { takeLatest, delay, put } from 'redux-saga/effects'
import { COUPON_NORMAL_ACTION, COUPON_AGAGIN_ACTION, COUPON_HUD_REQUEST_REDUCER, COUPON_PLACE_REQUEST_REDUCER } from '~pages/coupon/store/types/couponActionTypes';
import { PlaceHolderModes } from '~components/placeholder/placeholder';
import NetInfo from "@react-native-community/netinfo";


// 首页请求
function* couponRequestAction(action) {
  const state = yield NetInfo.fetch()
  if (state.isConnected == true) {
    yield delay(Math.random() % 500 + 500)
    yield put({ type: COUPON_PLACE_REQUEST_REDUCER, mode: PlaceHolderModes.CouponEmpty });
  } else {
    yield put({ type: COUPON_PLACE_REQUEST_REDUCER, mode: PlaceHolderModes.Network });
  }
}

function* couponAgainRequestAction(action) {
  yield put({ type: COUPON_HUD_REQUEST_REDUCER, hud: true });
  const state = yield NetInfo.fetch()
  if (state.isConnected == true) {
    yield delay(Math.random() % 500 + 500)
    yield put({ type: COUPON_HUD_REQUEST_REDUCER, hud: false });
    yield put({ type: COUPON_PLACE_REQUEST_REDUCER, mode: PlaceHolderModes.CouponEmpty });
  } else {
    yield put({ type: COUPON_HUD_REQUEST_REDUCER, hud: false });
    yield put({ type: COUPON_PLACE_REQUEST_REDUCER, mode: PlaceHolderModes.Network });
  }
}


export function* couponSaga() {
  yield takeLatest(COUPON_NORMAL_ACTION, couponRequestAction);
  yield takeLatest(COUPON_AGAGIN_ACTION, couponAgainRequestAction);
}
