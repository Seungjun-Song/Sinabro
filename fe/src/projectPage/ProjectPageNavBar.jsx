import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPhone, faSignOut, faMicrophoneSlash, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';


const NavContainer = styled.div`
    width: 100vw;
    height: 8%;
    background-color: #564CAD;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
`

const NavRigthBox = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    gap: 1rem;
`

const UserImage = styled.img`
    height: 45px;
    border-radius: 50%;
`

const IconHoverBox = styled.div`
    transition: transform 0.3 ease;
    &:hover{
        transform: scale(1.2)
    }
`

const ProjectPageNavBar = () => {

    const [isMicOn, setIsMicOn] = useState(true)
    const [isPhoneOn, setIsPhoneOn] = useState(true)

    const navigate = useNavigate()

    return (
        <NavContainer>
            <IconHoverBox>
                <FontAwesomeIcon icon={faSignOut} style={{ color: 'white', cursor: 'pointer' }} flip='horizontal' onClick={() => navigate(-1)} />
            </IconHoverBox>
            <NavRigthBox>
                {isMicOn ?
                    <IconHoverBox>
                        <FontAwesomeIcon icon={faMicrophone} style={{ color: 'white', cursor: 'pointer', height: '1rem', width: '1rem' }} onClick={() => setIsMicOn(!isMicOn)} />
                    </IconHoverBox>
                    :
                    <IconHoverBox>
                        <FontAwesomeIcon icon={faMicrophoneSlash} style={{ color: 'white', cursor: 'pointer', transform: 'scaleX(-1)', height: '1rem', width: '1rem' }} onClick={() => setIsMicOn(!isMicOn)} />
                    </IconHoverBox>
                }
                {isPhoneOn ?
                    <IconHoverBox>
                        <FontAwesomeIcon icon={faPhone} style={{ color: 'white', cursor: 'pointer', height: '1rem', width: '1rem' }} onClick={() => setIsPhoneOn(!isPhoneOn)} />
                    </IconHoverBox>
                    :
                    <IconHoverBox>
                        <FontAwesomeIcon icon={faPhoneSlash} style={{ color: 'white', cursor: 'pointer', height: '1rem', width: '1rem' }} onClick={() => setIsPhoneOn(!isPhoneOn)} />
                    </IconHoverBox>
                }
                <UserImage src='/images/user1.png' />
                <UserImage src='/images/user2.png' />
            </NavRigthBox>
        </NavContainer>
    )
}

export default ProjectPageNavBar