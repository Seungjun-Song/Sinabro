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
    transition: transform 0.3 ease;
    &:hover{
        transform: scale(1.2)
    }
`

const Chat = () => {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user);
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState([]);
    const messageEndRef = useRef(null)
    const currentTime = new Date().toISOString()
    const [beforeUser, setBeforeUser] = useState("")

    const isDark = !useSelector(state => state.isDark.isDark)
    const projectRoomId = useSelector(state => state.projectRoomId.value)

    useEffect(() => {
        // Firebase Realtime Database에서 채팅 메시지를 가져와서 설정합니다.
        const db = getDatabase();
        const chatRef = ref(db, `chats/${projectRoomId}`);
        onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // 채팅 메시지를 배열로 변환하여 상태에 설정합니다.
                const chatMessages = Object.values(data)
                setChats(chatMessages)
            }
        });
    }, []);

    useEffect(() => {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    })

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
            // 메시지를 보낸 후 입력 필드를 초기화합니다.
            setMessage("");
        }
    };

    const enterSendMessage = (e) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    // 숫자를 두 자리로 만들고 앞에 0을 채워주는 함수
    const padZero = (num) => {
        return num < 10 ? `0${num}` : num;
    };

    const timeFormatting = (time) => {

        const dateObj = new Date(time)
        const formattedDate = `${dateObj.getFullYear()}-${padZero(dateObj.getMonth() + 1)}-${padZero(dateObj.getDate())}`
        const formattedTime = `${padZero(dateObj.getHours())}:${padZero(dateObj.getMinutes())}`

        return (`${formattedDate} ${formattedTime}`);
    }

    return (
        <div style={{ width: '100%', height: '100%', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
            {/* 채팅 메시지 출력 */}
            <div style={{ overflowY: 'scroll', height: '92%', marginBottom: '1rem', width: "auto", overflowX: 'hidden' }}>
                {chats.map((chat, index) => (
                    <div key={index}>
                        {chat.sender === userInfo.currentUser.uid ?
                            <div className="d-flex flex-column" style={{ width: "100%" }}>
                                <div style={{ alignSelf: "flex-end", backgroundColor: '#564CAD', color: 'white', padding: '0 0.5rem', margin: '0.2rem 0', borderRadius: '0.5rem 0.5rem 0 0.5rem', maxWidth: '10rem' }}>{chat.message}</div>
                                <div style={{ alignSelf: "flex-end", color: 'whitesmoke', fontSize: '0.7rem' }} >{timeFormatting(chat.timestamp)}</div>
                            </div>
                            :
                            <div className="d-flex flex-column" style={{ width: "100%" }}>
                                <div style={{ alignSelf: "flex-start", padding: '0 0.5rem', margin: '0.2rem 0', maxWidth: '12rem', fontWeight: 'bold', color: `${!isDark ? 'white' : 'black'}` }}>{chat.displayName}</div>
                                <div style={{ alignSelf: "flex-start", padding: '0 0.5rem', margin: '0.2rem 0', borderRadius: '0 0.5rem 0.5rem 0.5rem', maxWidth: '10rem', border: '2px solid #D6D6D6', backgroundColor: `${isDark ? 'white' : '#D6D6D6'}` }}>{chat.message}</div>
                                <div style={{ alignSelf: "flex-start", color: 'whitesmoke', fontSize: '0.7rem' }} >{timeFormatting(chat.timestamp)}</div>
                            </div>
                        }
                    </div>))}
                <div ref={messageEndRef}></div>
            </div>
            {/* 채팅 입력 필드 */}
            <div style={{ display: 'flex', justifyContent: 'space-around', height: '8%' }}>
                <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <input
                        style={{
                            width: "90%",
                            borderRadius: '50px',
                            border: '1px solid #E5E5E5',
                            padding: '0 1rem',
                            outline: 'none',
                        }}
                        type="text"
                        value={message}
                        placeholder="채팅하기"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyUp={(e) => enterSendMessage(e)}
                    />
                    {/* 채팅 전송 버튼 */}
                    <IconHoverBox>
                        <FontAwesomeIcon icon={faPaperPlane} onClick={sendMessage} style={{ cursor: 'pointer', color: '#3EC8AF' }} />
                    </IconHoverBox>
                </div>
            </div>
        </div>
    );
};

export default Chat;
