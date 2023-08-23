import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects'
import { authSaga } from './auth';
import { userSaga } from './user';
import { writeSaga } from './write';
import { postSaga } from './post';
import { postsSaga } from './posts';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga()]);
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware,logger],
    devTools: true,

});

sagaMiddleware.run(rootSaga);
