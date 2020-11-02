import { takeLatest, delay, put } from 'redux-saga/effects'
import {
  ORDER_NORMAL_ACTION,
  ORDER_HEADER_ACTION,
  ORDER_PLACEHOLDER_ACTION,
  ORDER_HUD_ACTION,
} from '~pages/order/store/types/orderActionTypes';
import { PlaceHolderModes } from '~components/placeholder/placeholder';
import { NativeManager } from '~common/native';
import NetInfo from "@react-native-community/netinfo";


// 普通请求
function* orderNormalRequest(action) {
  yield put({ type: ORDER_PLACEHOLDER_ACTION, mode: PlaceHolderModes.Loading });
  const state = yield NetInfo.fetch()
  // 成功
  if (state.isConnected == true) {
    yield delay(Math.random() % 500 + 500)
    yield put({ type: ORDER_PLACEHOLDER_ACTION, mode: PlaceHolderModes.Empty });
  }
  // 失败
  else {
    yield put({ type: ORDER_PLACEHOLDER_ACTION, mode: PlaceHolderModes.Network });
  }
}

// 下拉请求
function* orderHeaderRequest(action) {
  yield put({ type: ORDER_HUD_ACTION, hud: true });
  const state = yield NetInfo.fetch()
  // 成功
  if (state.isConnected == true) {
    yield delay(Math.random() % 500 + 500)
    yield put({ type: ORDER_HUD_ACTION, hud: false });
    yield put({ type: ORDER_PLACEHOLDER_ACTION, mode: PlaceHolderModes.Empty });
  }
  // 失败
  else {
    yield put({ type: ORDER_HUD_ACTION, hud: false });
    yield put({ type: ORDER_PLACEHOLDER_ACTION, mode: PlaceHolderModes.Network });
  }
}


export function* orderSaga() {
  yield takeLatest(ORDER_NORMAL_ACTION, orderNormalRequest);
  yield takeLatest(ORDER_HEADER_ACTION, orderHeaderRequest);
}
