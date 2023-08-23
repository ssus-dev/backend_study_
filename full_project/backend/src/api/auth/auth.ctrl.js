import Joi from "joi"
import User from "../../models/user"

/**
 *  POST  /api/auth/register 
 *  {
 *      "username" : "velopert",
 *      "password" : "mypass123"
 *  }
 */

export const register = async ctx => {
    // request body 검증
    const schema = Joi.object().keys({
        username : Joi.string()
                        .alphanum()
                        .min(3)
                        .max(20)
                        .required(),
        password : Joi.string().required(),
    });

    const result = schema.validate(ctx.request.body);

    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const {username , password} = ctx.request.body;

    try{
        const exists = await User.findByUsername(username);
        if(exists) {
            ctx.status = 409;
            return;
        }
        const user = new User({
            username,
        });

        await user.setPassword(password);
        await user.save();

        // 응답할 데이터에서 hashedPassword 필드제거
        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token',token,{
            maxAge : 1000 * 60 * 60 * 24 * 7, //7days
            httpOnly : true,
        });

    }catch(e){
        ctx.throw(500,e);
    }
}


/**
 *  POST /api/auth/login
 *  {
 *      "username" : "velopert",
 *      "password" : "mypass123"
 *  }
 */
export const login = async ctx => {
    const {username,password} = ctx.request.body;

    if(!username || !password) {
        ctx.status = 401;
        return;
    }

    try{
        const user = await User.findByUsername(username);

        if(!user){
            ctx.status = 401;
            return;
        }

        const valid = await user.checkPassword(password);

        if(!valid){
            ctx.status = 401;
            return;
        }

        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token',token,{
            maxAge : 1000 * 60 * 60 * 24 * 7, //7days
            httpOnly : true,
        });

    }catch(e){
        ctx.throw(500,e);
    }
    
}

/**
 *  GET  /api/auth/check
 */
export const check = async ctx => {
    const {user} = ctx.state;
    if(!user){
        ctx.status = 401;
        return;
    }

    ctx.body = user;
}


/**
 *  POST /api/auth/logout
 */
export const logout = async ctx => {
    ctx.cookies.set('access_token');
    ctx.status = 204;
}