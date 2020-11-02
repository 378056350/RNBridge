import { fork, all } from 'redux-saga/effects'
import { homeSaga } from './homeSaga'

export default function* saga() {
  yield all([
    fork(homeSaga),
  ])
}

