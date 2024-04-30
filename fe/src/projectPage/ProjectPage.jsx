import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectPageNavBar from './ProjectPageNavBar';
import ProjectPageLeftPanel from './ProjectPageLeftPanel';
import ProjectPageRightPanel from './ProjectPageRightPanel';
import { useDispatch, useSelector } from 'react-redux';
import { Calender } from '../components/calender/Calender';
import { getDatabase, onValue, ref } from 'firebase/database';
import { setNewMessageState } from '../store/newMessageSlice';
import { changeProjectChatState } from '../store/projectChatShow';

const ProjectContainer = styled.div`
  position: relative; /* 부모 컨테이너를 기준으로 자식 요소의 위치를 설정하기 위해 */
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ProjectMainContainer = styled.div`
  width: 100%;
  height: 92%;
  display: flex;
  position: relative; /* 우측 하단에 메시지를 고정하기 위해 */
`;

const MessageContainer = styled.div`
  position: absolute;
  bottom: 3rem; /* 아래 여백 조절 */
  right: 3rem; /* 우측 여백 조절 */
  border-left: 1rem solid #3EC8AF;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 1px 2px #B8B8B8;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
      transform: scale(1.05);
  }
  display: flex;
  flex-direction: column;
  max-width: 15rem;
`;

const MessageHeader = styled.div`
  padding: 5px;
  font-weight: bold;
  width: 100%;
  border-radius: 0 10px 0 0;
`

const MessageBody = styled.div`
  padding: 5px;
  width: 100%;
`

const ProjectPage = () => {
  const isProjectCalenderShow = useSelector((state) => state.projectCalender);
  const [lastMessage, setLastMessage] = useState(null);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const dispatch = useDispatch();
  const newMessageInfo = useSelector(state => state.newMessage)

  useEffect(() => {
    const db = getDatabase();
    const chatRef = ref(db, 'chats');

    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const chatMessages = Object.values(data);
        const lastChatMessage = chatMessages[chatMessages.length - 1];
        setLastMessage(lastChatMessage);
        dispatch(setNewMessageState(true));
        setTimeout(() => {
          dispatch(setNewMessageState(false));
          setIsFirstMount(false);
        }, 3000);
      }
    });
  }, []);

  const newChatState = () => {
    if (!isFirstMount && newMessageInfo.isNotificationOn && !newMessageInfo.projectRightPanelState && newMessageInfo.newMessageState) { //처음 마운트가 아니고 알림이 켜져있으면
      return true
    }
    else {
      return false
    }
  }

  return (
    <ProjectContainer>
      <ProjectPageNavBar />
      <ProjectMainContainer>
        <ProjectPageLeftPanel />
        {isProjectCalenderShow.value === true ? (
          <div style={{ height: '100%', width: '100%' }}>
            <Calender />
          </div>
        ) : (
          <iframe
            title="code-server"
            src="https://k10e103.p.ssafy.io/code-server"
            style={{ width: '100%', height: '100%', border: 'none' }}
          ></iframe>
        )}
        <ProjectPageRightPanel />
        {newChatState() && (
          <MessageContainer onClick={() => dispatch(changeProjectChatState(true))}>
            <MessageHeader>{lastMessage.displayName}</MessageHeader>
            <MessageBody>{lastMessage.message}</MessageBody>
          </MessageContainer>
        )}
      </ProjectMainContainer>
    </ProjectContainer>
  );
};

export default ProjectPage;
