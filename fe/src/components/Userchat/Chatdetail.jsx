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

const IconHoverBox = styled.div`
  transition: transform 0.3s ease;
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

  useEffect(() => {
    const db = getDatabase();
    const chatRef = ref(db, `chats/${whatpjt.projectId}`);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const chatMessages = Object.values(data);
        setChats(chatMessages);
        console.log(chatMessages);
      }
    });
  }, [whatpjt.projectId]);

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
      setMessage("");
    }
  };

  const enterSendMessage = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  const timeFormatting = (time) => {
    const dateObj = new Date(time);
    const formattedDate = `${dateObj.getFullYear()}.${padZero(dateObj.getMonth() + 1)}.${padZero(dateObj.getDate())}`;
    const formattedTime = `${padZero(dateObj.getHours())}:${padZero(dateObj.getMinutes())}`;
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <motion.div
          transition={{ duration: 0.2 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          style={{
            width: "100%",
            borderBottom: "3px solid transparent",
            borderImage: "linear-gradient(to left, #a8c0ff, #3f2b96 )",
            borderImageSlice: "1",
            padding: "1rem",
            height: "10%",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
          }}
        >
          <h5 style={{ margin: 0, fontWeight: "bold", fontSize: "1rem" }}>
            {whatpjt.projectname}
          </h5>
          <motion.div onClick={() => setWhatpjt(false)} whileHover={{ x: 2, color: "#564CAD" }} style={{ color: "#9c9c9c" }}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ cursor: "pointer" }}
            />
          </motion.div>
        </motion.div>
        <motion.div
          transition={{ duration: 0.2, delay: 0.2 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          style={{
            overflowY: "scroll",
            height: "70%",
            width: "auto",
            overflowX: "hidden",
            padding: "0 1rem",
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
                      padding: "0.5rem",
                      margin: "0.2rem 0",
                      borderRadius: "0.5rem 0.5rem 0 0.5rem",
                      maxWidth: "80%",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {chat.message}
                  </div>
                  <div style={{ alignSelf: "flex-end", color: 'grey', fontSize: '0.7rem' }} >{timeFormatting(chat.timestamp)}</div>
                </div>
              ) : (
                <div className="d-flex flex-column" style={{ width: "100%" }}>
                  <div
                    style={{
                      alignSelf: "flex-start",
                      padding: "0.5rem",
                      margin: "0.2rem 0",
                      maxWidth: "80%",
                      fontWeight: "bold",
                    }}
                  >
                    {chat.displayName}
                  </div>
                  <div
                    style={{
                      alignSelf: "flex-start",
                      padding: "0.5rem",
                      margin: "0.2rem 0",
                      borderRadius: "0.5rem 0.5rem 0.5rem 0",
                      maxWidth: "80%",
                      border: "2px solid #D6D6D6",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {chat.message}
                  </div>
                  <div style={{ alignSelf: "flex-start", color: 'grey', fontSize: '0.7rem' }} >{timeFormatting(chat.timestamp)}</div>
                </div>
              )}
            </div>
          ))}
          <div ref={messageEndRef}></div>
        </motion.div>
        <motion.div
          transition={{ duration: 0.2, delay: 0.4 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          style={{
            display: "flex",
            justifyContent: "space-around",
            height: "10%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "auto",
              padding: "0 1rem",
              minHeight: "50%",
            }}
          >
            <textarea
              style={{
                width: "90%",
                borderRadius: "15px",
                border: "1px solid #E5E5E5",
                padding: "0.75rem",
                outline: "none",
                resize: "none",
                height: "3rem",
                margin: '2rem 0 0 0',
              }}
              value={message}
              placeholder="채팅하기"
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => enterSendMessage(e)}
            />
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
