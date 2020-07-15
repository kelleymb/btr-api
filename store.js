const { applyMiddleware, createStore } = require('redux')
const createSagaMiddleware = require('redux-saga')
const rootReducer = require('./reducers/index')
const rootSaga = require('./sagas/index')
const { composeWithDevTools } = require('redux-devtools-extension')


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
rootReducer,
composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;