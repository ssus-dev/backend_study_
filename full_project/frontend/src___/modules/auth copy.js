// import { createAction, handleActions } from 'redux-actions';
// import produce from 'immer';
// import { takeLatest } from 'redux-saga/effects';
// import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
// import * as authAPI from '../lib/api/auth';
// import { createSlice } from "@reduxjs/toolkit";


// const CHANGE_FIELD = 'auth/CHANGE_FIELD';
// const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

// const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER')
// const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN')

// // export const changeField = createAction(
// //     CHANGE_FIELD,
// //     ({ form, key, value }) => ({
// //         form, // register , login
// //         key, // username, password, passwordConfirm
// //         value, // 실제 바꾸려는 값
// //     }),
// // );

// // export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register / login

// // export const register = createAction(REGISTER, ({ username, password }) => ({
// //     username,
// //     password
// // }));

// // export const login = createAction(LOGIN, ({ username, password }) => ({
// //     username,
// //     password
// // }));

// const registerSaga = createRequestSaga(REGISTER, authAPI.register);
// const loginSaga = createRequestSaga(LOGIN, authAPI.login);

// export function* authSaga() {
//     // takeLatest : 기존에 진행중이던 작업 취소 후 가장 마지막 실행된 함수 실행
//     // 로그인 회원가입 버튼 실수로 연달아 누를때 서버 요청 여러번 하지 않기위해 사용
//     yield takeLatest(REGISTER, registerSaga);
//     yield takeLatest(LOGIN, loginSaga);
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

// export const authSlice = createSlice({
//     name: 'auth',
//     initialState: initialAuthState,
//     reducers: {
//         initializeForm : (state, action) => {
//             console.log(state);
//             console.log(action.payload);

//             const t = action.payload;
//             state[t] = initialAuthState[t];

//             console.log(state[t])
//             /**
//              * ...state,
//                 [form]: initialAuthState[form],
//                 authError: null,
//              */
//         },
//         // changeField: (state, { payload: { form, key, value } }) =>
//         //     produce(state, draft => {
//         //         draft[form][key] = value;
//         //     }
//         // ),
//         changeField:(state,action) => {
//             const t = action.payload;
//             console.log(t);
//             const produce = (state,draft) => {
//                 console.log(state)
//                 console.log(draft)
//                 // draft['form']['key'] = action.payload.value;
//             }
//             produce();
//         },
//         // login: (state, action) => {
//         //     console.log("login =>");
//         //     // state.push(action.payload);
//         //     // state.authError = null;
//         //     // state.auth = action.payload;
//         //     // state.login = action.payload;
//         // },
//         login: (state, { payload: auth }) => ({
//             ...state,
//             authError: null,
//             auth,
//         }),
//         register : (state, action) => {
//         },
        
//         // changeField : (state, action) => {
//         //     console.log("changeField => ");
//         //     console.log(state , action.payload)
//         //     state.value = action.payload;
//         //     // produce(state, draft => {
//         //     //     draft = action.payload;
//         //     // })
//         //     /**
//         //      * produce function ?
//         //      * 첫번째는 수정하고 싶은 객체/배열,
//         //      * 두번째는 첫번째 파라미터에 할당된 객체/배열을 바꾸는 함수
//         //      * const nextState = produce(baseState, draftState => {
//         //         draftState.push({ todo: "Tweet about it" });
//         //         draftState[1].done = true;
//         //        });
//         //      */

//         //     // produce(state, draft => {
//         //     //     console.log(state);
//         //     //     console.log(draft);
//         //     //     // draft[form][key] = value;
                
//         //     //     // action.payload["form"]
//         //     // })

           
//         // },
       
//     }
// });

// export const { login, register, changeField, initializeForm } = authSlice.actions;
// export default authSlice.reducer;

// // const auth = handleActions(
// //     {
// //         [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
// //             produce(state, draft => {
// //                 draft[form][key] = value;
// //             }),
// //         [INITIALIZE_FORM]: (state, { payload: form }) => ({
// //             ...state,
// //             [form]: initialAuthState[form],
// //             authError: null,
// //         }),

// //         [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
// //             ...state,
// //             authError: null,
// //             auth
// //         }),
// //         [REGISTER_FAILURE]: (state, { payload: error }) => ({
// //             ...state,
// //             authError: error,
// //         }),
// //         // [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
// //         //     ...state,
// //         //     authError: null,
// //         //     auth,
// //         // }),
// //         // [LOGIN_FAILURE]: (state, { payload: error }) => ({
// //         //     ...state,
// //         //     authError: error
// //         // }),
// //     },
// //     initialAuthState,
// // );

// // export default auth;