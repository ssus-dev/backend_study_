import React from "react";
import { HeaderContainer } from '../containers/common/HeaderContainer';
import { PostViewerContainer } from "../containers/post/PostViewerContainer";

export const PostPage = () => {
    return (
        <>
            <HeaderContainer />
            <PostViewerContainer />
        </>
    );
}