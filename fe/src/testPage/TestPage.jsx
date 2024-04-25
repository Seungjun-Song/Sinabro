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
        <div style={{padding: '5rem'}}>
            <div>
                <h1>TestPage</h1>
                <p> Your Name is {userInfo.currentUser.displayName}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                <button onClick={handleLogout}>This button is logout function</button>
                <button onClick={() => navigate('/survey')}>설문 페이지</button>
                <button onClick={() => navigate('/mypage')}>마이 페이지</button>
                <button onClick={() => navigate('/TeamSpacePage')}>팀스페이스 페이지</button>
                <button onClick={() => navigate('/project')}>프로젝트 페이지</button>
            </div>
        </div>
    )
}

export default TestPage