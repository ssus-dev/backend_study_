import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
require('dotenv').config();
import mongoose from 'mongoose';
// import { createFakeData } from './createFakeData';

import serve from 'koa-static';
import path from 'path';
import send from 'koa-send'; // 클라이언트 기반 라우팅이 제대로 작동하게하는 미들웨어함수(해당 미들웨어 미사용 시 http://localhost:4000/write를 직접 입력하여 들어갈 경우 not found가 뜬다)

import { jwtMiddleware } from './lib/jwtMiddleware';
import api from './api';

mongoose.set("strictQuery", false);
const {PORT , MONGO_URI} = process.env;

mongoose
.connect(MONGO_URI,)
.then(()=>{
    console.log('connected to MongoDB');
    // createFakeData();
})
.catch(e => {
    console.log(e);
})


const app = new Koa();
const router = new Router();


// router.get('/', ctx => {
//     ctx.body = '홈';
// });
// router.get('/about', ctx => {
//     ctx.body = '소개';
// });

router.use('/api',api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

// build 사용 (koa-static 정적 파일 제공)
const buildDirectory = path.resolve(__dirname, '../../frontend/build');
app.use(serve(buildDirectory));
app.use(async ctx => {
    // not found이고 주소가 /api로 시작하지 않는 경우
    if(ctx.status == 404 && ctx.path.indexOf('/api') !== 0){
        await send(ctx, 'index.html', {root:buildDirectory});
    }
});
/////////////////////

const port = PORT || 4000;

app.listen(port, () => {
    console.log('listening to port %d',port);
});