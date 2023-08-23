import client from './client';

export const writePost = ({ title, body, tags }) => {
    try{
        return client.post('/api/posts', { title, body, tags });
    }catch(e){
        return e;
    }
}

export const readPost = id => {
    try{
        return client.get(`/api/posts/${id}`);
    }catch(e){
        return e;
    }
}

export const listPosts = ({ tag, username, page }) => {
    try {
        return client.get(`/api/posts`, { params: { tag, username, page }, });
    } catch (e) {
        return e;
    }
};

export const updatePost = ({id , title, body, tags}) => {
    try{
        return client.get(`/api/posts/${id}`,{title,body,tags});
    }catch(e){
        return e;
    }
}

// await ApiDelete(`/api_v1/system/register/users?id=${delUser}`, navigate);

export const removePost = async id => {
    try{
        await client.delete(`/api/posts/${id}`);
        // await client.delete(`/api/posts?id`);
    }catch(e){
        return e;
    }
}