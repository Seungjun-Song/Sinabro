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
    const postId = data.postId;
    const isDark = useSelector(state =>state.isDark.isDark);
    
    const back_url = getEnv('BACK_URL')

    useEffect(() => {
    //   setPost({
    //     id: 1,
    //     title: "f변경되나?",
    //     content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
    //     hash: ["spring boot", "커피", "백엔드"],
    //     writername: "sil", 
    //     memberId: 64572911, 
    //     writerprofile: ProfileTempImg,
    //     time: "2024-01-03",
    //     proceed: true,
    //     projectId: 1,
    //     kind: "team"
    //   })  

      axios.get(`${back_url}/communities/${postId}`)
      .then(res => {
        const getData = res.data.result;
        setPost({
            id: getData.boardId,
            title:getData.boardTitle,
            content: getData.boardContent,
            hash: [ "temp", "temp"],
            writername: getData.memberName,
            memberId: getData.memberId,
            writerprofile: ProfileTempImg,
            time: getData.updatedDttm,
            proceed: getData.communityProgress,
            projectId: 1,
            kind: "member"

        })
        console.log(getData.boardId)
      })
      .catch(err => {
        console.log(err);
      })
    })

    return (
        <>
        {console.log(postId)}
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
                />
            ) : ("")}

            {selected.name === "team" ? (
                <DetailTeam
                    isDark={isDark}
                />
            ) : ("")}

            {selected.name === "feadback" ? (
                <DetailFeadback
                    isDark={isDark}
                />
            ) : ("")}
        </Community>

        </>
    )
}

export default DetailMainPage;