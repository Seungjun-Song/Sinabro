import styled, { css } from 'styled-components'
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import Navbar from "../../components/navs/Navbar";
import SideMenu from '../SideMenu';
import CommunityMemberPage from './CommunityMemberPage';
import CommunityTeamPage from './CommunityTeamPage';
import CommunityFeadBackPage from './CommunityFeadbackPage';
import Pagination from './Pagination';
import { GlobalColor } from '../../services/color';

const Community = styled.div`
display: flex;
align-items: start;
justify-content: space-between;
width: 100%;

${props => props.isDark && css`
    background: ${ GlobalColor.colors.primary_black };
`}
margin: 3.5rem 0 0 0;
transition: 0.3s;
`


const CommunityMainPage = () => {
    const location = useLocation();
    const data = location.state;

    const isDark = useSelector(state =>state.isDark.isDark);

    const [selected, setSelected] = useState(data.kind);
    const [currentPage, setCurrentPage] = useState(data.page);

    const didMountSelected = useRef(false);
    const didMountPage = useRef(false);

    const [postList, setPostList] = useState([
        {
            id: 1,
            title: "웹 프로젝트 팀원 구합니다!",
            content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
            hash: ["spring boot", "커피", "백엔드"],
            writer: "sil",
            time: "2024-01-03",
            proceed: true,
        },
        {
            id: 2,
            title: "웹 프로젝트 팀원 구합니다!",
            content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
            hash: ["spring boot", "커피", "백엔드"],
            writer: "sil",
            time: "2024-01-03",
            proceed: false,
        },
        {
            id: 3,
            title: "웹 프로젝트 팀원 구합니다!",
            content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
            hash: ["spring boot", "커피", "백엔드"],
            writer: "sil",
            time: "2024-01-03",
            proceed: false,
        },
        {
            id: 4,
            title: "웹 프로젝트 팀원 구합니다!",
            content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
            hash: ["spring boot", "커피", "백엔드"],
            writer: "sil",
            time: "2024-01-03",
            proceed: true,
        },

    ])

    useEffect(() =>{
        if(didMountSelected.current) {
        setPostList([
            {
                id: 1,
                title: "사이드 메뉴 눌렀을 때 변환 테스트",
                content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
                hash: ["spring boot", "커피", "백엔드"],
                writer: "sil",
                time: "2024-01-03",
                proceed: true,
            },
            {
                id: 2,
                title: "웹 프로젝트 팀원 구합니다!",
                content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
                hash: ["spring boot", "커피", "백엔드"],
                writer: "sil",
                time: "2024-01-03",
                proceed: false,
            },
            {
                id: 3,
                title: "웹 프로젝트 팀원 구합니다!",
                content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
                hash: ["spring boot", "커피", "백엔드"],
                writer: "sil",
                time: "2024-01-03",
                proceed: false,
            },
            {
                id: 4,
                title: "웹 프로젝트 팀원 구합니다!",
                content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
                hash: ["spring boot", "커피", "백엔드"],
                writer: "sil",
                time: "2024-01-03",
                proceed: true,
            },
    
        ])}
        else didMountSelected.current = true;
    }, [selected])

    useEffect(() =>{
        if(didMountPage.current) {
        setPostList([
            {
                id: 1,
                title: "페이지 바꼈을 때 변환 테스트",
                content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
                hash: ["spring boot", "커피", "백엔드"],
                writer: "sil",
                time: "2024-01-03",
                proceed: true,
            },
            {
                id: 2,
                title: "웹 프로젝트 팀원 구합니다!",
                content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
                hash: ["spring boot", "커피", "백엔드"],
                writer: "sil",
                time: "2024-01-03",
                proceed: false,
            },
            {
                id: 3,
                title: "웹 프로젝트 팀원 구합니다!",
                content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
                hash: ["spring boot", "커피", "백엔드"],
                writer: "sil",
                time: "2024-01-03",
                proceed: false,
            },
            {
                id: 4,
                title: "웹 프로젝트 팀원 구합니다!",
                content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
                hash: ["spring boot", "커피", "백엔드"],
                writer: "sil",
                time: "2024-01-03",
                proceed: true,
            },
    
        ])}
        else didMountPage.current = true;
    }, [currentPage])


    return (
        <>{console.log(currentPage)}
        <Navbar>
        </Navbar>
        <Community
            isDark={isDark}
        >
            <SideMenu
                selected={selected}
                setSelected={setSelected}
                isDark={isDark}
                setCurrentPage={setCurrentPage}
            >
            </SideMenu>

            <div>
            {selected === "member" ? (
                <CommunityMemberPage
                    isDark={isDark}
                    postList={postList}
                />
            ) : ("")}

            {selected === "team" ? (
                <CommunityTeamPage
                    isDark={isDark}
                    postList={postList}
                />
            ) : ("")}

            {selected === "feadback" ? (
                <CommunityFeadBackPage
                    isDark={isDark}
                    postList={postList}
                />
            ) : ("")}

            <Pagination
                totalItems={20}
                itemCountPerPage={5}
                pageCount={2}
                currentPage={currentPage}
                selected={selected}
                setCurrentPage={setCurrentPage}
            >

            </Pagination>
            </div>
        </Community>

        </>
    )
}

export default CommunityMainPage;