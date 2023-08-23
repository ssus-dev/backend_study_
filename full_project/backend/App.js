/**
 * 모델메소드 생성
 * 모델에서 사용가능한 함수
 */

import User from "./src/models/user";

const user = new User({username:'velopert'});
user.setPassword('mypass123');