/**
 * 해당 예제
 * https://velog.io/@1000peach/sagatoolkit-redux-saga%EC%99%80-redux-toolkit%EC%9C%BC%EB%A1%9C-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC-%EB%AA%A8%EB%93%88%ED%99%94%ED%95%98%EA%B8%B0-k1w4qdlb
 * - redux-toolkit 사용
 * - redux saga 적용
 * - type과 promise를 반환하는 function을 인자로 받아 한번에 수행하는 saga를 반환하는 함수
 */


/**
 * 참고 추가 예제
 *  https://leejss.github.io/2021-07-20/redux-saga-and-api
    https://dev-jung.tistory.com/entry/Redux-Toolkit-Redux-Saga%EC%97%B0%EB%8F%99
    https://waitwait.tistory.com/17
 */


// 호출방법
// const getPostsSaga = createPromiseSaga('posts/getPosts',PostsAPI.readPosts);

//--------------------------------------------------------------------------------------------
// src/lib/asyncUtils.js
import { call, put } from 'redux-saga/effects';

export const createActionString = type => {
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


//--------------------------------------------------------------------------------------------
// src/utils/asyncUtils.js

export const reducerUtils = {
    init: () => ({ //초기화
        data: null,
        loading: false,
        error: false
    }),
    loading: (prevData = null) => ({//요청 action일때
        data: prevData,
        loading: true,
        error: false,
    }),
    success: (data = null) => ({ //요청 성공 action일때
        data: data,
        loading: false,
        error: false,
    }),
    error: (error) => ({ //요청 실패 action일때
        data: error,
        loading: false,
        error: true,
    })
}

export const handleAsyncAction = ({ type, payload = {} }, prevData = null) => {
    if (type.includes('success'))   return reducerUtils.success(payload);
    if (type.includes('error'))     return reducerUtils.error(payload);

    return reducerUtils.loading(prevData);
}

//--------------------------------------------------------------------------------------------
// src/reducer/post.js

import { createSlice } from "@reduxjs/toolkit";
import { takeEvery } from "redux-saga/effects";

import { createPromiseSaga, reducerUtils, handleAsyncAction } from "../lib/asyncUtils";
import PostsAPI from "../api/posts";

const initState = {
    posts: reducerUtils.init()
}

export const posts = createSlice({
    name: 'posts',
    initialState: initState,
    reducers: {
        getPosts: (state, action) => { }, // 1. saga 실행 action 생성 (api 호출)
    },
    extraReducers: (builder) => {
        builder.addMatcher( // 2. 모든 action을 인자로 받는 callback
            (action) => {
                return action.type.includes(prefix); // 3. posts action일 경우
            },
            (state, action) => {
                state.posts = handleAsyncAction(action); // 4. action type에 따라 맞는 FSA 객체 return
            }
        );
    }
});

export const { getPosts } = posts.actions;

const getPostsSaga = createPromiseSaga(getPosts, PostsAPI.readPosts);

export function* postSaga() {
    yield takeEvery(getPosts, getPostsSaga);
}

export default posts;
