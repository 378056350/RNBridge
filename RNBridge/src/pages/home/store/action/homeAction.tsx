import { HOME_HEADER_ACTION, HOME_FOOTER_ACTION, HOME_REQUEST_ACTION } from '~pages/home/store/types/homeActionTypes';

// 下拉刷新
export const homeHeaderAction = (page: number) => {
  return {
    type: HOME_HEADER_ACTION,
    page: page
  }
}
// 上拉加载
export const homeFooterAction = (page: number) => {
  return {
    type: HOME_FOOTER_ACTION,
    page: page
  }
}
// 首页请求
export const homeRequestAction = (page?: number) => {
  return {
    type: HOME_REQUEST_ACTION,
    page: (page === undefined || page === null) ? 1 : page
  }
}
