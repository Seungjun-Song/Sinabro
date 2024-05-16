import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faSignOut,
  faHeadphonesSimple,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import getEnv from "../../utils/getEnv";
import { useDispatch, useSelector } from "react-redux";
import { toggleisDarkState } from "../../store/isDarkSlice";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { AnimatePresence, motion } from "framer-motion";
import "./styles.css";

const NavContainer = styled.div`
  width: 100vw;
  height: 8%;
  background-color: #564cad;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  min-width: 700px;
`;

const NavRigthBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 1rem;
  margin-left: auto;
`;

const UserImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconHoverBox = styled.div`
  transition: transform 0.3 ease;
  &:hover {
    transform: scale(1.2);
  }
`;

const RightNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin: 0 1rem;
`;

export default function WebRTC() {
  const [mySessionId, setMySessionId] = useState("SessionA");
  const [myUserName, setMyUserName] = useState(
    `Participant${Math.floor(Math.random() * 100)}`
  ); // 실제 유저의 정보를 넘겨줘야함
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const [tokenId, setTokenId] = useState("");

  const [isMicOn, setIsMicOn] = useState(true);
  const [isPhoneOn, setIsPhoneOn] = useState(true);

  const dispatch = useDispatch();

  const isDark = useSelector((state) => state.isDark.isDark);
  const projectRoomId = useSelector((state) => state.projectRoomId.value);

  const userInfo = useSelector((state) => state.user);

  const toggleDarkMode = () => {
    dispatch(toggleisDarkState());
  };

  const navigate = useNavigate();

  const OV = useRef(new OpenVidu());

  const back_url = getEnv("BACK_URL");

  useEffect(() => {
    const joinSession = async () => {
      const mySession = OV.current.initSession();

      mySession.on("streamCreated", (event) => {
        const subscriber = mySession.subscribe(event.stream, undefined);
        setSubscribers((subscribers) => [...subscribers, subscriber]);
      });

      mySession.on("streamDestroyed", (event) => {
        deleteSubscriber(event.stream.streamManager);
      });

      mySession.on("exception", (exception) => {
        console.warn(exception);
      });

      setSession(mySession);
    };

    joinSession();

    return () => {
      leaveSession();
      leaveCodeServer();
      if (session) {
        session.disconnect();
      }
      // OV.current = new OpenVidu();
      // setSession(undefined);
      // setSubscribers([]);
      // setMainStreamManager(undefined);
      // setPublisher(undefined);
    };
  }, []);

  useEffect(() => {
    if (session) {
      getToken().then(async (token) => {
        try {
          await session.connect(token, {
            clientData: userInfo.currentUser.photoURL,
          });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

          session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
        } catch (error) {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        }
      });
    }
  }, [session, myUserName]);

  const leaveCodeServer = async () => {
    try {
      const res = await axios.post(`${back_url}/teams/projects/exit`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const leaveSession = useCallback(() => {
    axios
      .post(`${back_url}/room/exit`, {
        sessionId: sessionId,
        connectionId: tokenId,
      })
      .then((response) => {
        // 성공적으로 요청이 처리된 경우
        if (session) {
          session.disconnect();
        }
        OV.current = new OpenVidu();
        setSession(undefined);
        setSubscribers([]);
        setMySessionId("SessionA");
        setMyUserName("");
        setMainStreamManager(undefined);
        setPublisher(undefined);
        navigate("/Mainpage");
      })
      .catch((err) => {
        // 요청이 실패한 경우
        console.error("Error occurred during post request", err);
      });
  }, [session, sessionId, tokenId]);

  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  const getToken = async () => {
    const res = await axios.post(`${back_url}/room`, {
      projectId: projectRoomId,
    });
    if (res.data.isSuccess === true) {
      const token = res.data.result.connectionToken;
      setSessionId(token.match(/sessionId=([^&]+)/)[1]);
      setTokenId(token.match(/token=([^&]+)/)[1]);
      return token;
    } else {
      try {
        const response = await axios.post(`${back_url}/room/enter`, {
          projectId: projectRoomId,
        });
        const token = response.data.result;
        setSessionId(token.match(/sessionId=([^&]+)/)[1]);
        setTokenId(token.match(/token=([^&]+)/)[1]);
        return token;
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // 뒤로가기나 새로고침 시 경고 표시
      e.preventDefault();
      e.returnValue = "";
    };

    // 페이지 이탈 시 경고 표시
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const toggleMicrophone = () => {
    if (publisher) {
      const newValue = !isMicOn;
      publisher.publishAudio(newValue);
      setIsMicOn(newValue);
    }
  };

  const toggleAllSubscribersAudio = () => {
    subscribers.forEach((subscriber) => {
      subscriber.subscribeToAudio(!isPhoneOn);
    });
    setIsPhoneOn(!isPhoneOn);
  };
  const [isHover, setisHover] = useState(false);
  return (
    <NavContainer>
      <IconHoverBox>
        <FontAwesomeIcon
          icon={faSignOut}
          style={{ color: "white", cursor: "pointer" }}
          flip="horizontal"
          onClick={leaveSession}
        />
      </IconHoverBox>

      <motion.div style={{ marginLeft: "1rem", position: "relative" }}>
        <motion.div onClick={() => setisHover(!isHover)}>
          <FontAwesomeIcon
            style={{ color: "white", cursor: "pointer" }}
            flip="horizontal"
            icon={faCircleInfo}
          />
        </motion.div>
        <AnimatePresence mode="wait">
          {isHover && (
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              className="shadow"
              style={{
                position: "absolute",
                top: "1rem",
                left: "0",
                padding: "1rem",
                backgroundColor: "white",
                zIndex: "1",
                borderRadius: "1rem",
                width: "38rem",
                gap: "2rem",
              }}
            >
              <div style={{ borderBottom: "2px solid black" }}>
                <div style={{ fontSize: "1.3rem" }}>{"<db 접속 방법>"}</div>
                <div style={{ display: "flex", gap: "2rem" }}>
                  <div>
                    <div>외부에서 접근 </div>
                    <div>{`URL : projectsinabro.store:{dbPort}`}</div>
                    <div>PASSWORD : ssafy</div>
                  </div>
                  <div>
                    <div>{"CLI에서 접근 (터미널 여는법 Ctrl + `)"}</div>
                    <div>{`COMMAND : mysql -u root -p`}</div>
                    <div>PASSWORD : ssafy</div>
                  </div>
                </div>
              </div>
              <div
                style={{ borderBottom: "2px solid black", marginTop: "1rem" }}
              >
                <div style={{ fontSize: "1.3rem" }}>{"<깃 사용법>"}</div>
                {/* <div
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <img
                    style={{ width: "2.5rem", height: "2.5rem" }}
                    src="/images/gituse.PNG"
                  />
                  <div>Vs코드의 Source Control로 이동하기</div>
                </div>
                <div style={{ alignItems: "center" }}>
                  <div>
                    <img src="/images/Group_197.png" />
                  </div>
                  <div style={{ display: "flex" }}>
                    <img src="/images/syncChange.PNG" />
                    <div>
                      <div>3.1 Sync Chages를 통해 Git push가능</div>
                      <div>3.2깃 허브 로그인 후 접근 권한 수락</div>
                    </div>
                  </div>
                </div> */}
                <img style={{width:"35rem"}} src="/images/Group_198.png" />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <div style={{ fontSize: "1.3rem" }}>{"<URL 연결>"}</div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ width: "5rem" }}>백엔드</div>
                  <div>{"{자신의 코드 서버 URL}/proxy/8080/ "}</div>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ width: "5rem" }}>프론트 엔드</div>
                  <div>
                    <div>{"npm run dev 한 경우 Dev 섹션으로 "}</div>
                    <div>{"npm start 한 경우 Start 섹션으로 "}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <NavRigthBox>
        <FontAwesomeIcon
          icon={faMicrophone}
          style={{
            color: isMicOn ? "white" : "grey",
            cursor: "pointer",
            height: "1rem",
            width: "1rem",
          }}
          onClick={toggleMicrophone}
        />
        <FontAwesomeIcon
          icon={faHeadphonesSimple}
          style={{
            color: isPhoneOn ? "white" : "grey",
            cursor: "pointer",
            height: "1rem",
            width: "1rem",
          }}
          onClick={toggleAllSubscribersAudio}
        />
        {publisher !== undefined ? (
          <UserImage>
            <UserVideoComponent streamManager={publisher} />
          </UserImage>
        ) : null}
        {subscribers.map((sub, i) => (
          <UserImage key={sub.id}>
            <UserVideoComponent streamManager={sub} />
          </UserImage>
        ))}
      </NavRigthBox>
      <RightNavContainer>
        <div
          className="switch"
          style={{ border: "solid 2px white" }}
          data-isOn={isDark}
          onClick={toggleDarkMode}
        >
          <motion.div className="handle" layout onClick={toggleDarkMode}>
            <DarkModeSwitch
              style={{}}
              checked={isDark}
              onChange={toggleDarkMode}
              size={18}
              sunColor=" rgb(81, 81, 81)"
              moonColor="white"
            />
          </motion.div>
        </div>
      </RightNavContainer>
    </NavContainer>
  );
}
