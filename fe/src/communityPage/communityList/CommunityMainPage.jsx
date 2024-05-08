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
import { GlobalColor } from '../../services/color';
import getEnv from '../../utils/getEnv';

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

const MainBox = styled.div`
    width: 100%;
    padding: 0 0 0 10rem;
`

const CommunityMainPage = () => {
    const location = useLocation();
    const data = location.state;

    const isDark = useSelector(state =>state.isDark.isDark);

    const [selected, setSelected] = useState({id: data.kind.id, name: data.kind.name});
    const [currentPage, setCurrentPage] = useState(data.page);
    const [proceedOption, setProceedOption] = useState({id: 502, name: "모집 중"});
    const [teamOption, setTeamOption] = useState({id: 0, name: "분야 선택"});

    const back_url = getEnv('BACK_URL')

    const [postList, setPostList] = useState([])

    useEffect(() =>{
        axios.get(`${back_url}/communities?catBoard=${selected.id}&catCalender=${proceedOption.id}&catJob=${teamOption.id}&keyword=&page=0`)
        .then(res => {
            const totalData = res.data.result.boardListResponseDto;
            setPostList([]);
            totalData.forEach((data, index) => {
                console.log(data);
                const newPost = {
                    id: data.boardId,
                    title: data.boardTitle,
                    content: data.boardContent,
                    hash: ["spring boot", "커피", "백엔드"],
                    writer: data.memberName,
                    time: data.updateDttm,
                    proceed: data.communityProgress,
                };

                setPostList(prevPostList => [...prevPostList, newPost]);
            })

        })
        .catch(err => {
            console.log(err);
        })

        console.log("postList", postList)
    }, [selected, proceedOption, teamOption, currentPage])


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
                />
            ) : ("")}

            {selected.name === "team" ? (
                <CommunityTeamPage
                    isDark={isDark}
                    postList={postList}
                    proceedOption={proceedOption}
                    setProceedOption={setProceedOption}
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
            </MainBox>
        </Community>

        </>
    )
}

export default CommunityMainPage;