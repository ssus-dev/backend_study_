// import { createSlice } from '@reduxjs/toolkit';
// import { PURGE } from 'redux-persist';

// const initialState = {
//   user: "",
//   usefavorite: false,
//   useactive: "",
//   logintime: "",
//   alarmdata: [],
//   lastalarm : [],
// };

// export const UserSlice = createSlice({
//     name: "user",
//     initialState,
//     reducers: {
//       setUser: (state, action) => {
//         state.user = action.payload;
//       },
//       setUseFavorite: (state, action) => {
//         state.useactive = action.payload
//       },
//       togleUseFavorite: (state, action) => {
//         state.usefavorite = !state.usefavorite
//       },
//       setLoginTime: (state, action) => {
//         state.logintime = action.payload
//       },
//       setAlarmDatas: (state, action) => {
//         state.alarmdata = action.payload
//       },
//       spliceAlarmData: (state, action) => {
//         if (typeof action.payload !== "undefined") {
//           state.alarmdata.splice(action.payload, 1);
//         } else {
//           state.alarmdata.splice(10);
//         }
//       },
//       setLastAlarm: (state, action) => {
//         state.lastalarm = action.payload
//       },
//     },
//     extraReducers: (builder) => {
//       builder.addCase(PURGE, () => initialState);
//     }
// });

// export const { setUser, setUseFavorite, togleUseFavorite, setLoginTime, setAlarmDatas, spliceAlarmData, setLastAlarm } = UserSlice.actions;
