import React, { useState } from "react";
import OpenAI from "openai";
import getEnv from "../../utils/getEnv";

const ChatBot = () => {
    const [talkhistory, settalkhistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [word, setWord] = useState("");
    const openai_api_key = getEnv('OPENAI_API_KEY')
    const openai = new OpenAI({
        apiKey: openai_api_key,
        dangerouslyAllowBrowser: true, // 나중에 수정해야함
    });

    const sendText = async (text) => {
        if (text === "") {
            return;
        }
        const response = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content:
                        "물어보는 질문에 친절하게 대답해줘.",
                },
                {
                    role: "user",
                    content: text,
                },
            ],
            model: "gpt-3.5-turbo",
        });

        return response.choices[0].message.content;
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
    };

    return (
        <div>
            {/* 대화 내역 출력 */}
            {talkhistory.map((item, index) => (
                <div key={index}>
                    <p>{item.role === "user" ? "User: " : "Chatbot: "}</p>
                    <p>{item.content}</p>
                </div>
            ))}

            {/* 입력창 및 버튼 */}
            <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
            />
            <button onClick={() => handleChatbot(word)}>Send</button>

            {/* 로딩 표시 */}
            {isLoading && <p>Loading...</p>}
        </div>
    );
};

export default ChatBot;
