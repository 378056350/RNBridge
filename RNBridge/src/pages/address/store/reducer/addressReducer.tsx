import {
  ADDRESS_REQUEST_REDUCER,
  ADDRESS_REFRESH_STATE_ACTION,
  ADDRESS_HUD_STATE_ACTION,
  ADDRESS_DELETE_ACTION
} from '~pages/address/store/types/addressActionTypes';
import { PlaceHolderModes } from '~components/placeholder/placeholder';


interface AddressState {
  
}

const defaultState: AddressState = {
  mode: PlaceHolderModes.Loading,
  data: [],
  hud: false
}

export default (state: AddressState = defaultState, action: any) => {
  const newState: AddressState = JSON.parse(JSON.stringify(state));
  // 刷新结束
  if (action.type === ADDRESS_REQUEST_REDUCER) {
    newState.data = action.data;
    return newState
  }
  // 更改刷新状态
  else if (action.type === ADDRESS_REFRESH_STATE_ACTION) {
    newState.mode = action.mode;
    return newState
  }
  // 更改刷新状态
  else if (action.type === ADDRESS_HUD_STATE_ACTION) {
    newState.hud = action.hud;
    return newState
  }
  return state;
}

