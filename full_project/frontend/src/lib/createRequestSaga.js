import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga (type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) {
        yield put(startLoading(type));

        try {
            const response = yield call(request, action.payload);

            yield put({
                type: SUCCESS,
                payload: response.data,
                meta : response, // HTTP 헤더 및 상태 코드를 쉽게 조회할 수 있게된다
            });
            
        } catch (e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        yield put(finishLoading(type));

    };
}



/***
 * 동일한 코드
 * 
 *  export const createActionString = type => {
        return { success: `${type}Success`, error: `${type}Error` };
    }

    export const createPromiseSaga = (type, promiseCreator) => {
        const { success, error } = createActionString(type);

        return function* (action) {
            try {
                const res = yield call(promiseCreator, action.payload);
                yield put({
                    type: success,
                    payload: res
                });
            } catch (e) {
                yield put({
                    type: e,
                    payload: e.message,
                    error: true,
                });
            }
        }
    }
 * 
 * 
 * 
 */