import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import app from "../firebase";
import { clearUser } from "../store/userSlice";
import ChatBot from "../components/chatbot/ChatBot";

const TestPage = () => {

    const userInfo = useSelector(state => (state.user))
    const auth = getAuth(app);
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
        </div>
    )
}

export default TestPage