import { takeLatest, delay, put } from 'redux-saga/effects'
import {
  HOME_HEADER_ACTION,
  HOME_FOOTER_ACTION,
  HOME_REQUEST_ACTION,
  HOME_REFRESH_REDUCER,
  HOME_REQUEST_REDUCER
} from '~pages/home/store/types/homeActionTypes';



// 首页请求
function* homeRequest(page?: number) {
  // // 请求
  // const data = yield fetchData(API.home.data, { page: page === undefined ? 1 : page })
  
  // 返回结果
  yield put({ type: HOME_REQUEST_REDUCER, page: page });
}


// 首页请求
function* homeRequestAction(action) {
  yield homeRequest(action.page)
}

// 下拉刷新
function* homeHeaderAction(action) {
  // 请求数据
  yield homeRequest(action.page)
}

// 上拉加载
function* homeFooterAction(action) {
  // 请求数据
  yield homeRequest(action.page)
}




export function* homeSaga() {
  yield takeLatest(HOME_REQUEST_ACTION, homeRequestAction);
  yield takeLatest(HOME_HEADER_ACTION, homeHeaderAction);
  yield takeLatest(HOME_FOOTER_ACTION, homeFooterAction);
}
