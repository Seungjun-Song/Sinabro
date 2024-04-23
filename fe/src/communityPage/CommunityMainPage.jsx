import styled from 'styled-components'
import React, { useState } from 'react';

import Navbar from "../components/navs/Navbar";
import SideMenu from './SideMenu';
import CommunityMemberPage from './CommunityMemberPage';

const Community = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
`


const CommunityMainPage = () => {
    const [selected, setSelected] = useState("member");
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
                <CommunityMemberPage></CommunityMemberPage>
            ) : ("")}

            {selected === "team" ? (
                "team"
            ) : ("")}

            {selected === "feadback" ? (
                "feadback"
            ) : ("")}
        </Community>

        </>
    )
}

export default CommunityMainPage;