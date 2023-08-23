import { useDispatch, useSelector } from 'react-redux';
import { PostList } from '../../components/post/PostList';
import { listPosts } from '../../modules/posts';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

export const PostListContainer = () => {
    const {username} = useParams();
    const [searchParams] = useSearchParams();

    /**
     * 책(qs) -> useSearchPararms() 
     * useSearchParams (query string)
     * 웹에서 데이터를 전달하는 가장 간단한 방법 , 가장 많이 사용
     * ***** state처럼 비구조화할당으로 값을 받음(배열로 선언)
     * 
     * ex-code
     * const [searchParams , setSearchParams] = useSearchParams();
     * const id = searchParmas.get('id');
     */

    const dispatch = useDispatch();

    const { posts, error, loading, user } = useSelector(
        ({ posts, loading, user }) => ({
            posts: posts.posts,
            error: posts.error,
            loading: loading['posts/LIST_POSTS'],
            user: user.user,
        }),
    );

    useEffect(() => {
        const tag = searchParams.get('tag');
        const page = parseInt(searchParams.get('page'), 10) || 1;

        dispatch(listPosts({ tag, username, page }));
    }, [dispatch, searchParams, username]);

    return (
        <PostList
            loading={loading}
            error={error}
            posts={posts}
            showWriteBtn={user}
        />
    );
}