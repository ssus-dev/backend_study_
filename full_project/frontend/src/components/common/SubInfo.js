import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../lib/palette";

const SubInfoBlock = styled.div`
    ${props => 
        props.hasMarginTop && css`
            margin-top: 1rem
    `}
    color : ${palette.gray[6]};

    span + span:before{
        color : ${palette.gray[4]};
        padding:0 0.25rem;
        content : '\B7';
    }
`;

export const SubInfo = ({username, publishedData , hasMarginTop}) => {
    return(
        <SubInfoBlock hasMarginTop={hasMarginTop}>
            <span><b><Link to={`/@${username}`}>{username}</Link></b></span>
            <span>{new Date(publishedData).toLocaleDateString()}</span>
        </SubInfoBlock>
    );
}