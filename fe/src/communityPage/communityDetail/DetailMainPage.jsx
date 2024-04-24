import styled from 'styled-components'
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../../components/navs/Navbar';
import SideMenu from '../SideMenu';

const Community = styled.div`
display: flex;
align-items: start;
justify-content: space-between;
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

            {selected === "member" ? (""
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