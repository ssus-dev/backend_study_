import Router from "koa-router";
import { register, login, logout, check } from './auth.ctrl.js';

const auth = new Router();

auth.post('/register', register);
auth.post('/login', login);
auth.get('/check', check);
auth.post('/logout', logout);

export default auth;