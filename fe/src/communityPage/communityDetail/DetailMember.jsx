import styled, { css } from 'styled-components'

import CommentWindow from './CommentWindow'

import PjtImg from '/image/community/pjtTempImg.png'
import DetailHeader from './DetailHeader'
import DetailMiddle from './DetailMiddleBox'

const Detail = styled.div`
    display: flex;        
    flex-direction: column;
    width: 50%;
    margin: 4rem 20rem 0 5rem;

    ${props => props.isDark && css`
        color: white;
    `}

    transition: 0.3s;

`
const Line = styled.hr`
`
const DetailMember = ({ isDark, detailData, commentDate, setCommentDate }) => {

    const projectData = {
        id: 1,
        title: "BUNG",
        projectImg: PjtImg,

    }

    return(
        <Detail
            isDark={isDark}
        >
            <DetailHeader
                kind={{id: 401, name: "member"}}
                detailData={detailData}
                isDark={isDark}
            />

            <Line/>
            <DetailMiddle
                detailData={detailData}
                pjtData={projectData}
                kind={{id: 401, name: "member"}}
                isDark={isDark}
            />
            
            <Line/>

            <CommentWindow
                isDark={isDark}
                commentDate={commentDate}
                setCommentDate={setCommentDate}
                boardId={detailData.id}
            />
        </Detail>
    )
}

export default DetailMember;