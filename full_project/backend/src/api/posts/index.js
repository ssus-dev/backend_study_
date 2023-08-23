import Router from "koa-router";
import { write, list, read, remove, update, getPostById, checkOwnPost } from './post.crtl.js';
import { checkLoggendIn } from "../../lib/checkLoggedIn.js";


const posts = new Router();

posts.get('/', list);
posts.post('/', checkLoggendIn, write);

posts.get('/:id', getPostById, read);
posts.delete('/:id', checkLoggendIn, getPostById, checkOwnPost, remove);
// posts.delete('/:id', getPostById, remove);
posts.patch('/:id', checkLoggendIn, getPostById, checkOwnPost, update);
// posts.patch('/:id', getPostById, update);

export default posts;