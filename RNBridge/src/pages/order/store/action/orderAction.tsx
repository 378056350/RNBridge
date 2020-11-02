import {
  ORDER_NORMAL_ACTION,
  ORDER_HEADER_ACTION,
} from '~pages/order/store/types/orderActionTypes';

// 普通请求
export const orderNormalAction = () => {
  return {
    type: ORDER_NORMAL_ACTION,
  };
};

// 下拉刷新
export const orderHeaderAction = () => {
  return {
    type: ORDER_HEADER_ACTION,
  };
};

