import React, { useEffect } from "react";
import app from "./firebase";
import { Route, Routes, useLocation, useNavigate, useRoutes } from "react-router-dom";
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
import axios from "axios";

import CommunityMainPage from "./communityPage/communityList/CommunityMainPage";
import CreatePost from "./communityPage/createPost/CreatePage";
import DetailMainPage from "./communityPage/communityDetail/DetailMainPage";
import WriterPage from "./communityPage/communityDetail/writerPage/WriterPage";
import TeamLinkPage from "./communityPage/communityDetail/teamPage/TeamPage";
import OauthTest from "./oauthTestPage/OauthTest";
import Callback from "./oauthTestPage/Callback";

import WebRTC from "./components/webrtc/WebRTC";

import "./fonts/Font.css"
import TeamSpaceDetailPage from "./teamSpaceDetailPage/teamSpaceDetailPage";
import Mainpage from "./Mainpage/Mainpage";
import ProjectPage from "./projectPage/ProjectPage";
import { Calender } from "./components/calender/Calender";
import BoardingPage from "./boardingPage/BoardingPage";
import { AnimatePresence } from "framer-motion";
import SonarqubePage from "./SonarqubePage/SonarqubePage";

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
//   const element = useRoutes([
//     {
//       path:"/boarding",
//       element :<BoardingPage/>,
//     },
//     {
//       path:"/Mainpage",
//       element :<Mainpage/>,
//     }
//   ])
//   <AnimatePresence mode="wait" >
//   {React.cloneElement(element, { key: location.pathname })}
// </AnimatePresence>
  const location = useLocation();

  // axios.defaults.withCredentials = true; 

  return (
   
    <Routes>
      {/* <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/> */}
      <Route path='/testpage' element={<TestPage/>}/>
      <Route path='/codetest' element={<CodeTestPage/>}/>
      <Route path='/survey' element={<SurveyPage/>}/>
      <Route path='/mypage' element={<MyPage/>}/>
      <Route path="/TeamSpacePage" element={<TeamSpacePage />} />
      <Route path="/communityMainPage" element={<CommunityMainPage/>}/>
      <Route path="/createPost" element={<CreatePost/>}/>
      <Route path="/communityDetail" element={<DetailMainPage/>}/>
      <Route path="/TeamSpaceDetailPage/:projectId" element={<TeamSpaceDetailPage />} />
      <Route path="/Mainpage" element={<Mainpage />} />
      <Route path="/project/:roomId" element={<ProjectPage />} />
      <Route path="/writerPage" element={<WriterPage/>}/>
      <Route path="/teamLinkPage" element={<TeamLinkPage/>}/>
      
      {/* <Route path="/calender" element={<Calender />} />
      <Route path="/rtc" element={<WebRTC />} /> */}




      
      <Route path="/" element={<BoardingPage/>} />

      {/* <Route path="/oauthTest" element={<OauthTest />} /> */}
      <Route path="/callback" element={<Callback />} />


      <Route path="/SonarQube" element={<SonarqubePage />} />
    </Routes>
  );
};

export default App;
