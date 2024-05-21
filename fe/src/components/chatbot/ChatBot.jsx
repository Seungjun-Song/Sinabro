import React, { useEffect, useRef, useState } from "react";
import OpenAI from "openai";
import getEnv from "../../utils/getEnv";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { getDatabase, ref, push, onValue } from "firebase/database";
import app from "../../firebase";
import styled from "styled-components";
import { useSelector } from "react-redux";

const IconHoverBox = styled.div`
    transition: transform 0.3s ease;
    &:hover {
        transform: scale(1.2);
    }
`;

const ChatBot = () => {
    const [talkhistory, settalkhistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [word, setWord] = useState("");
    const messageEndRef = useRef(null);
    const openai_api_key = getEnv('OPENAI_API_KEY');
    const openai = new OpenAI({
        apiKey: openai_api_key,
        dangerouslyAllowBrowser: true,
    });

    const isDark = !useSelector(state => state.isDark.isDark);
    const projectRoomId = useSelector(state => state.projectRoomId.value);
    const userInfo = useSelector(state => state.user.currentUser)

    useEffect(() => {
        // Fetch chat history from Firebase Realtime Database
        const db = getDatabase();
        const chatRef = ref(db, `chatBotChats/${projectRoomId}/${userInfo.uid}`);
        onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const chatMessages = Object.values(data);
                settalkhistory(chatMessages);
            }
        });
    }, [projectRoomId]);

    useEffect(() => {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [talkhistory]);

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
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
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
        const chatRef = ref(db, `chatBotChats/${projectRoomId}/${userInfo.uid}`);
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
        <div style={{ width: '100%', height: '100%', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ overflowY: 'scroll', height: '92%', marginBottom: '1rem', width: "auto", overflowX: 'hidden' }}>
                {/* Chat history */}
                {talkhistory.map((item, index) => (
                    <div key={index}>
                        {item.role === 'user' ?
                            <div className="d-flex flex-column" style={{ width: "100%" }}>
                                <div style={{ alignSelf: "flex-end", backgroundColor: '#564CAD', color: 'white', padding: '0.5rem', margin: '0.2rem 0', borderRadius: '0.5rem 0.5rem 0 0.5rem', maxWidth: '12rem', whiteSpace: 'pre-wrap' }}>{item.content}</div>
                            </div>
                            :
                            <div className="d-flex flex-column" style={{ width: "100%" }}>
                                <div style={{ alignSelf: "flex-start", padding: '0.5rem', margin: '0.2rem 0', borderRadius: '0 0.5rem 0.5rem 0.5rem', maxWidth: '12rem', border: '2px solid #D6D6D6', backgroundColor: `${isDark ? 'white' : '#D6D6D6'}`, whiteSpace: 'pre-wrap' }}>{item.content}</div>
                            </div>
                        }
                    </div>
                ))}
                {/* Loading indicator */}
                {isLoading && <p>Loading...</p>}
                <div ref={messageEndRef}></div>
            </div>
            {/* Input field and button */}
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
                        value={word}
                        placeholder="채팅하기"
                        onChange={(e) => setWord(e.target.value)}
                        onKeyPress={(e) => enterSendWord(e)}
                    />
                    <IconHoverBox>
                        <FontAwesomeIcon icon={faPaperPlane} onClick={() => handleChatbot(word)} style={{ cursor: 'pointer', color: '#3EC8AF' }} />
                    </IconHoverBox>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
