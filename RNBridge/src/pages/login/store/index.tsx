import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import saga from '~pages/login/store/sagas/index'
import reducer from '~pages/login/store/reducer/index'


// 中间件: redux-saga
const sagaMiddleware = createSagaMiddleware();
// 初始化: store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// 监听saga
sagaMiddleware.run(saga);

export default store;
