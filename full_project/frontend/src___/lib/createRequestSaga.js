import { call, put } from 'redux-saga/effects';
// import { startLoading, finishLoading } from '../modules/loading';
import { startLoading , finishLoading } from '../modules/loading';

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