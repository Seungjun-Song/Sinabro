import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ChatBot from '../components/chatbot/ChatBot'
import Chat from '../components/chat/Chat'

const ProjectPageRightPanelContainer = styled.div`
    height: 100%;
    width: 30%;
    border-left: 2px solid #B8B8B8;
`

const ProjectPageRightPanelClosedContainer = styled.div`
    height: 100%;
    width: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #564CAD;
    border-left: 2px solid #B8B8B8;
`

const UpperBox = styled.div`
    height: 6%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1rem;
    margin-right: 1rem;
    border-bottom: 2px solid #B8B8B8;
    color: #564CAD;
    font-weight: bold;
`

const ChatImgBox = styled.div`
    display: flex;
    gap: 1rem;
`

const IconImg = styled.img`
    height: 1.5rem;
    cursor: pointer;
`

const MainBox = styled.div`
    height: 94%;
    width: 100%;
`

const ProjectPageRightPanel = () => {

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(true)

    const handleSidePanel = () => {
        setIsSidePanelOpen(!isSidePanelOpen)
    }

    const [isChatsNow, setIsChatsNow] = useState(true)

    return (
        <>
            {isSidePanelOpen ?
                <ProjectPageRightPanelContainer>
                    <UpperBox>
                        <FontAwesomeIcon icon={faChevronRight} onClick={handleSidePanel} style={{ cursor: 'pointer' }} />
                        <ChatImgBox>
                            {isChatsNow ?
                                <>
                                    <IconImg src='/images/chat.png' onClick={() => setIsChatsNow(true)} />
                                    <IconImg src='/images/chatbot_fade.png' onClick={() => setIsChatsNow(false)} />
                                </>
                                :
                                <>
                                    <IconImg src='/images/chat_fade.png' onClick={() => setIsChatsNow(true)} />
                                    <IconImg src='/images/chatbot.png' onClick={() => setIsChatsNow(false)} />
                                </>
                            }
                        </ChatImgBox>
                    </UpperBox>
                    <MainBox>
                        {isChatsNow ?
                            <Chat />
                            :
                            <ChatBot />
                        }
                    </MainBox>
                </ProjectPageRightPanelContainer>
                :
                <ProjectPageRightPanelClosedContainer>
                    <FontAwesomeIcon icon={faChevronLeft} onClick={handleSidePanel} style={{ cursor: 'pointer' }} />
                </ProjectPageRightPanelClosedContainer>
            }
        </>
    )
}

export default ProjectPageRightPanel