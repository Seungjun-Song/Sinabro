import React from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import {motion} from "framer-motion"
import { useEffect, useState } from "react";

const Chatlist = ({ item, setWhatpjt, whatpjt }) => {

  const [lastChat, setLastChat] = useState(null)
  const [lastTime, setLastTime] = useState(null)

  useEffect(() => {
    // Firebase Realtime Database에서 채팅 메시지를 가져와서 설정합니다.
    const db = getDatabase()
    const chatRef = ref(db, `chats/${item.projectId}`)
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        // 채팅 마지막 메세지 저장
        const chatMessages = Object.values(data)
        const lastMessage = chatMessages[chatMessages.length - 1]?.message
        const lastChatTime = chatMessages[chatMessages.length - 1]?.message
        setLastChat(lastMessage)

      }
    })
  }, [whatpjt.projectId])

  return (
    <>
      {" "}
      <motion.div
        onClick={()=>setWhatpjt(item)}
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
      </motion.div>
    </>
  );
};
export default Chatlist;
