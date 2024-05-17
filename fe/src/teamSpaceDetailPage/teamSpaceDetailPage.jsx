import { useEffect, useState } from "react";
import TSDProjectInfo from "../components/TeamSpaceDetailComponent/TSDProjectInfo";
import TSDProjectName from "../components/TeamSpaceDetailComponent/TSDProjectName";
import Navbar from "../components/navs/Navbar";
import TSDProjectContent from "../components/TeamSpaceDetailComponent/TSDProjectContent";
import { motion } from "framer-motion";
import { GlobalColor } from "../services/color";
import { useSelector } from "react-redux";
import UserChat from "../components/Userchat/UserChat";
// import api from "../services/api";
const TeamSpaceDetailPage = () => {
  const isDark = useSelector(state =>state.isDark.isDark)
  
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     event.returnValue = '이거 진짜에요?'; // 필요에 따라 사용자에게 보여줄 메시지 작성
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);
  const [whatInfo, setWhatInfo] = useState("설명"); // 왼쪽 버튼 선택
  const [isIn, setIsIn] = useState(false);
  return (
    <>
      <Navbar />
      <UserChat/>
      <div
        className="d-flex flex-column"
        style={{
          width: "100vw",
          minHeight:"100vh",
          alignItems: "center",
          paddingTop: "5rem",
          backgroundColor : isDark ? GlobalColor.colors.primary_black : "white",
          // backgroundColor: "rgba(212, 223, 255, 0.2)",
          transition:"0.3s",
          minWidth: '1200px',
        }}
        
      >
        <TSDProjectName isIn={isIn} isDark={isDark} />
        <div style={{ display: "flex", width: "70%" }}>
          <TSDProjectInfo isIn={isIn} setIsIn={setIsIn} isDark={isDark}  whatInfo={whatInfo} setWhatInfo={setWhatInfo} />
          <TSDProjectContent isDark={isDark} whatInfo={whatInfo} />
        </div>
      </div>
    </>
  );
};

export default TeamSpaceDetailPage;
