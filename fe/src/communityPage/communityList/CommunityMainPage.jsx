import styled, { css } from 'styled-components'
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from "../../components/navs/Navbar";
import SideMenu from '../SideMenu';
import CommunityMemberPage from './CommunityMemberPage';
import CommunityTeamPage from './CommunityTeamPage';
import CommunityFeadBackPage from './CommunityFeadbackPage';
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

    const isDark = true;

    const [selected, setSelected] = useState(data.kind);
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
            >
            </SideMenu>

            {selected === "member" ? (
                <CommunityMemberPage
                    isDark={isDark}
                />
            ) : ("")}

            {selected === "team" ? (
                <CommunityTeamPage
                    isDark={isDark}
                />
            ) : ("")}

            {selected === "feadback" ? (
                <CommunityFeadBackPage
                    isDark={isDark}
                />
            ) : ("")}
        </Community>

        </>
    )
}

export default CommunityMainPage;