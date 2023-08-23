import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Button } from "../common/Button";
import qs from 'qs';

const PaginationBlock = styled.div`
    width:320px;
    margin:0 auto 3rem;
    display:flex;
    justify-content: space-between;
`;

const PageNumber = styled.div``;

const buildLink = ({ username, tag, page }) => {
    const query = qs.stringify({ tag, page });
    return username ? `/@${username}?${query}` : `/?${query}`;
}

export const Pagination = ({ page, lastPage, username, tag }) => {
    return (
        <PaginationBlock>
            <Button
                disabled={page === 1}
                to={page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })}>
                이전</Button>
            <PageNumber>{page}</PageNumber>
            <Button
                disabled={page === lastPage}
                to={page === lastPage ? undefined : buildLink({ username, tag, page: page + 1 })}
            >다음</Button>
        </PaginationBlock>
    );
}