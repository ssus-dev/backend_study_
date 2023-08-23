import styled from "styled-components";
import { Link } from "react-router-dom";
import Responsive from "../common/Responsive";
import { Button } from "../common/Button";
import palette from "../../lib/palette";
import { SubInfo } from "../common/SubInfo";
import { Tags } from "../common/Tags";

const PostListBlock = styled(Responsive)`
    margin-top:3rem;
`;

const WritePostBtnWrapper = styled.div`
    display:flex;
    justify-content:flex-end;
    margin-bottom:3rem;
`;

const PostItemBlock = styled.div`
    padding:3rem 0;
    &:first-child{
        padding-top:0;
    }
    &+&{
        border-top:1px solid ${palette.gray[2]};
    }

    h2{
        font-size:2rem;
        margin:0;
        &:hover{
            color:${palette.gray[6]};
        }
    }

    p{
        margin-top:2rem;
    }
`;

// const SubInfo = styled.div`
//     color:${palette.gray[6]};
//     span+span:before{
//         color : ${palette.gray[4]};
//         padding:0 0.25rem;
//         content:'\B7'; 
//     }
// `;

// const Tags = styled.div`
//     margin-top:0.5rem;
//     .tag{
//         display:inline-block;
//         color:${palette.cyan[7]};
//         text-decoration:none;
//         margin-right:0.5rem;
//         &:hover{
//             color:${palette.cyan[6]}
//         }
//     }
// `;

const PostItem = ({ post }) => {
    const { publishedDate, user, tags, title, body, _id } = post;

    return (
        <PostItemBlock>
            <h2><Link to={`/@${user.username}/${_id}`}>{title}</Link></h2>
            <SubInfo username={user.username} publishedData={new Date(publishedDate)} />
            <Tags tags={tags} />
            <p>{body}</p>
        </PostItemBlock>
    );
};

export const PostList = ({ posts, loading, error, showWriteBtn }) => {
    if (error) return <PostListBlock>에러가 발생했습니다.</PostListBlock>;

    return (
        <PostListBlock>
            <WritePostBtnWrapper>
                {showWriteBtn && <Button to="/write">새 글 작성하기</Button>}
            </WritePostBtnWrapper>
            {!loading && posts && (
                <div>
                    {posts.map(post => (
                        <PostItem post={post} key={post._id} />
                    ))}
                </div>
            )}
        </PostListBlock>
    );
}