import {
  ORDER_PLACEHOLDER_ACTION,
  ORDER_HUD_ACTION
} from '~pages/order/store/types/orderActionTypes';
import { PlaceHolderModes } from '~components/placeholder/placeholder';


interface OrderState {
  
}

const defaultState: OrderState = {
  mode: PlaceHolderModes.Loading,
  hud: false
}

export default (state: OrderState = defaultState, action: any) => {
  const newState: OrderState = JSON.parse(JSON.stringify(state));
  // 刷新结束
  if (action.type === ORDER_PLACEHOLDER_ACTION) {
    newState.mode = action.mode;
    return newState
  }
  else if (action.type === ORDER_HUD_ACTION) {
    newState.hud = action.hud;
    return newState
  }
  return state;
}

