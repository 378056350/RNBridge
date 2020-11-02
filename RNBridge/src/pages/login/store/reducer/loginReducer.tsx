import { LOGIN_LOGIN_ACTION, LOGIN_LOGIN_REDUCER, LOGIN_HUD_ACTION, LOGIN_NAME_ACTION } from '~pages/login/store/types/loginActionTypes';
import { Screen, countcoordinatesX } from '~common/screen'
import { PlaceHolderModes } from '~components/placeholder/placeholder';

interface LoginState {
  hud: boolean,
  name: string
}

const defaultState: LoginState = {
  mode: PlaceHolderModes.Loading,
  hud: false,
  name: ""
}

export default (state: LoginState = defaultState, action: any) => {
  const newState: LoginState = JSON.parse(JSON.stringify(state));
  if (action.type === LOGIN_HUD_ACTION) {
    newState.hud = action.hud;
    return newState
  }
  if (action.type === LOGIN_NAME_ACTION) {
    newState.name = action.name;
    return newState
  }
  return state;
}

