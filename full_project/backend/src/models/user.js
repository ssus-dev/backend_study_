import mongoose,{ Schema } from "mongoose";
import bcrypt from 'bcrypt'; 
import jwt from "jsonwebtoken";


const UserSchema = new Schema({
    username : String,
    hashedPassword : String,
});

// 인스턴스 메소드 작성 시 fucntion으로 함수구현 : this에 접근하기 위함
UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password,10);
    this.hashedPassword = hash;
}

UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password,this.hashedPassword);
    return result; //boolean
}


// 스태틱 메소드 작성
UserSchema.statics.findByUsername = function(username) {
    return this.findOne({username});
}

// 데이터 삭제 관련 메소드(공통사용)
UserSchema.methods.serialize = function () {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
}


UserSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {
            _id: this.id,
            username: this.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        },
    );
    return token;
}



const User = mongoose.model('User',UserSchema);
export default User;