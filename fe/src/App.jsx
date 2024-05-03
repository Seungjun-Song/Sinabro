import React, { useEffect } from "react";
import app from "./firebase";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./loginPage/LoginPage";
import RegisterPage from "./registerPage/RegisterPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { clearUser, setUser } from "./store/userSlice";
import TestPage from "./testPage/TestPage";
import CodeTestPage from "./testPage/CodeTestPage";
import SurveyPage from "./surveyPage/SurveyPage";
import MyPage from "./myPage/MyPage";
import TeamSpacePage from "./teamspacePage/TeamSpacePage";

import CommunityMainPage from "./communityPage/communityList/CommunityMainPage";
import CreatePost from "./communityPage/createPost/CreatePage";
import DetailMainPage from "./communityPage/communityDetail/DetailMainPage";
import OauthTest from "./oauthTestPage/OauthTest";
import Callback from "./oauthTestPage/Callback";

import WebRTC from "./components/webrtc/WebRTC";

import "./fonts/Font.css"
import TeamSpaceDetailPage from "./teamSpaceDetailPage/teamSpaceDetailPage";
import Mainpage from "./Mainpage/Mainpage";
import ProjectPage from "./projectPage/ProjectPage";
import { Calender } from "./components/calender/Calender";
import BoardingPage from "./boardingPage/BoardingPage";
const api = "https://k10e103.p.ssafy.io/"
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const auth = getAuth(app);
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigate("/");
  //       dispatch(
  //         setUser({
  //           uid: user.uid,
  //           displayName: user.displayName,
  //         })
  //       );
  //     } else {
  //       navigate("/login");
  //       dispatch(clearUser());
  //     }
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/' element={<TestPage/>}/>
      <Route path='/codetest' element={<CodeTestPage/>}/>
      <Route path='/survey' element={<SurveyPage/>}/>
      <Route path='/mypage' element={<MyPage/>}/>
      <Route path="/TeamSpacePage" element={<TeamSpacePage />} />
      <Route path="/communityMainPage" element={<CommunityMainPage/>}/>
      <Route path="/createPost" element={<CreatePost/>}/>
      <Route path="/communityDetail" element={<DetailMainPage/>}/>
      <Route path="/TeamSpaceDetailPage" element={<TeamSpaceDetailPage />} />
      <Route path="/Mainpage" element={<Mainpage />} />
      <Route path="/project" element={<ProjectPage />} />
      <Route path="/calender" element={<Calender />} />
      <Route path="/rtc" element={<WebRTC />} />




      
      <Route path="/boarding" element={<BoardingPage/>} />

      <Route path="/oauthTest" element={<OauthTest />} />
      <Route path="/callback" element={<Callback />} />

    </Routes>
  );
};

export default App;
