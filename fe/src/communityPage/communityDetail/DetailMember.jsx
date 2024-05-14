import styled, { css } from 'styled-components'
import axios from 'axios'
import CommentWindow from './CommentWindow'

import PjtImg from '/image/community/pjtTempImg.png'
import DetailHeader from './DetailHeader'
import DetailMiddle from './DetailMiddleBox'
import { useEffect, useState } from 'react'
import getEnv from '../../utils/getEnv'

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
const DetailMember = ({ isDark, detailData, commentDate, setCommentDate, projectData, totalCount, currentPage, setCurrentPage, setOpenChat, selectedUser, setSelectedUser}) => {

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
                totalCount={totalCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setOpenChat={setOpenChat}
                setSelectedUser={setSelectedUser}
            />
        </Detail>
    )
}

export default DetailMember;