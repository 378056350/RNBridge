import {fork, all} from 'redux-saga/effects';
import {addressSaga} from './addressSaga';

export default function* saga() {
  yield all([
    fork(addressSaga)
  ]);
}
