import { combineReducers } from '@reduxjs/toolkit';
import { user } from './user';
import { write } from './write';
import { post } from './post';
import { posts } from './posts';
import { auth } from './auth';
import { loading } from './loading';


// 리듀서 저장
export const rootReducer = combineReducers({
    loading,
    auth,
    user,
    write,
    post,
    posts,
});

