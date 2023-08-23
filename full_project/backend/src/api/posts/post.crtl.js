import Post from "../../models/post";
import mongoose from "mongoose";
import Joi from 'joi'; //사용자가 입력한 데이터가 유효한지 검사하는 유효성 검사 라이브러리
import sanitizeHtml from "sanitize-html"; //html 필터링 라이브러리

const { ObjectId } = mongoose.Types;

const sanitizeOption = {
    allowedTags: [
        'h1',
        'h2',
        'b',
        'i',
        'u',
        's',
        'p',
        'ul',
        'ol',
        'li',
        'blockquote',
        'a',
        'img',
    ],
    allowedAttributes: {
        a: ['href', 'name', 'target'],
        img: ['src'],
        li: ['class'],
    },
    allowedSchemes: ['data', 'http'],
};

export const getPostById = async (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
        ctx.status = 400;
        return;
    }

    try {
        const post = await Post.findById(id);
        if (!post) {
            ctx.status = 404;
            return;
        }

        ctx.state.post = post;
        return next();
    } catch (e) {
        ctx.throw(500, e);
    }
};

/**
 * POST /api/posts
 */
export const write = async ctx => {
    // 객체가 다음 필드를 가지고 있음을 검증
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
    });

    // 검증 후 검증 실패인 경우 에러처리
    // const result = Joi.validate(ctx.request.body, schema);
    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { title, body, tags } = ctx.request.body;

    const post = new Post({
        title,
        body: sanitizeHtml(body, sanitizeOption),
        tags,
        user: ctx.state.user,
    });
    try {
        await post.save();
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

// html을 제거하고 문자열 길이 200으로 제한
const removeHtmlAndShorten = body => {
    const filtered = sanitizeHtml(body, {
        allowedTags: [],
    });
    return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
}

/**
 * GET /api/posts
 *     /api/posts?psge=2
 */
export const list = async ctx => {
    // 쿼리는 문자열이기에 반드시 숫자로 변환해야하며 값이 없다면 1이 기본값
    const page = parseInt(ctx.query.page || '1', 10);

    if (page < 1) {
        ctx.status = 400;
        return;
    }

    const { tag, username } = ctx.query;
    const query = {
        ...(username ? { 'user.username': username } : {}),
        ...(tag ? { tags: tag } : {}),
    };

    try {
        const posts = await Post.find(query)
            .sort({ _id: -1 }) //역순
            .limit(10) // 개수제한
            .skip((page - 1) * 10) //paging
            .lean() // json형태로
            .exec(); // 조회

        // 마지막 페이지 번호
        const postCount = await Post.countDocuments(query).exec();
        ctx.set('Last-page', Math.ceil(postCount / 10));

        // ctx.body = posts;
        // 내용길이제한 (lean() 없이)
        // ctx.body = posts.map(post => post.toJSON()).map(post => ({
        //     ...post,
        //     body : post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`
        // }));
        // lean() 사용한다면 내용길이제한
        ctx.body = posts.map(post => ({
            ...post,
            // body : post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`,
            body: removeHtmlAndShorten(post.body),
        }));

    } catch (e) {
        return ctx.throw(500, e);
    }
}

/**
 * GET /api/posts/id
 */
export const read = async ctx => {
    // const {id} = ctx.params;
    // try{
    //     const post = await Post.findById(id).exec();
    //     if(!post){
    //         ctx.status = 404;
    //         return;
    //     }
    //     ctx.body = post;
    // }catch(e) {
    //     ctx.throw(500,e);
    // }

    ctx.body = ctx.state.post;
};

/**
 *  DELETE /api/posts/id
 */
export const remove = async ctx => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.stauts = 204;
    } catch (e) {
        ctx.throw(500, e);
    }
}

/**
 * PATCH /api/posts/id
 */
export const update = async ctx => {
    const { id } = ctx.params;

    const nextData = { ...ctx.request.body }; //객체 복사

    if (nextData.body) {
        nextData.body = sanitizeHtml(nextData.body);
    }

    try {
        const post = await Post.findByIdAndUpdate(id, nextData, {
            new: true,
        }).exec();

        if (!post) return ctx.status = 404;

        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
}


// id로 찾는 포스트가 로그인 중인 사용자가 작성했는지 체크
export const checkOwnPost = (ctx, next) => {
    const { user, post } = ctx.state;

    if (post.user._id.toString() !== user._id) {
        ctx.status = 403;
        return;
    }
    return next();
}