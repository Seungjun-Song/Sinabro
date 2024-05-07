import styled, { css } from 'styled-components'
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import Navbar from '../../components/navs/Navbar';
import DetailSideMenu from './DetailSideMenu';
import DetailMember from './DetailMember';
import DetailTeam from './DetailTeam';
import DetailFeadback from './DetailFeadback';
import { GlobalColor } from '../../services/color';

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

    const [selected, setSelected] = useState(data.kind);

    const isDark = useSelector(state =>state.isDark.isDark);

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
            {selected === "member" ? (
                <DetailMember
                    isDark={isDark}
                />
            ) : ("")}

            {selected === "team" ? (
                <DetailTeam
                    isDark={isDark}
                />
            ) : ("")}

            {selected === "feadback" ? (
                <DetailFeadback
                    isDark={isDark}
                />
            ) : ("")}
        </Community>

        </>
    )
}

export default DetailMainPage;