import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import app from "../firebase";
import { clearUser } from "../store/userSlice";
import ChatBot from "../components/chatbot/ChatBot";
import { useNavigate } from "react-router-dom";

const TestPage = () => {

    const userInfo = useSelector(state => (state.user))
    const auth = getAuth(app);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch(clearUser());
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <div>
            <h1>TestPage</h1>
            <p> Your Name is {userInfo.currentUser.displayName}</p>
            <button onClick={handleLogout}>This button is logout function</button>
            <ChatBot/>
            <button onClick={() => navigate('/codetest')}>이게 되네?</button>
            <button onClick={() => navigate('/survey')}>설문 페이지</button>
            <button onClick={() => navigate('/mypage')}>마이 페이지</button>
            <button onClick={() => navigate('/TeamSpacePage')}>팀스페이스 페이지</button>
            <button onClick={() => navigate('/communityMainPage', {state: {kind: "member"}})}>커뮤니티</button>
            <button onClick={() => navigate('/TeamSpaceDetailPage')}>팀스페이스 디테일 페이지</button>
            <button onClick={() => navigate('/Mainpage')}>메인페이지</button>
        </div>
    )
}

export default TestPage