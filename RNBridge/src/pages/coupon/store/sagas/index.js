import { fork, all } from 'redux-saga/effects'
import { couponSaga } from './couponSaga'

export default function* saga() {
  yield all([
    fork(couponSaga),
  ])
}

