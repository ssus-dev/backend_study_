import React from "react";
import { HeaderContainer } from "../containers/common/HeaderContainer";
import { PostListContainer } from "../containers/posts/PostListContainer";
import { PaginationContainer } from "../containers/posts/PaginationContainer";


export const PostListPage = () => {
    return (
        <div>
            <HeaderContainer/>
            <PostListContainer/>
            <PaginationContainer/>
        </div>
    );
}