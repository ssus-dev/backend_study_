import React, { useRef, useEffect } from 'react';
import Quill from 'quill'; // 글쓰는 에디터 라이브러리 (yarn add quill)
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../../lib/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
    padding: 5rem 0;
`;
const TitleInput = styled.input`
    font-size:3rem;
    outline:none;
    padding-bottom: 0.5rem;
    border:none;
    border-bottom:1px solid ${palette.gray[4]};
    margin-bottom:2rem;
    width:100%;
`;
const QuillWrapper = styled.div`
    .ql-editor{
        padding:0;
        min-height:320px;
        font-size:1.125rem;
        line-height:1.5;
    }
    .ql-editor.ql-blank::before{
        left:0px;
    }
`;

export const Editor = ({ onChangeField, title, body }) => {
    const quillElement = useRef(null); //quill 적용할 div
    const quillInstance = useRef(null); //quill 인스턴스 설정

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: '내용을 작성하세요',
            modules: {
                // 더 많은 옵션
                // https://quilljs.com/docs/modules/toolbar/ 참고
                toolbar: [
                    [{ header: '1' }, { header: '2' }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
            },
        });

        // quill에 text-change 이벤트 핸들러 등록   
        // 참고: https://quilljs.com/docs/api/#events

        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') onChangeField({ key: 'body', value: quill.root.innerHTML });
        });

    }, [onChangeField]);

    // editor컴포넌트에서 받아오는 body값는 quill 에디터 내용을 입력할 때마다 변경
    // body가 변경될때마다 useEffect에 등록한 함수가 호출중 => 적절하지 않음
    // useRef를 통해 마운트 상태에 따라 작업을 처리
    const mounted = useRef(false);
    useEffect(()=>{
        if(mounted.current) return;
        mounted.current = true;
        quillInstance.current.root.innerHTML = body;
    },[]); /* eslint-disable-line */

    const onChangeTitle = e => {
        onChangeField({ key: 'title', value: e.target.value });
    };

    return (
        <EditorBlock>
            <TitleInput placeholder='제목을 입력하세요' onChange={onChangeTitle} value={title} />
            <QuillWrapper>
                <div ref={quillElement} />
            </QuillWrapper>
        </EditorBlock>
    );
}