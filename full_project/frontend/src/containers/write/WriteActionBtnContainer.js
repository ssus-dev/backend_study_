import { useEffect } from "react";
import { WriteActionBtn } from "../../components/write/WriteActionBtn";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { writePost ,updatePost } from '../../modules/write';

export const WriteActionBtnContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { title, body, tags, post, postError, originalPostId } = useSelector(({ write }) => ({
        title: write.title,
        body: write.body,
        tags: write.tags,
        post: write.post,
        postError: write.postError,
        originalPostId : write.originalPostId
    }));

    const onPublish = () => {
        if(originalPostId){
            dispatch(updatePost({title , body, tags, id:originalPostId}));
            return;
        }
        dispatch(
            writePost({
                title,
                body,
                tags,
            }),
        );
    };

    const onCancel = () => {
        navigate(-1);
    }

    useEffect(() => {
        if (post) {
            const { _id, user } = post;
            navigate(`/@${user.username}/${_id}`);
        }

        if (postError) {
            console.log(postError);
        }


    }, [navigate, post, postError]);

    return <WriteActionBtn onPublish={onPublish} onCancel={onCancel} isEdit={!!originalPostId}/>;

}