import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import app from "../../firebase";
import { clearUser } from "../../store/userSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";

const IconHoverBox = styled.div`
    transition: transform 0.3s ease;
    &:hover {
        transform: scale(1.2);
    }
`;

const Chat = () => {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user);
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState([]);
    const messageEndRef = useRef(null);
    const currentTime = new Date().toISOString();

    const isDark = !useSelector((state) => state.isDark.isDark);
    const projectRoomId = useSelector((state) => state.projectRoomId.value);

    useEffect(() => {
        const db = getDatabase();
        const chatRef = ref(db, `chats/${projectRoomId}`);
        onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const chatMessages = Object.values(data);
                setChats(chatMessages);
            }
        });
    }, [projectRoomId]);

    useEffect(() => {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch(clearUser());
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const sendMessage = () => {
        if (message.trim() !== "") {
            const db = getDatabase();
            const chatRef = ref(db, `chats/${projectRoomId}`);
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
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

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
        <div style={{ width: '100%', height: '100%', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ overflowY: 'scroll', height: '92%', marginBottom: '1rem', width: "auto", overflowX: 'hidden' }}>
                {chats.map((chat, index) => (
                    <div key={index}>
                        {chat.sender === userInfo.currentUser.uid ?
                            <div className="d-flex flex-column" style={{ width: "100%" }}>
                                <div style={{ alignSelf: "flex-end", backgroundColor: '#564CAD', color: 'white', padding: '0.5rem', margin: '0.2rem 0', borderRadius: '0.5rem 0.5rem 0 0.5rem', maxWidth: '10rem', whiteSpace: 'pre-wrap' }}>{chat.message}</div>
                                <div style={{ alignSelf: "flex-end", color: 'grey', fontSize: '0.7rem' }}>{timeFormatting(chat.timestamp)}</div>
                            </div>
                            :
                            <div className="d-flex flex-column" style={{ width: "100%" }}>
                                <div style={{ alignSelf: "flex-start", maxWidth: '12rem', fontWeight: 'bold', color: `${!isDark ? 'white' : 'black'}` }}>{chat.displayName}</div>
                                <div style={{ alignSelf: "flex-start", padding: '0.5rem', margin: '0.2rem 0', borderRadius: '0 0.5rem 0.5rem 0.5rem', maxWidth: '10rem', border: '2px solid #D6D6D6', backgroundColor: `${isDark ? 'white' : '#D6D6D6'}`, whiteSpace: 'pre-wrap' }}>{chat.message}</div>
                                <div style={{ alignSelf: "flex-start", color: 'grey', fontSize: '0.7rem', marginBottom: '0.3rem' }}>{timeFormatting(chat.timestamp)}</div>
                            </div>
                        }
                    </div>
                ))}
                <div ref={messageEndRef}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', height: '8%' }}>
                <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <textarea
                        style={{
                            width: "90%",
                            borderRadius: '15px',
                            border: '1px solid #E5E5E5',
                            padding: '1rem',
                            outline: 'none',
                            resize: 'none',
                            height: '4rem'
                        }}
                        value={message}
                        placeholder="채팅하기"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => enterSendMessage(e)}
                    />
                    <IconHoverBox>
                        <FontAwesomeIcon icon={faPaperPlane} onClick={sendMessage} style={{ cursor: 'pointer', color: '#3EC8AF' }} />
                    </IconHoverBox>
                </div>
            </div>
        </div>
    );
};

export default Chat;
