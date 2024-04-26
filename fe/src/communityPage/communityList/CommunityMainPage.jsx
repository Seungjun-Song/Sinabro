import styled from 'styled-components'
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from "../../components/navs/Navbar";
import SideMenu from '../SideMenu';
import CommunityMemberPage from './CommunityMemberPage';
import CommunityTeamPage from './CommunityTeamPage';
import CommunityFeadBackPage from './CommunityFeadbackPage';

const Community = styled.div`
display: flex;
align-items: start;
justify-content: space-between;
width: 100%;

margin: 3.5rem 0 0 0;
`


const CommunityMainPage = () => {
    const location = useLocation();
    const data = location.state;

    const [selected, setSelected] = useState(data.kind);
    return (
        <>
        <Navbar>
        </Navbar>
        <Community>
            <SideMenu
                selected={selected}
                setSelected={setSelected}
            >
            </SideMenu>

            {selected === "member" ? (
                <CommunityMemberPage/>
            ) : ("")}

            {selected === "team" ? (
                <CommunityTeamPage/>
            ) : ("")}

            {selected === "feadback" ? (
                <CommunityFeadBackPage/>
            ) : ("")}
        </Community>

        </>
    )
}

export default CommunityMainPage;