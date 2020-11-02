import { COUPON_NORMAL_ACTION, COUPON_HUD_REQUEST_REDUCER, COUPON_PLACE_REQUEST_REDUCER } from '~pages/coupon/store/types/couponActionTypes';
import { Screen, countcoordinatesX } from '~common/screen'
import { PlaceHolderModes } from '~components/placeholder/placeholder';

interface CouponState {
  hud: boolean
}

const defaultState: CouponState = {
  mode: PlaceHolderModes.Loading,
  hud: false
}

export default (state: CouponState = defaultState, action: any) => {
  const newState: CouponState = JSON.parse(JSON.stringify(state));
  if (action.type === COUPON_PLACE_REQUEST_REDUCER) {
    newState.mode = action.mode;
    return newState
  }
  // 更改刷新状态
  if (action.type === COUPON_HUD_REQUEST_REDUCER) {
    newState.hud = action.hud;
    return newState
  }
  return state;
}

