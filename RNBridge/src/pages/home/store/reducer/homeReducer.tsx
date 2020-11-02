import { HOME_HEADER_ACTION, HOME_FOOTER_ACTION, HOME_REQUEST_ACTION, HOME_REFRESH_REDUCER } from '~pages/home/store/types/homeActionTypes';
import { Screen, countcoordinatesX } from '~common/screen'

interface HomeState {
  page: number
}

const defaultState: HomeState = {
  page: 2,
}

export default (state: HomeState = defaultState, action: any) => {
  const newState: HomeState = JSON.parse(JSON.stringify(state));
  // 更改刷新状态
  if (action.type === HOME_REFRESH_REDUCER) {
    // newState.refreshState = action.refreshState;
    return newState
  }
  return state;
}

