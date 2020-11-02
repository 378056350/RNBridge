import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import saga from '~pages/home/store/sagas/index'
import reducer from '~pages/home/store/reducer/index'


// 中间件: redux-saga
const sagaMiddleware = createSagaMiddleware();
// 初始化: store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// if (module.hot) {
//     module.hot.accept('./reducer', () => {
//         const nextRootReducer = require('./reducer/index');
//         store.replaceReducer(nextRootReducer);
//     });
// }
// 监听saga
sagaMiddleware.run(saga);

export default store;
