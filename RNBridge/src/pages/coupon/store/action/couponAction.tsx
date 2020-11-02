import { COUPON_NORMAL_ACTION, COUPON_AGAGIN_ACTION } from '~pages/coupon/store/types/couponActionTypes';

// 下拉刷新
export const couponRequestAction = () => {
  return {
    type: COUPON_NORMAL_ACTION
  }
}

// 下拉刷新
export const couponAgainRequestAction = () => {
  return {
    type: COUPON_AGAGIN_ACTION
  }
}
