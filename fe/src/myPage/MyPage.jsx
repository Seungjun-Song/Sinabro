import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyPageSidePanel from "./MyPageSidePanel";
import MyPageMainPanel from "./MyPageMainPanel";
import Navbar from "../components/navs/Navbar";
import { useSelector } from "react-redux";
import { GlobalColor } from "../services/color";
import axios from "axios";
import getEnv from "../utils/getEnv";
import { useLocation } from "react-router-dom";
import UserChat from "../components/Userchat/UserChat";

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: "center";
  min-width: 1200px;
`;

const MainBox = styled.div`
  display: flex;
  width: 80%;
  height: calc(100% - 80px);
  margin-top: 4rem;
`;

const MyPage = () => {
  const isDark = useSelector((state) => state.isDark.isDark);
  const userInfo = useSelector((state) => state.user.currentUser);
  console.log(userInfo)
  const [isMe, setIsMe] = useState(false);
  const location = useLocation();
  const { memberId } = location.state|| {};
  console.log(memberId)
  const [userfind, setUserFind] = useState({});

  const back_url = getEnv("BACK_URL");
  useEffect(() => {
    const findUser = async () => {
        console.log(userInfo.uid);
      // console.log(memberId)
      try {
        let res = "";
        if (memberId == 0 || userInfo.uid == memberId) {
          res = await axios.get(`${back_url}/members/${userInfo.uid}`);
          setIsMe(true);
        } else {
          res = await axios.get(`${back_url}/members/${memberId}`);
          setIsMe(false);
        }

        // console.log(res.data.result);
        setUserFind(res.data.result);
      } catch (err) {
        console.error(err);
      }
    };
    findUser();
  }, [memberId]);
  return (
    <>
    <UserChat />
      <MyPageContainer
        style={{
          backgroundColor: isDark ? GlobalColor.colors.primary_black : "white",
          transition: "0.3s",
        }}
      >
        <div style={{ width: "100%", height: "80px" }}>
          <Navbar />
        </div>
        <MainBox>
          <MyPageSidePanel
            userInfo={userInfo}
            userfind={userfind}
            isDark={isDark}
            isMe={isMe}
          />
          <MyPageMainPanel
            isMe={isMe}
            userInfo={userInfo}
            setUserFind={setUserFind}
            isDark={isDark}
            userfind={userfind}
          />
        </MainBox>
      </MyPageContainer>
    </>
  );
};

export default MyPage;
