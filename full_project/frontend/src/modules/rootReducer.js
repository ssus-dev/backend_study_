import { combineReducers } from '@reduxjs/toolkit';
import { auth } from './auth';
import { loading } from './loading';
import { user } from './user';
import { write } from './write';
import { post } from './post';
import { posts } from './posts';

// 리듀서 저장
export const rootReducer = combineReducers({
    auth,
    loading,
    user,
    write,
    post,
    posts,
});

