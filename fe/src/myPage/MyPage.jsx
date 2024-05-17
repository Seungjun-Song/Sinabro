import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyPageSidePanel from "./MyPageSidePanel";
import MyPageMainPanel from "./MyPageMainPanel";
import Navbar from "../components/navs/Navbar";
import { useSelector } from "react-redux";
import { GlobalColor } from "../services/color";
import axios from "axios";
import getEnv from "../utils/getEnv";

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content:"center";
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
  // console.log(userInfo)
  const [userfind, setUserFind] = useState({});
  const back_url = getEnv("BACK_URL");
  useEffect(() => {
    const findUser = async () => {
    //   console.log(userInfo.uid);
      try {
        const res = await axios.get(`${back_url}/members/${userInfo.uid}`);
        console.log(res);
        setUserFind(res.data.result);
      } catch (err) {
        console.error(err);
      }
    };
    findUser();
  }, []);
  return (
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
        />
        <MyPageMainPanel userInfo={userInfo} setUserFind={setUserFind} isDark={isDark} userfind={userfind} />
      </MainBox>
    </MyPageContainer>
  );
};

export default MyPage;
