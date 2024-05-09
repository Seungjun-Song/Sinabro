import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyPageSidePanel from "./MyPageSidePanel";
import MyPageMainPanel from "./MyPageMainPanel";
import Navbar from "../components/navs/Navbar";
import { useSelector } from "react-redux";
import { GlobalColor } from "../services/color";
import axios from "axios";

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
`;

const MainBox = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  margin-top: 4rem;
`;

const MyPage = () => {
  const isDark = useSelector((state) => state.isDark.isDark);
  const userInfo = useSelector((state) => state.user.currentUser);
  console.log(userInfo);
  const [userfind, setUserFind] = useState({
    memberId: 139435073,
    nickname: "cho1jaeseong",
    memberGit: "https://github.com/cho1jaeseong",
    memberImg: "https://avatars.githubusercontent.com/u/139435073?v=4",
    memberEmail: null,
    memberJob: "프론트엔드",
    techStacks: [null],
    projects: [],
  });
  useEffect(() => {
    const findUser = async () => {
      try {
        const res = await axios.get(`/members/${userInfo.uid}`);
        console.log(res.data);
        // setUserFind(res.data)
        // navigate('/mainPage')
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
        <MyPageMainPanel isDark={isDark} userfind={userfind} />
      </MainBox>
    </MyPageContainer>
  );
};

export default MyPage;
