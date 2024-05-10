import styled, { css } from 'styled-components'
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';

import Navbar from '../../components/navs/Navbar';
import DetailSideMenu from './DetailSideMenu';
import DetailMember from './DetailMember';
import DetailTeam from './DetailTeam';
import DetailFeadback from './DetailFeadback';
import { GlobalColor } from '../../services/color';
import ProfileTempImg from '/images/default_my_image.png'
import getEnv from '../../utils/getEnv';
import CalTime from '../CalTime';

const Community = styled.div`
    display: flex;
    align-items: start;

    width: 100%;

    margin: 3.5rem 0 0 0;

    ${props => props.isDark && css`
        background: ${ GlobalColor.colors.primary_black};
    `}
    
    transition: 0.3s;
`


const DetailMainPage = () => {
    const location = useLocation();
    const data = location.state;

    const [selected, setSelected] = useState({id: data.kind.id, name: data.kind.name});
    const [ post, setPost ] = useState({});
    const [ commentDate, setCommentDate ] = useState([]);
    const postId = data.postId;
    const isDark = useSelector(state =>state.isDark.isDark);
    
    const back_url = getEnv('BACK_URL')

    useEffect(() => {  

        //게시글 조회
      axios.get(`${back_url}/communities/boards/${postId}`)
      .then(res => {
        const getData = res.data.result;

        const fullDate = new Date(getData.updatedDttm);
        const finalDate = CalTime(fullDate);

        setPost({
            id: postId,
            title:getData.boardTitle,
            content: getData.boardContent,
            hash: getData.tagDtos,
            writername: getData.memberName,
            memberId: getData.memberId,
            writerprofile: ProfileTempImg,
            time: finalDate,
            proceed: getData.communityProgress,
            projectId: 1,
            kind: "member"

        })

      })
      .catch(err => {
        console.log(err);
      })
    }, [])

    useEffect(() => {
        //댓글 조회
        axios.get(`${back_url}/communities/comments/${postId}/0`)
        .then((res) => {
            //console.log(res.data.result.commentResponseDtos);
            setCommentDate(res.data.result.commentResponseDtos);
        })
        .catch((err) => {
        })
    }, [])
    
    return (
        <>
        <Navbar>
        </Navbar>
        <Community
            isDark={isDark}
        >
            <DetailSideMenu
                selected={selected}
                isDark={isDark}
            >
            </DetailSideMenu>
            {selected.name === "member" ? (
                <DetailMember
                    isDark={isDark}
                    detailData={post}
                    commentDate={commentDate}
                    setCommentDate={setCommentDate}
                />
            ) : ("")}

            {selected.name === "team" ? (
                <DetailTeam
                    isDark={isDark}
                    detailData={post}
                    commentDate={commentDate}
                    setCommentDate={setCommentDate}
                />
            ) : ("")}

            {selected.name === "feadback" ? (
                <DetailFeadback
                    isDark={isDark}
                    detailData={post}
                    commentDate={commentDate}
                    setCommentDate={setCommentDate}
                />
            ) : ("")}
        </Community>

        </>
    )
}

export default DetailMainPage;