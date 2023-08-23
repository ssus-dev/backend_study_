import styled from 'styled-components';
import palette from '../../lib/palette';
import { useState } from 'react';
import { AskRemoveModal } from './AskRemoveModal';
import { useSelector } from 'react-redux';

const PostActionBtnsBlock = styled.div`
    display:flex;
    justify-content:flex-end;
    margin:2rem auto -1.5rem;
`;

const ActionBtn = styled.button`
    padding:0.25rem;
    border-radius:4px;
    color:${palette.gray[6]};
    font-weight:bold;
    border:none;
    outline:none;
    font-size:0.875rem;
    cursor:pointer;
    &:hover{
        background:${palette.gray[1]};
        color:${palette.cyan[7]};
    }
    &+&{
        margin-left:0.25rem;
    }
`;

export const PostActionBtns = ({ onEdit, onRemove }) => {
    const [modal, setModal] = useState(false);

    const onRemoveClick = () => {
        setModal(true);
    }

    const onCancel = () => {
        setModal(false);
    }

    const onConfirm = () => {
        setModal(false);
        onRemove();
    }

    // 로그인했을 경우에만 버튼 노출
    const { user, post } = useSelector(({ user, post }) => (
        {
            user: user.user,
            post: post.post,
        })
    );

    if(user === null) return;

    return (
        <>
            {user.username === post.user['username'] && <PostActionBtnsBlock>
                <ActionBtn onClick={onEdit}>수정</ActionBtn>
                <ActionBtn onClick={onRemoveClick}>삭제</ActionBtn>
            </PostActionBtnsBlock>}
            <AskRemoveModal
                visible={modal}
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </>
    );
}