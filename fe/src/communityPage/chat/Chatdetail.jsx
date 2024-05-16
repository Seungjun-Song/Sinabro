import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import app from "../../firebase";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// import getEnv from "../../utils/getEnv";
const IconHoverBox = styled.div`
  transition: transform 0.3 ease;
  &:hover {
    transform: scale(1.2);
  }
`;
const Chatdetail = ({ setWhatpjt, whatpjt }) => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const messageEndRef = useRef(null);
  const currentTime = new Date().toISOString();
  const [beforeUser, setBeforeUser] = useState("");
  useEffect(() => {
    // Firebase Realtime Database에서 채팅 메시지를 가져와서 설정합니다.
    const db = getDatabase();

    const chatRef = ref(db, `chats/${whatpjt.projectId}`);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // 채팅 메시지를 배열로 변환하여 상태에 설정합니다.
        const chatMessages = Object.values(data);
        setChats(chatMessages);
        console.log(chatMessages);
      }
    });
  }, [whatpjt]);
  const sendMessage = () => {
    if (message.trim() !== "") {
      const db = getDatabase();
      const chatRef = ref(db, `chats/${whatpjt.projectId}`);
      push(chatRef, {
        message: message,
        sender: userInfo.currentUser.uid,
        displayName: userInfo.currentUser.displayName,
        timestamp: currentTime,
      });
      // 메시지를 보낸 후 입력 필드를 초기화합니다.
      setMessage("");
    }
  };
  const enterSendMessage = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <>
    <div style={{height:"100%" ,width:"100%"}} >
      <motion.div
        transition={{ duration: 0.2 }}
        initial={{ opacity: 0, y: 10 }} // 초기 상태에서 opacity를 0으로 설정
        animate={{ opacity: 1, y: 0 }} // 나타날 때 opacity를 1로 설정
        exit={{ opacity: 0, y: 10 }} // 사라질 때 opacity를 0으로 설정
        style={{
          width: "100%",
          borderBottom: "3px solid transparent", // 투명한 테두리 설정
          borderImage: "linear-gradient(to left, #a8c0ff, #3f2b96 )", // 그라데이션 테두리 이미지
          borderImageSlice: "1", // 이미지 슬라이스
          padding: "1rem",
          height: "10%",
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
          // height: "5.5rem",
          //   marginBottom: "0.5rem",
        }}
      >
        <h5 style={{ margin: 0, fontWeight: "bold", fontSize: "1rem" }}>
          {whatpjt.projectname}
        </h5>
        <motion.div onClick={()=>setWhatpjt(false)} whileHover={{x:2 , color:"#564CAD"}} style={{ color: "#9c9c9c" }}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            style={{ cursor: "pointer" }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        transition={{ duration: 0.2, delay: 0.2 }}
        initial={{ opacity: 0, y: 10 }} // 초기 상태에서 opacity를 0으로 설정
        animate={{ opacity: 1, y: 0 }} // 나타날 때 opacity를 1로 설정
        exit={{ opacity: 0, y: 10 }} // 사라질 때 opacity를 0으로 설정
        style={{
          overflowY: "scroll",
          height: "80%",
          // marginBottom: "1rem",
          width: "auto",
          overflowX: "hidden",
          padding: "0 1rem ",
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
        }}
      >
        {chats.map((chat, index) => (
          <div key={index}>
            {chat.sender === userInfo.currentUser.uid ? (
              <div className="d-flex flex-column" style={{ width: "100%" }}>
                <div
                  style={{
                    alignSelf: "flex-end",
                    backgroundColor: "#564CAD",
                    color: "white",
                    padding: "0 0.5rem",
                    margin: "0.2rem 0",
                    borderRadius: "0.5rem 0.5rem 0 0.5rem",
                    maxWidth: "80%",
                  }}
                >
                  {chat.message}
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column" style={{ width: "100%" }}>
                <div
                  style={{
                    alignSelf: "flex-start",
                    padding: "0 0.5rem",
                    margin: "0.2rem 0",
                    maxWidth: "12rem",
                    fontWeight: "bold",
                  }}
                >
                  {chat.displayName}
                </div>
                <div
                  style={{
                    alignSelf: "flex-start",
                    padding: "0 0.5rem",
                    margin: "0.2rem 0",
                    borderRadius: "0.5rem 0.5rem 0.5rem 0",
                    maxWidth: "80%",
                    border: "2px solid #D6D6D6",
                  }}
                >
                  {chat.message}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </motion.div>
      {/* 채팅 입력 필드 */}
      <motion.div
        transition={{ duration: 0.2, delay: 0.4 }}
        initial={{ opacity: 0, y: 10 }} // 초기 상태에서 opacity를 0으로 설정
        animate={{ opacity: 1, y: 0 }} // 나타날 때 opacity를 1로 설정
        exit={{ opacity: 0, y: 10 }} // 사라질 때 opacity를 0으로 설정
        style={{
          display: "flex",
          justifyContent: "space-around",
          height: "10%",
          alignItems: "center",
          // marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // padding:"1rem"
            height: "auto",
            padding: "0 1rem",
            minHeight: "50%",
          }}
        >
          <input
            style={{
              width: "90%",
              borderRadius: "50px",
              border: "1px solid #E5E5E5",
              padding: "0 1rem",
              outline: "none",
              height: "auto",
            }}
            type="text"
            value={message}
            placeholder="채팅하기"
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => enterSendMessage(e)}
          />
          {/* 채팅 전송 버튼 */}
          <IconHoverBox>
            <FontAwesomeIcon
              icon={faPaperPlane}
              onClick={sendMessage}
              style={{ cursor: "pointer", color: "#3EC8AF" }}
            />
          </IconHoverBox>
        </div>
      </motion.div>
      </div>
    </>
  );
};
export default Chatdetail;
