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
const DetailMember = ({ isDark, detailData, commentDate, setCommentDate, projectData }) => {


    // const back_url = getEnv('BACK_URL');

    // useEffect(() => {
    //     console.log("in member" , detailData.projectId)
    //     axios.get(`${back_url}/teams?projectId=${detailData.projectId}`)
    //     .then((res) => {
    //         //console.log(res.data.result);
            
    //         const getProject = res.data.result;
    //         setProjectData({
    //             id: detailData.projectId,
    //             title: getProject.projectName,
    //             projectImg: getProject.projectImg
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }, [detailData])

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