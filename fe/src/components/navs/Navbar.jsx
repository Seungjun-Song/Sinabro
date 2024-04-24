import React, { useState } from 'react';
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import DropTeam from './DropTeam';

import Logo from '/public/image/nav/sinabro_logo.png'
import Sinabro from '/image/nav/Sinabro.png'
import DropDawnIcon from '/image/nav/dropdownIcon.png'

const NavBar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    background-color: rgba(86, 76, 173, 1);

    position: relative;
`;

const LogoImage = styled.img`
    height: 3rem;

    border: 2px solid white;
    border-radius: 50%; 
    margin: 1rem;

`;

const SinabroImg = styled.img`
    height: 1.3rem;
`;

const DropDown = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    color: white;
`

const Community = styled.div`
    color: white;
`

const MyPage = styled.div`
    color: white;
`

const Log = styled.div`
    color: white;
`

const DropDownButton = styled.div`
`

const DropDownPage = styled.div`
position: absolute; /* 절대 위치 지정 */
z-index: 999;
top: 70%;
left: 8%;
`

const LeftNavContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 25%;
    
    margin-left: 1%;
`;

const RightNavContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 10%;

    margin-right: 3%;
`;

const Logos = styled.div`
`




const Navbar = () => {
    const [dropDown, setDropDown] = useState(false);

    return (
        <NavBar>
            <LeftNavContainer>
                <Logos>
                <LogoImage
                 src={Logo}
                />
                <SinabroImg
                 src={Sinabro}
                />
                </Logos>

            <DropDown>
                <div style={{fontFamily: "Jamsil Light"}}>
                    팀 스페이스
                </div>
                <DropDownButton onClick={() => {setDropDown(!dropDown)}}
                            >
                    {dropDown ? 
                    <img
                        src={DropDawnIcon}
                        style={{ transform: 'rotate(180deg)', width: "10px" }}
                    >
                    </img> : 
                    <img
                        src={DropDawnIcon}
                        style={{width:"10px"}}
                    >
                    </img>
                    }
                </DropDownButton>
                <DropDownPage>
                    {dropDown && <DropTeam/>}
                </DropDownPage>

            </DropDown>

            <Community style={{fontFamily: "Jamsil Light"}}>
                    커뮤니티
            </Community>
            </LeftNavContainer>


            <RightNavContainer>
            <MyPage style={{fontFamily: "Jamsil Light"}}>
                    마이페이지
            </MyPage>

            <Log style={{fontFamily: "Jamsil Light"}}>
                    로그아웃
            </Log>
            </RightNavContainer>


        </NavBar>

        

    );
}

export default Navbar;