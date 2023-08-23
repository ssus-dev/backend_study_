// // import { createAction, handleActions } from 'redux-actions';
// import produce from 'immer';
// import { takeLatest } from 'redux-saga/effects';
// import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
// import * as authAPI from '../lib/api/auth';
// import { createSlice, current } from "@reduxjs/toolkit";


// const CHANGE_FIELD = 'auth/CHANGE_FIELD';
// const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

// const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER')
// const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN')


// // const REGISTER = createRequestActionTypes('auth/REGISTER');
// // const LOGIN = createRequestActionTypes('auth/LOGIN');

// const registerSaga = createRequestSaga(REGISTER, authAPI.register);
// const loginSaga = createRequestSaga(LOGIN, authAPI.login);

// export function* authSaga() {
//     // takeLatest : 기존에 진행중이던 작업 취소 후 가장 마지막 실행된 함수 실행
//     // 로그인 회원가입 버튼 실수로 연달아 누를때 서버 요청 여러번 하지 않기위해 사용
//     yield takeLatest(REGISTER, registerSaga);
//     yield takeLatest(login, loginSaga);
// }

// const initialAuthState = {
//     register: {
//         username: "",
//         password: "",
//         passwordConfirm: "",
//     },
//     login: {
//         username: '',
//         password: '',
//     },
//     auth: null,
//     authError: null,
// };


// /**
//  * 
//  * https://velog.io/@1000peach/sagatoolkit-redux-saga%EC%99%80-redux-toolkit%EC%9C%BC%EB%A1%9C-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC-%EB%AA%A8%EB%93%88%ED%99%94%ED%95%98%EA%B8%B0-k1w4qdlb
//  * 
//  * saga 사용예제
//  */
// export const authSlice = createSlice({
//     name: 'auth',
//     initialState: initialAuthState,
//     reducers: {
//         initializeForm: (state, { payload: form }) => ({
//             ...state,
//             [form]: initialAuthState[form],
//             authError: null,
//         }),
//         changeField: (state, { payload: { form, key, value } }) =>
//             produce(state, draft => {
//                 draft[form][key] = value;
//             }
//             ),

//         login: (state, action) => {
//             console.log(action.payload);

//             /**
//              * saga 사용하지 않아야함 ===> action.payload에 성공-실패여부 받아서 여기서 처리
//              * https://codesandbox.io/s/github/reduxjs/redux-essentials-counter-example/tree/master/?from-embed=&file=/src/features/counter/counterSlice.js:1426-1437
//              * 
//              * https://velog.io/@mael1657/Redux-toolkit%EC%9C%BC%EB%A1%9C-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0
//              * 
//              * success -> aurhError : null
//              * failure -> authError : error
//              */

//         },
//         // login_SUCCESS: (state, action) => {

//         // },
//         // login_FAILURE: (state, action) => {

//         // },
//         register: (state, action) => {
//             /**
//              * saga 사용하지 않아야함
//              * success -> authError : null
//              * failure -> authError : error 
//              */
//         },
//         // register_FAILURE:(state,action) => {

//         // }
//     }
// });

// export const { login, register, changeField, initializeForm } = authSlice.actions;
// export default authSlice.reducer;