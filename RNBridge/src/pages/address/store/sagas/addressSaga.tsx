import { takeLatest, delay, put } from 'redux-saga/effects'
import {
  ADDRESS_NORMAL_ACTION,
  ADDRESS_HEADER_ACTION,
  ADDRESS_REQUEST_REDUCER,
  ADDRESS_DELETE_ACTION,
  ADDRESS_REFRESH_STATE_ACTION,
  ADDRESS_HUD_STATE_ACTION
} from '~pages/address/store/types/addressActionTypes';
import { PlaceHolderModes } from '~components/placeholder/placeholder';
import { NativeManager } from '~common/native';
import NetInfo from "@react-native-community/netinfo";


// 首页请求
function* addressNormalRequest(action) {
  yield put({ type: ADDRESS_REFRESH_STATE_ACTION, mode: PlaceHolderModes.Loading });
  const data = yield NativeManager.selectAddress();
  const state = yield NetInfo.fetch()
  // 请求成功
  if (state.isConnected == true) {
    yield delay(Math.random() % 500 + 500)
    yield put({ type: ADDRESS_REQUEST_REDUCER, data: data });
    if (data.length != 0) {
      yield put({ type: ADDRESS_REQUEST_REDUCER, data: data });
      yield put({ type: ADDRESS_REFRESH_STATE_ACTION, mode: PlaceHolderModes.None });
    } else {
      yield put({ type: ADDRESS_REFRESH_STATE_ACTION, mode: PlaceHolderModes.Empty });
    }
  }  
  // 请求失败
  else {
    yield put({ type: ADDRESS_REFRESH_STATE_ACTION, mode: PlaceHolderModes.Network });
  }


  
}

// 首页请求
function* addressHeaderRequest(action) {
  yield put({ type: ADDRESS_HUD_STATE_ACTION, hud: true });
  const state = yield NetInfo.fetch()
  if (state.isConnected == true) {
    yield delay(Math.random() % 500 + 500)
    const data = yield NativeManager.selectAddress();
    if (data.length != 0) {
      yield put({ type: ADDRESS_REQUEST_REDUCER, data: data });
      yield put({ type: ADDRESS_HUD_STATE_ACTION, hud: false });
      yield put({ type: ADDRESS_REFRESH_STATE_ACTION, mode: PlaceHolderModes.None });
    } else {
      yield put({ type: ADDRESS_HUD_STATE_ACTION, hud: false });
      yield put({ type: ADDRESS_REFRESH_STATE_ACTION, mode: PlaceHolderModes.Empty });
    }
  } 
  else {
    yield delay(500)
    yield put({ type: ADDRESS_HUD_STATE_ACTION, hud: false });
    yield put({ type: ADDRESS_REFRESH_STATE_ACTION, mode: PlaceHolderModes.Network });
  }
}

// 删除
function* addressDeleteRequest(action) {
  yield put({ type: ADDRESS_HUD_STATE_ACTION, hud: true });
  const state = yield NetInfo.fetch()
  if (state.isConnected == true) {
    yield delay(Math.random() % 500 + 500)
    yield NativeManager.deleteAddress(action.data);
    const data = yield NativeManager.selectAddress();
    if (data.length != 0) {
      yield put({ type: ADDRESS_REQUEST_REDUCER, data: data });
      yield put({ type: ADDRESS_HUD_STATE_ACTION, hud: false });
      yield put({ type: ADDRESS_REFRESH_STATE_ACTION, mode: PlaceHolderModes.None });
    } else {
      yield put({ type: ADDRESS_HUD_STATE_ACTION, hud: false });
      yield put({ type: ADDRESS_REFRESH_STATE_ACTION, mode: PlaceHolderModes.Empty });
    }
  } 
  else {
    yield delay(500)
    yield put({ type: ADDRESS_HUD_STATE_ACTION, hud: false });
    yield put({ type: ADDRESS_REFRESH_STATE_ACTION, mode: PlaceHolderModes.Network });
  }
}


export function* addressSaga() {
  yield takeLatest(ADDRESS_NORMAL_ACTION, addressNormalRequest);
  yield takeLatest(ADDRESS_HEADER_ACTION, addressHeaderRequest);
  yield takeLatest(ADDRESS_DELETE_ACTION, addressDeleteRequest);
}
