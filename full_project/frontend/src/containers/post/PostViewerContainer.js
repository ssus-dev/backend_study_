import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { readPost, unloadPost } from "../../modules/post";
import { PostViewer } from "../../components/post/PostViewer";
import { PostActionBtns } from "../../components/post/PostActionButtons";
import { setOriginalPost } from "../../modules/write";
import { removePost } from "../../lib/api/posts";

export const PostViewerContainer = () => {

    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST'],
        user: user.user,
    }));

    useEffect(() => {
        dispatch(readPost(postId));
        return () => {
            dispatch(unloadPost());

        };
    }, [dispatch, postId]);

    const onEdit = () => {
        dispatch(setOriginalPost(post));
        navigate('/write');
    }

    const onRemove = async () => {
        try {
            await removePost(postId);
            navigate('/');

            // const res = await removePost(postId);
            // console.log(res);
            // if(res.code === 200) 
        } catch (e) {
            console.log(e);
        }
    }

    return <PostViewer
        post={post}
        loading={loading}
        error={error}
        actionBtns={<PostActionBtns onEdit={onEdit} onRemove={onRemove} />}
        ownPost={user && user.id === post && post.id}
    />
}