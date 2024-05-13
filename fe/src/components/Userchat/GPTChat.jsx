import React, { useEffect, useRef, useState } from "react";
import OpenAI from "openai";
import getEnv from "../../utils/getEnv";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { getDatabase, ref, push, onValue } from "firebase/database";
import {motion} from "framer-motion"
import styled from "styled-components";
import { useSelector } from "react-redux";
const IconHoverBox = styled.div`
    transition: transform 0.3 ease;
    &:hover{
        transform: scale(1.2)
    }
`
const GPTChat = ({whatpjt, setWhatpjt}) => {
  const [talkhistory, settalkhistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [word, setWord] = useState("");
  const messageEndRef = useRef(null);
  const openai_api_key = getEnv("OPENAI_API_KEY");
  const openai = new OpenAI({
    apiKey: openai_api_key,
    dangerouslyAllowBrowser: true,
  });

  const userInfo = useSelector(state => state.user.currentUser)

  useEffect(() => {
    // Fetch chat history from Firebase Realtime Database
    const db = getDatabase();
    const chatRef = ref(db, `chatBotChats/${userInfo.uid}`);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const chatMessages = Object.values(data);
        settalkhistory(chatMessages);
      }
    });
  }, []);

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const sendText = async (text) => {
    if (text === "") {
      return;
    }
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "물어보는 질문에 친절하게 대답해줘.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      model: "gpt-4-turbo",
    });

    return response.choices[0].message.content;
  };

  const enterSendWord = (e) => {
    if (e.key === "Enter") {
      handleChatbot(word);
    }
  };

  const handleChatbot = async (text) => {
    if (text === "") {
      return;
    }
    setWord("");
    setIsLoading(true);
    settalkhistory((prev) => [...prev, { role: "user", content: text }]);
    const ans = await sendText(text);
    settalkhistory((prev) => [...prev, { role: "bot", content: ans }]);
    setIsLoading(false);

    // Save the chat message to Firebase Realtime Database
    const db = getDatabase();
    const chatRef = ref(db, "chatBotChats");
    push(chatRef, {
      role: "user",
      content: text,
    });
    push(chatRef, {
      role: "bot",
      content: ans,
    });
  };
  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
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
          <motion.div
            onClick={() => setWhatpjt(false)}
            whileHover={{ x: 2, color: "#564CAD" }}
            style={{ color: "#9c9c9c" }}
          >
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
          {talkhistory.map((item, index) => (
            <div key={index}>
              {item.role ==="user"?  (
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
                    {item.content}
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
                    { }
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
                    {item.content}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && <p>Loading...</p>}
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
              value={word}
              placeholder="채팅하기"
              onChange={(e) => setWord(e.target.value)}
              onKeyUp={(e) => enterSendWord(e)}
            />
            {/* 채팅 전송 버튼 */}
            <IconHoverBox>
              <FontAwesomeIcon
                icon={faPaperPlane}
                onClick={() => handleChatbot(word)}
                style={{ cursor: "pointer", color: "#3EC8AF" }}
              />
            </IconHoverBox>
          </div>
        </motion.div>
      </div>
    </>
  );
};
export default GPTChat;
