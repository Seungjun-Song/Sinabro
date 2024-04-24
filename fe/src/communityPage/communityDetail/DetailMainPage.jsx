import styled from 'styled-components'
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../../components/navs/Navbar';
import SideMenu from '../SideMenu';
import DetailMember from './DetailMember';

const Community = styled.div`
    display: flex;
    align-items: start;

    width: 100%;
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
            <SideMenu
                selected={selected}
                setSelected={setSelected}
            >
            </SideMenu>
            {selected === "member" ? (
                <DetailMember/>
            ) : ("")}

            {selected === "team" ? (""
            ) : ("")}

            {selected === "feadback" ? (""
            ) : ("")}
        </Community>

        </>
    )
}

export default DetailMainPage;