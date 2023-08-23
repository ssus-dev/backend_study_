// import { createSlice, current } from "@reduxjs/toolkit";

// // const START_LOADING = 'loading/START_LOADING';
// // const FINISH_LOADING = 'loading/FINISH_LOADING';

// // export const startLoading = createAction(
// //     START_LOADING,
// //     requestType => requestType
// // );

// // export const finishLoading = createAction(
// //     FINISH_LOADING,
// //     requestType => requestType
// // );

// const initialState = {};

// export const loadingSlice = createSlice({
//     name: 'loading',
//     initialState: initialState,
//     reducers: {
//         startLoading: (state, action) => ({
//             ...state,
//             [action.payload]: true,
//         }),
//         finishLoading: (state, action) => ({
//             ...state,
//             [action.payload]: false,
//         }),
//     }
// });

// export const {startLoading , finishLoading} = loadingSlice.actions;
// export default loadingSlice.reducer;