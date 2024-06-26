import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ProjectPageLeftPanel from "./ProjectPageLeftPanel";
import ProjectPageRightPanel from "./ProjectPageRightPanel";
import { useDispatch, useSelector } from "react-redux";
import { Calender } from "../components/calender/Calender";
import { getDatabase, onValue, ref } from "firebase/database";
import { setNewMessageState } from "../store/newMessageSlice";
import { changeProjectChatState } from "../store/projectChatShow";
import WebRTC from "../components/webrtc/WebRTC";
import { clearProjectRoomId } from "../store/projectRoomIdSlice";
import axios from "axios";
import getEnv from "../utils/getEnv";
import ProjectLoadingPage from "./ProjectLoadingPage";
import ProjectInfo from "./ProjectInfo";
import { changeProjectCalenderState } from "../store/projectCalenderSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as fasCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import Navbar from "../components/navs/Navbar";
import ProjectFeedLoadingPage from "./ProjectFeedbackLoadingPage";
import ProjectFeedbackRightPanel from "./ProjectFeedbackRightPanel";
import { changeFeedbackRoomIdState, clearFeedbackMemberId } from "../store/feedbackMemberIdSlice";
import { toggleisDarkState } from "../store/isDarkSlice";

const ProjectContainer = styled.div`
  position: relative; /* 부모 컨테이너를 기준으로 자식 요소의 위치를 설정하기 위해 */
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  min-height: 600px;
  min-width: 700px;
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
  border-left: 1rem solid #3ec8af;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 1px 2px #b8b8b8;
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
`;

const MessageBody = styled.div`
  padding: 5px;
  width: 100%;
`;

const IframContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 800px;
`;

const URLSelectContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ isDark }) =>
    isDark ? "rgb(50, 50, 51)" : "rgb(229, 229, 229)"};
  color: ${({ isDark }) =>
    !isDark ? "rgb(50, 50, 51)" : "rgb(229, 229, 229)"};
`;

const URLSelectBox = styled.div`
  padding: 0 0.5rem;
  cursor: pointer;
  border-right: 2px solid #b8b8b8;
  gap: 1rem;
`;

