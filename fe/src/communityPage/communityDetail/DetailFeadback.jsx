import styled, { css } from 'styled-components'

import CommentWindow from './CommentWindow'

import ProfileTempImg from '/images/default_my_image.png'
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
const DetailFeadback = ({ isDark, detailData, commentDate, setCommentDate, totalCount, currentPage, setCurrentPage, setTotalCount }) => {

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
                kind={{id: 403, name: "feadback"}}
                detailData={detailData}
                isDark={isDark}
            />
            
            <Line/>
            <DetailMiddle
                detailData={detailData}
                pjtData={projectData}
                kind={{id: 403, name: "feadback"}}
                isDark={isDark}
            />
            
            <Line/>

            <CommentWindow
                isDark={isDark}
                commentDate={commentDate}
                setCommentDate={setCommentDate}
                boardId={detailData.id}
                totalCount={totalCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setTotalCount={setTotalCount}
            />
        </Detail>
    )
}

export default DetailFeadback;