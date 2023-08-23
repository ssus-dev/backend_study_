import client from "./client";

export const login = ({ username, password }) => {
    try {
        return client.post('/api/auth/login', { username, password });
    } catch (e) {
        return e;
    }
}

export const register = ({ username, password }) => {
    try {
        return client.post('/api/auth/register', { username, password });
    } catch (e) {
        return e;
    }
}

export const check= () => {
    try {
        return client.get('/api/auth/check');
    } catch (e) {
        return e;
    }
}

export const logout = () => {
    try{
        return client.post('api/auth/logout');
    }catch(e){
        return e;
    }
}