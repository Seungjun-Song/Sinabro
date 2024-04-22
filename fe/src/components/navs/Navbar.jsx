import React, { useState } from 'react';
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import DropTeam from './DropTeam';

import Logo from './../../../public/image/nav/sinabro_logo.png'
import Sinabro from './../../../public/image/nav/Sinabro.png'
import DropDawnIcon from './../../../public/image/nav/dropdownIcon.png'

const NavBar = styled.nav`
    position: fixed;
    width: 100%;
    height: 80px;
    background-color: rgba(86, 76, 173, 1);
    top: 0;
    display: flex;
`;

const LogoImage = styled.img`
    position: absolute;
    top: 15%;
    left: 10px;
    height: 50px;

    border:10px;
`;

const SinabroImg = styled.img`
    position: absolute;
    top: 28%;
    left: 80px;
    height: 30%;

    border:10px;
`;

const DropDown = styled.div`
display: flex;
font-size: 16px;
padding-top: 25px;
padding-left: 20%;
width: 100%;
`

const DropDownButton = styled.div`

`


const Navbar = () => {
    const [dropDown, setDropDown] = useState(false);

    return (
        <NavBar>
            <Link to="">
                <LogoImage
                 src={Logo}
                />
                <SinabroImg
                 src={Sinabro}
                />
            </Link>

            <DropDown>
                <div>
                    팀 스페이스
                </div>
                <DropDownButton onClick={() => {setDropDown(!dropDown)}}
                            >
                    {dropDown ? 
                    <img
                        src={DropDawnIcon}
                        style={{ transform: 'rotate(180deg)' }}
                    >
                    </img> : 
                    <img
                        src={DropDawnIcon}
                    >
                    </img>
                    }
                </DropDownButton>
                <div>
                    {dropDown && <DropTeam/>}
                </div>

            </DropDown>


        </NavBar>

        

    );
}

export default Navbar;