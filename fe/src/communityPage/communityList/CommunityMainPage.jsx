import styled, { css } from 'styled-components'
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';

import Navbar from "../../components/navs/Navbar";
import SideMenu from '../SideMenu';
import CommunityMemberPage from './CommunityMemberPage';
import CommunityTeamPage from './CommunityTeamPage';
import CommunityFeadBackPage from './CommunityFeadbackPage';
import Pagination from './Pagination';
import UserChat from '../../components/Userchat/UserChat';
import { GlobalColor } from '../../services/color';
import getEnv from '../../utils/getEnv';
import CalTime from '../CalTime';

const Community = styled.div`
display: flex;
align-items: start;
justify-content: space-between;
width: 100%;
min-height:100vh;
padding: 2rem 0 0 0;

${props => props.isDark && css`
    background: ${ GlobalColor.colors.primary_black };
`}
margin: 3.5rem 0 0 0;
transition: 0.3s;
`

const MainBox = styled.div`
    width: 100%;
    padding: 0 0 0 3rem;
`

const CommunityMainPage = () => {
    const location = useLocation();
    const data = location.state;

    const isDark = useSelector(state =>state.isDark.isDark);

    const [selected, setSelected] = useState({id: data.kind.id, name: data.kind.name});
    const [currentPage, setCurrentPage] = useState(data.page);
    const [proceedOption, setProceedOption] = useState({id: 502, name: data.kind.name === "feakback" ? "요청 중" : "모집 중"});
    const [teamOption, setTeamOption] = useState({id: 0, name: "분야 선택"});
    const [searchWord, setSearchWord] = useState("");
    const [totalCount, setTotalCount] = useState(0);

    const back_url = getEnv('BACK_URL')

    const [postList, setPostList] = useState([])

    useEffect(() =>{
        axios.get(`${back_url}/communities?board=${selected.id}&cal=${proceedOption.id}&job=${teamOption.id}&keyword=${searchWord}&page=${currentPage-1}`)
        //axios.get(`${back_url}/communities?catBoard=0&catCalender=0&catJob=0&keyword=&page=0`)
        .then(res => {
            const totalData = res.data.result.boardListResponseDto;
            setPostList([]);

            //console.log(res.data.result.totalCount);
            setTotalCount(res.data.result.totalCount);

            totalData.forEach((data, index) => {
                //시간 계산해서 넣기
                //오늘 올라온거라면 n시간 전, n분 전 표시
                const fullDate = new Date(data.updatedDttm);
                const finalDate = CalTime(fullDate);

                const newPost = {
                    id: data.boardId,
                    title: data.boardTitle,
                    content: data.boardContent,
                    hash: data.tagDtos,
                    writer: data.memberName,
                    time: finalDate,
                    proceed: data.communityProgress,
                    recruitedBack: data.recruitedPeopleBackEnd,
                    recruitedFront: data.recruitedPeopleFrontEnd,
                    requiredBack: data.requiredPeopleBackEnd,
                    requiredFront: data.requiredPeopleFrontEnd,
                };

                setPostList(prevPostList => [...prevPostList, newPost]);
            })

        })
        .catch(err => {
            console.log(err);
        })
    }, [selected, proceedOption, teamOption, currentPage, searchWord])


    return (
        <>
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
                proceedOption={proceedOption}
                setProceedOption={setProceedOption}
                teamOption={teamOption}
                setTeamOption={setTeamOption}
            >
            </SideMenu>

            <MainBox>
            {selected.name === "member" ? (
                <CommunityMemberPage
                    isDark={isDark}
                    postList={postList}
                    proceedOption={proceedOption}
                    setProceedOption={setProceedOption}
                    teamOption={teamOption}
                    setTeamOption={setTeamOption}
                    searchWord={searchWord}
                    setSearchWord={setSearchWord}
                />
            ) : ("")}

            {selected.name === "team" ? (
                <CommunityTeamPage
                    isDark={isDark}
                    postList={postList}
                    proceedOption={proceedOption}
                    setProceedOption={setProceedOption}
                    searchWord={searchWord}
                    setSearchWord={setSearchWord}
                />
            ) : ("")}

            {selected.name === "feadback" ? (
                <CommunityFeadBackPage
                    isDark={isDark}
                    postList={postList}
                    proceedOption={proceedOption}
                    setProceedOption={setProceedOption}
                    teamOption={teamOption}
                    setTeamOption={setTeamOption}
                    searchWord={searchWord}
                    setSearchWord={setSearchWord}
                />
            ) : ("")}

            <Pagination
                totalItems={totalCount}
                itemCountPerPage={10}
                pageCount={5}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            >
            </Pagination>
            </MainBox>
        </Community>
        <UserChat/>

        </>
    )
}

export default CommunityMainPage;