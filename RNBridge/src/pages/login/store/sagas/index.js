import { fork, all } from 'redux-saga/effects'
import { loginSaga } from './loginSaga'

export default function* saga() {
  yield all([
    fork(loginSaga),
  ])
}

