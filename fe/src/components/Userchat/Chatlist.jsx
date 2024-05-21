import React from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Chatlist = ({ item, setWhatpjt, whatpjt }) => {
  const [lastChat, setLastChat] = useState(null);
  const [lastTime, setLastTime] = useState(null);

  useEffect(() => {
    // Firebase Realtime Database에서 채팅 메시지를 가져와서 설정합니다.
    const db = getDatabase();
    const endPoint = item.projectName === 'GPT' ? 'chatBotChats' : 'chats'
    const chatRef = ref(db, `${endPoint}/${item.projectId}`);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // 채팅 마지막 메세지 저장
        const chatMessages = Object.values(data);
        const lastMessage = chatMessages[chatMessages.length - 1]?.message;
        const lastChatTime = chatMessages[chatMessages.length - 1]?.timestamp;
        setLastChat(lastMessage);

        // timestamp를 Date 객체로 변환
        const dateObj = new Date(lastChatTime);

        // 직접 포맷팅
        const formattedDate = `${dateObj.getFullYear()}-${padZero(dateObj.getMonth() + 1)}-${padZero(dateObj.getDate())}`;
        const formattedTime = `${padZero(dateObj.getHours())}:${padZero(dateObj.getMinutes())}`;
        setLastTime(`${formattedDate} ${formattedTime}`);
      }
    });
  }, [whatpjt.projectId]);

  // 숫자를 두 자리로 만들고 앞에 0을 채워주는 함수
  const padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <>
      {" "}
      <motion.div
        onClick={() => setWhatpjt(item)}
        whileHover={{ cursor: "pointer", backgroundColor: "white" }}
        style={{
          position: "relative",
          padding: "1rem",
          display: "flex",
          gap: "1rem",
          height: "5.5rem",
          alignItems: "center",
          borderRadius: "1rem",
        }}
      >
        <img style={{ width: "3rem", height: "3rem" }} src={item.projectImg} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <div>
            <h5 style={{ fontSize: "0.9rem", margin: 0 }}>{item.projectName}</h5>
            <div></div>
          </div>
          <h5 style={{ fontSize: "0.9rem", margin: 0 }}>{lastChat}</h5>
        </div>
        {item.projectName !== 'GPT' ?
          <div
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              fontSize: "0.7rem",
              opacity: 0.5,
            }}
          >
            {lastTime}
          </div>
          :
          null
        }
      </motion.div>
    </>
  );
};

export default Chatlist;
