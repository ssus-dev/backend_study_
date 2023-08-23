import React from "react";
import styled from "styled-components";
import { Button } from '../common/Button';

const WriteActionBtnBlock = styled.div`
    margin:1rem 0 3rem;
    button + button {
        margin-left:0.5rem;
    }
`;

const StyledBtn = styled(Button)`
    height : 2.125rem;
    &+&{
        margin-left:0.5rem;
    }
`;

export const WriteActionBtn = ({ onCancel, onPublish , isEdit }) => {
    return (
        <WriteActionBtnBlock>
            <StyledBtn cyan onClick={onPublish}>포스트 {isEdit ? '수정' : '등록'}</StyledBtn>
            <StyledBtn onClick={onCancel} >취소</StyledBtn>
        </WriteActionBtnBlock>
    );
}