import {
  ADDRESS_NORMAL_ACTION,
  ADDRESS_HEADER_ACTION,
  ADDRESS_DELETE_ACTION
} from '~pages/address/store/types/addressActionTypes';


// 下拉刷新
export const addressNormalAction = () => {
  return {
    type: ADDRESS_NORMAL_ACTION,
  };
};

// 下拉刷新
export const addressHeaderAction = () => {
  return {
    type: ADDRESS_HEADER_ACTION,
  };
};

// 删除
export const addressDeleteAction = (data) => {
  return {
    type: ADDRESS_DELETE_ACTION,
    data: data
  };
};
