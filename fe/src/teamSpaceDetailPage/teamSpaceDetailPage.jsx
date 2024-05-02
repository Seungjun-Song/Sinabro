import { useEffect, useState } from "react";
import TSDProjectInfo from "../components/TeamSpaceDetailComponent/TSDProjectInfo";
import TSDProjectName from "../components/TeamSpaceDetailComponent/TSDProjectName";
import Navbar from "../components/navs/Navbar";
import TSDProjectContent from "../components/TeamSpaceDetailComponent/TSDProjectContent";
import { motion } from "framer-motion";
import { GlobalColor } from "../services/color";
import { useSelector } from "react-redux";
// import api from "../services/api";
const TeamSpaceDetailPage = () => {
  const isDark = useSelector(state =>state.isDark.isDark)
  
  // useEffect(() => {
  //   const axios_request = async () => {
  //     // console.log(pageNumber)
  //     try {
  //       const response = await api.get(`/teams`, {
  //         projectId: 1,
  //       });
  //       console.log(response);
  //       return;
  //     } catch (e) {}
  //   };
  //   axios_request();
  // }, []);

  const [whatInfo, setWhatInfo] = useState("설명"); // 왼쪽 버튼 선택
  return (
    <>
      <Navbar />
      <div
        className="d-flex flex-column"
        style={{
          width: "100vw",
          height:"100vh",
          alignItems: "center",
          paddingTop: "5rem",
          backgroundColor : isDark ? GlobalColor.colors.primary_black : "white",
          // backgroundColor: "rgba(212, 223, 255, 0.2)",
          transition:"0.3s"
        }}
        
      >
        <TSDProjectName isDark={isDark} />
        <div style={{ display: "flex", width: "70%" }}>
          <TSDProjectInfo  isDark={isDark}  whatInfo={whatInfo} setWhatInfo={setWhatInfo} />
          <TSDProjectContent isDark={isDark} whatInfo={whatInfo} />
        </div>
      </div>
    </>
  );
};

export default TeamSpaceDetailPage;
