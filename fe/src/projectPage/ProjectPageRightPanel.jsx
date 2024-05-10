import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import ChatBot from '../components/chatbot/ChatBot'
import Chat from '../components/chat/Chat'
import { useDispatch, useSelector } from 'react-redux';
import { setChatState, setIsNotificationOn, setProjectRightPanelState } from '../store/newMessageSlice';
import { changeProjectChatState } from '../store/projectChatShow';
import './ProjectStyles.css'

const ProjectPageRightPanelContainer = styled.div`
    height: 100%;
    width: 30%;
    border-left: 2px solid #B8B8B8;
    background-color: ${({isDark}) => !isDark? '#404040' : 'white'};
`

const ProjectPageRightPanelClosedContainer = styled.div`
    height: 100%;
    width: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 2px solid #B8B8B8;
    background-color: ${({isDark}) => !isDark? '#404040' : 'white'};
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

const IconHoverBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3 ease;
    &:hover{
        transform: scale(1.2)
    }
`

const ProjectPageRightPanel = () => {

    const dispatch = useDispatch()

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(true)
    const [isChatsNow, setIsChatsNow] = useState(true)
    const [isNotification, setIsNotification] = useState(true)

    const isDark = !useSelector(state =>state.isDark.isDark)

    const states = useSelector(state => state.newMessage)
    const chatOpenForced = useSelector(state => state.projectChatShow.value)

    useEffect(() => {
        dispatch(setProjectRightPanelState(isSidePanelOpen))
    }, [isSidePanelOpen])

    useEffect(() => {
        dispatch(setChatState(isChatsNow))
    }, [isChatsNow])

    useEffect(() => {
        dispatch(setIsNotificationOn(isNotification))
    }, [isNotification])

    useEffect(() => {
        if (chatOpenForced) {
            setIsSidePanelOpen(true)
            setIsChatsNow(true)
        }
    }, [chatOpenForced])

    const handleSidePanel = () => {
        setIsSidePanelOpen(!isSidePanelOpen)
        if (chatOpenForced) {
            dispatch(changeProjectChatState(false))
        }
    }

    return (
        <>
            {isSidePanelOpen ?
                <ProjectPageRightPanelContainer isDark={isDark} className='hide-all-panel'>
                    <UpperBox>
                        <IconHoverBox isDark={isDark}>
                            <FontAwesomeIcon icon={faChevronRight} onClick={handleSidePanel} style={{ cursor: 'pointer', color: isDark ? '#564CAD' : 'white' }} />
                        </IconHoverBox>
                        <ChatImgBox>
                            <IconHoverBox>
                                <FontAwesomeIcon icon={faBell} style={{ justifySelf: 'center', height: '1.2rem', cursor: 'pointer', color: isNotification ? '#3EC8AF' : 'grey' }} onClick={() => setIsNotification(!isNotification)} />
                            </IconHoverBox>
                            {isChatsNow ?
                                <>
                                    <IconHoverBox>
                                        <IconImg src='/images/chat.png' />
                                    </IconHoverBox>
                                    <IconHoverBox>
                                        <IconImg src='/images/chatbot_fade.png' onClick={() => { setIsChatsNow(false), dispatch(changeProjectChatState(false)) }} />
                                    </IconHoverBox>
                                </>
                                :
                                <>
                                    <IconHoverBox>
                                        <IconImg src='/images/chat_fade.png' onClick={() => setIsChatsNow(true)} />
                                    </IconHoverBox>
                                    <IconHoverBox>
                                        <IconImg src='/images/chatbot.png' />
                                    </IconHoverBox>
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
                <ProjectPageRightPanelClosedContainer isDark={isDark}>
                    <IconHoverBox>
                        <FontAwesomeIcon icon={faChevronLeft} onClick={handleSidePanel} style={{ cursor: 'pointer', color: isDark ? '#564CAD' : 'white' }} />
                    </IconHoverBox>
                </ProjectPageRightPanelClosedContainer>
            }
        </>
    )
}

export default ProjectPageRightPanel