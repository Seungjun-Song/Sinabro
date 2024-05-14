import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WriterPageSidePanel from "./WriterPageSidePanel";
import WriterPageMainPanel from "./WriterPageMainPanel";
import Navbar from "../../../components/navs/Navbar";
import { useSelector } from "react-redux";
import { GlobalColor } from "../../../services/color";
import axios from "axios";
import getEnv from "../../../utils/getEnv";
import { useLocation } from "react-router-dom";

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

const WriterPage = () => {
  const isDark = useSelector((state) => state.isDark.isDark);
  
  const location = useLocation();
  const data = location.state;
  const memberId = data.memberId;

  const [userfind, setUserFind] = useState({});
  const back_url = getEnv("BACK_URL");
  useEffect(() => {
    const findUser = async () => {
      try {
        const res = await axios.get(`${back_url}/members/${memberId}`);
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
        <WriterPageSidePanel
          userfind={userfind}
          isDark={isDark}
        />
        <WriterPageMainPanel setUserFind={setUserFind} isDark={isDark} userfind={userfind} />
      </MainBox>
    </MyPageContainer>
  );
};

export default WriterPage;
