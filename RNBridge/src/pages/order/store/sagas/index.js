import {fork, all} from 'redux-saga/effects';
import {orderSaga} from './orderSaga';

export default function* saga() {
  yield all([
    fork(orderSaga)
  ]);
}
