import { takeLatest, delay, put } from 'redux-saga/effects'
import { LOGIN_LOGIN_ACTION, LOGIN_LOGIN_REDUCER, LOGIN_HUD_ACTION, LOGIN_NAME_ACTION } from '~pages/login/store/types/loginActionTypes';
import { PlaceHolderModes } from '~components/placeholder/placeholder';
import NetInfo from "@react-native-community/netinfo";


// 首页请求
function* loginRequestAction(action) {
  console.log("哈哈哈");
  yield put({ type: LOGIN_HUD_ACTION, hud: true });
  const state = yield NetInfo.fetch()
  if (state.isConnected == true) {
    yield delay(Math.random() % 500 + 500)
    if (action.user === "15265296375" && action.pass === "123456") {
      yield put({ type: LOGIN_HUD_ACTION, hud: false });
    }
    else {
      yield put({ type: LOGIN_NAME_ACTION, name: "账号或密码错误" });
      yield delay(1000);
      yield put({ type: LOGIN_HUD_ACTION, hud: false });
      yield delay(100);
      yield put({ type: LOGIN_NAME_ACTION, name: "" });
    }
  } else {
    yield put({ type: LOGIN_NAME_ACTION, name: "网络连接失败" });
    yield delay(1000);
    yield put({ type: LOGIN_HUD_ACTION, hud: false });
    yield delay(100);
    yield put({ type: LOGIN_NAME_ACTION, name: "" });
  }
}


export function* loginSaga() {
  yield takeLatest(LOGIN_LOGIN_ACTION, loginRequestAction);
}
