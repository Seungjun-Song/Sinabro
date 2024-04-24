import { useState } from "react";
import TSDProjectInfo from "../components/TeamSpaceDetailComponent/TSDProjectInfo";
import TSDProjectName from "../components/TeamSpaceDetailComponent/TSDProjectName";
import Navbar from "../components/navs/Navbar";
import TSDProjectContent from "../components/TeamSpaceDetailComponent/TSDProjectContent";
import { motion } from "framer-motion";
const TeamSpaceDetailPage = () => {
  const [whatInfo , setWhatInfo] = useState("설명") // 왼쪽 버튼 선택
  return (
    <>
      <Navbar />
      <div
        className="d-flex flex-column"
        style={{
          width: "100vw",

          alignItems: "center",
          paddingTop: "7rem",
          // backgroundColor: "rgba(212, 223, 255, 0.2)",
        }}
      >
        <TSDProjectName />
        <div   style={{display:"flex" ,width:"70%"}}  >
          <TSDProjectInfo whatInfo={whatInfo} setWhatInfo={setWhatInfo} />
          <TSDProjectContent  whatInfo={whatInfo}  />
        </div>
      </div>
    </>
  );
};

export default TeamSpaceDetailPage;