const ProjectPage = () => {
  const isProjectCalenderShow = useSelector((state) => state.projectCalender);
  const [lastMessage, setLastMessage] = useState(null);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [codeServerURL, setCodeServerURL] = useState(null);
  const [runDevPreviewUrl, setRunDevPreviewUrl] = useState(null);
  const [startPreviewUrl, setStartPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [iframeList, setIframeList] = useState([])
  const [feedbackLoading, setFeedbackLoading] = useState(true)
  const [feedbackURL, setFeedbackURL] = useState(null)

  const userInfo = useSelector((state) => state.user.currentUser);
  const [dbport, setDbPort] = useState(null)
  const [teammate, setTeammate] = useState([]);
  const [selectedTeammates, setSelectedTeammates] = useState([userInfo.uid]); // props로 넘겨주는 값

  const [teammateIds, setTeammateIds] = useState([])

  const dispatch = useDispatch();

  const newMessageInfo = useSelector((state) => state.newMessage);
  const myCurrentProject = useSelector((state) => state.myCurrentProject.value);
  const isDark = useSelector((state) => state.isDark.isDark);
  const feedbackMemberId = useSelector(state => state.feedbackMemberId.value)

  const back_url = getEnv("BACK_URL");

  const iframeRef = useRef(null);

  const codeServerDarkMode = async () => {
    try {
      const res = await axios.post(`${back_url}/teams/projects/darkMode`);
      console.log(res.data);
      // Iframe 리로딩
      if (iframeRef.current) {
        iframeRef.current.src += "";
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    dispatch(changeProjectCalenderState(false))
    codeServerDarkMode();
    console.log(isDark);
  }, [isDark]);

  useEffect(() => {
    const db = getDatabase();
    const chatRef = ref(db, `chats/${myCurrentProject.projectId}`);

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
    return () => {
      dispatch(clearProjectRoomId()); // 프로젝트 페이지를 떠나면 프로젝트 Id를 삭제
      dispatch(changeProjectChatState(true)) // 프로젝트 페이지를 떠날 때 다음 접속시 바로 코드 서버 뜨게
    };
  }, []);

  useEffect(() => {
    const getCodeServerURL = async () => {
      try {
        const res = await axios.post(
          `${back_url}/teams/projects/enter`,
          {
            repoUrl: myCurrentProject.projectRepo,
          },
          { withCredentials: true }
        );
        console.log(res.data);
        if (
          (res.data.result.theme === "Light" && isDark) ||
          (res.data.result.theme !== "Light" && !isDark)
        ) {
          codeServerDarkMode();
        }
        setCodeServerURL(res.data.result.url);
        setRunDevPreviewUrl(res.data.result.runDevPreviewUrl);
        setStartPreviewUrl(res.data.result.startPreviewUrl);
        setLoading(false);
        setDbPort(res.data.result.dbPort)
        setIframeList([res.data.result.url]) // 처음에는 코드 서버만 들어있음
      } catch (err) {
        console.error(err);
      }
    };

    getCodeServerURL();

    const leaveCodeServer = async () => {
      try {
        const res = await axios.post(`${back_url}/teams/projects/exit`, {
          withCredentials: true,
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    return () => {
      setCodeServerURL(null); // 프로젝트를 떠나면 주소 초기화
      setLoading(true);
      leaveCodeServer();
      dispatch(clearFeedbackMemberId())
    };
  }, []);


  useEffect(() => {
    const getTeammateInfo = async () => {
      try {
        const res = await axios.get(
          `${back_url}/teams?projectId=${myCurrentProject.projectId}`
        );
        console.log("팀원 정보", res.data.result.teammateInfoList);

        const teammateList = res.data.result.teammateInfoList;
        setTeammate(teammateList);

        const teammateIdsList = teammateList.map(teamInfo => teamInfo.memberId);
        setTeammateIds(teammateIdsList);

        // 콘솔 로그는 상태가 설정된 후 별도로 출력
        console.log("팀메이트", teammateList);
        console.log('팀메이트 아이디', teammateIdsList);
      } catch (err) {
        console.error(err);
      }
    };
    getTeammateInfo();
    // const teammateId = teammate.map(item => item.memberId)
    // setSelectedTeammates(teammateId)
    // console.log('이거 왜 안보이지?', teammateId, selectedTeammates)
    // 처음에 모든 사람의 Id를 미리 넣어놓고 싶은데, 안됨... 누가 이 주석을 발견하면 해결해주세요.
  }, []);

  useEffect(() => {
    const getFeedbackURL = async () => {
      try {
        console.log('feedbackMemberId: ', feedbackMemberId.id)
        const res = await axios.get(`${back_url}/teams/projects/${feedbackMemberId.id}/feedbacks`)
        console.log(res.data)
        setFeedbackURL(res.data.result.feedbackUrl)
        console.log('feedbackURL: ', res.data.result.feedbackUrl)

          const feedbackTheme = res.data.result.theme
          if (feedbackTheme === 'Light' && isDark) {
            dispatch(toggleisDarkState())
          }
          else if (feedbackTheme !== 'Light' && !isDark) {
            dispatch(toggleisDarkState())
          }

        setFeedbackLoading(false)
      }
      catch (err) {
        console.error(err)
      }
    }
    const currentURL = window.location.href.split('/')
    dispatch(changeFeedbackRoomIdState(currentURL[currentURL.length-1]))
    console.log('currentURL: ', currentURL[currentURL.length-1])
    getFeedbackURL()
  }, [])

  const newChatState = () => {
    if (
      !isFirstMount &&
      newMessageInfo.isNotificationOn &&
      !newMessageInfo.projectRightPanelState &&
      newMessageInfo.newMessageState
    ) {
      //처음 마운트가 아니고 알림이 켜져있으면
      return true;
    } else {
      return false;
    }
  };

  const switchUrlState = (url) => {
    setIframeList((prev) => {
      if (prev.includes(url)) {
        if (prev.length === 1) {
          return prev
        }
        else {
          console.log(prev)
          console.log(prev.length)
          return prev.filter(u => u !== url)
        }
      }
      else {
        return [...prev, url]
      }
    })
  }

  const includeCheck = (url) => {
    if (iframeList.includes(url)) {
      return true
    }
    else {
      return false
    }
  }

  return (
    <>
      {teammateIds.includes(userInfo.uid) ?
        <>
          {loading ? (
            <ProjectLoadingPage />
          ) : (
            <ProjectContainer>
              <WebRTC dbport={dbport} runDevPreviewUrl={runDevPreviewUrl} startPreviewUrl={startPreviewUrl} />
              <ProjectMainContainer>
                <ProjectPageLeftPanel
                  teammate={teammate}
                  selectedTeammates={selectedTeammates}
                  setSelectedTeammates={setSelectedTeammates}
                />
                {isProjectCalenderShow.value === true ? (
                  <div style={{ height: "100%", width: "100%" }}>
                    <Calender selectedTeammates={selectedTeammates} />
                  </div>
                ) : (
                  <IframContainer>
                    <URLSelectContainer isDark={isDark}>
                      <URLSelectBox
                        onClick={() => switchUrlState(codeServerURL)}
                      >
                        {includeCheck(codeServerURL) ?
                          <FontAwesomeIcon icon={fasCircle} style={{ color: 'rgb(114, 0, 0)' }} />
                          :
                          <FontAwesomeIcon icon={fasCircle} style={{ color: isDark ? 'whitesmoke' : 'gray' }} />
                        }
                        <span style={{ marginLeft: '0.5rem' }}>
                          Code
                        </span>
                      </URLSelectBox>
                      <URLSelectBox
                        onClick={() => switchUrlState(runDevPreviewUrl)}
                      >
                        {includeCheck(runDevPreviewUrl) ?
                          <FontAwesomeIcon icon={fasCircle} style={{ color: 'rgb(114, 0, 0)' }} />
                          :
                          <FontAwesomeIcon icon={fasCircle} style={{ color: isDark ? 'whitesmoke' : 'gray' }} />
                        }
                        <span style={{ marginLeft: '0.5rem' }}>
                          Frontend
                        </span>
                      </URLSelectBox>
                      <URLSelectBox
                        onClick={() => switchUrlState(startPreviewUrl)}
                      >
                        {includeCheck(startPreviewUrl) ?
                          <FontAwesomeIcon icon={fasCircle} style={{ color: 'rgb(114, 0, 0)' }} />
                          :
                          <FontAwesomeIcon icon={fasCircle} style={{ color: isDark ? 'whitesmoke' : 'gray' }} />
                        }
                        <span style={{ marginLeft: '0.5rem' }}>
                          Backend
                        </span>
                      </URLSelectBox>
                    </URLSelectContainer>
                    <div style={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%' }}>
                      <iframe
                        ref={iframeRef}
                        title="code-server"
                        src={codeServerURL}
                        style={{ width: "100%", height: "100%", border: "none", display: includeCheck(codeServerURL) ? 'block' : 'none' }}
                      ></iframe>
                      {includeCheck(runDevPreviewUrl) ?
                        <iframe
                          title="code-dev"
                          src={runDevPreviewUrl}
                          style={{ width: "100%", height: "100%", border: "none" }}
                        ></iframe>
                        :
                        null
                      }
                      {includeCheck(startPreviewUrl) ?
                        <iframe
                          title="code-start"
                          src={startPreviewUrl}
                          style={{ width: "100%", height: "100%", border: "none" }}
                        ></iframe>
                        :
                        null
                      }
                    </div>
                  </IframContainer>
                )}
                <ProjectPageRightPanel />
                {newChatState() && (
                  <MessageContainer
                    onClick={() => dispatch(changeProjectChatState(true))}
                  >
                    <MessageHeader>{lastMessage.displayName}</MessageHeader>{" "}
                    {/* 수정된 부분 */}
                    <MessageBody>{lastMessage.message}</MessageBody>
                  </MessageContainer>
                )}
              </ProjectMainContainer>
              {/* <ProjectInfo /> */}
            </ProjectContainer>
          )}
        </>
        :
        <>
          {feedbackLoading ?
            <ProjectFeedLoadingPage />
            :
            <ProjectContainer>
              <Navbar />
              <ProjectMainContainer style={{ marginTop: '80px' }}>
                <iframe
                  title="feedback-code-server"
                  src={feedbackURL}
                  style={{ width: "100%", height: "100%", border: "none" }}
                ></iframe>
                <ProjectFeedbackRightPanel />
              </ProjectMainContainer>
            </ProjectContainer>
          }
        </>
      }
    </>
  );
};

export default ProjectPage;
