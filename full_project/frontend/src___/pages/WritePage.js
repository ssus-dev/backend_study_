import React from "react";
import Responsive from "../components/common/Responsive";
import { EditorContainer } from "../containers/write/EditorContainer";
import { TagBoxContainer } from "../containers/write/TagBoxContainer";
import { WriteActionBtnContainer } from "../containers/write/WriteActionBtnContainer";
import { Helmet } from "react-helmet-async";

export const WritePage = () => {
    return (
        <Responsive>
            <Helmet><title>글 작성하기 - REACT</title></Helmet>
            <EditorContainer/>
            <TagBoxContainer/>
            <WriteActionBtnContainer/>
        </Responsive>
    );
}