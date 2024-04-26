import styled from 'styled-components'
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../../components/navs/Navbar';
import DetailSideMenu from './DetailSideMenu';
import DetailMember from './DetailMember';
import DetailTeam from './DetailTeam';
import DetailFeadback from './DetailFeadback';

const Community = styled.div`
    display: flex;
    align-items: start;

    width: 100%;

    margin: 3.5rem 0 0 0;
`


const DetailMainPage = () => {
    const location = useLocation();
    const data = location.state;

    const [selected, setSelected] = useState(data.kind);

    return (
        <>
        <Navbar>
        </Navbar>
        <Community>
            <DetailSideMenu
                selected={selected}
            >
            </DetailSideMenu>
            {selected === "member" ? (
                <DetailMember/>
            ) : ("")}

            {selected === "team" ? (
                <DetailTeam/>
            ) : ("")}

            {selected === "feadback" ? (
                <DetailFeadback/>
            ) : ("")}
        </Community>

        </>
    )
}

export default DetailMainPage;