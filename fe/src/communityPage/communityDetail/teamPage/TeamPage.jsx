import { useEffect, useState } from "react";
import TSDProjectInfo from "./teamPageComponent/TSDProjectInfo"
import TSDProjectName from "./teamPageComponent/TSDProjectName";
import Navbar from "../../../components/navs/Navbar";
import TSDProjectContent from "./teamPageComponent/TSDProjectContent";
import { motion } from "framer-motion";
import { GlobalColor } from "../../../services/color";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import getEnv from "../../../utils/getEnv";
import axios from "axios";

// import api from "../services/api";
const TeamSpaceDetailPage = () => {
  const isDark = useSelector(state =>state.isDark.isDark)
  
  const [whatInfo, setWhatInfo] = useState("설명"); // 왼쪽 버튼 선택
  const [ pjtInfo, setPjtInfo ] = useState({});
  const [teamInfo, setTeamInfo] = useState([]);
  const [teamLeader, setTeamLeader] = useState(null);

  const location = useLocation();
  const data = location.state;
  const pjtId = data.pjtId;

  const back_url = getEnv('BACK_URL');

  console.log("pjtId", pjtId)

  const convertTeammateRole = (originalRole) => {
    switch (originalRole) {
      case "프론트엔드":
        return "FE";
      case "백엔드":
        return "BE";
      case "풀스택":
        return "FULL";
      default:
        return originalRole;
    }
  };

  useEffect(() => {
    axios.get(`${back_url}/teams?projectId=${pjtId}`)
    .then((res) => {
      // console.log("get data", res.data.result);
      const getData = res.data.result;
      // console.log(getData);

      setPjtInfo(getData);

      setTeamLeader(getData.teammateInfoList[0]?.memberId);
      const transformedTeamInfo = res.data.result.teammateInfoList?.map(
        (item) => ({
          ...item,
          teammateRole: convertTeammateRole(item.teammateRole),
        })
      );
      // console.log(transformedTeamInfo);
      setTeamInfo(transformedTeamInfo);


    })
    .catch((err) => {
      console.log(err);
    })
    
  }, [])

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
        <TSDProjectName isDark={isDark} myCurrentProject={pjtInfo} />
        <div style={{ display: "flex", width: "70%" }}>
          <TSDProjectInfo  isDark={isDark}  whatInfo={whatInfo} setWhatInfo={setWhatInfo} />
          <TSDProjectContent isDark={isDark} whatInfo={whatInfo} myCurrentProject={pjtInfo} teamInfo={teamInfo} teamLeader={teamLeader} pjtId={pjtId} />
        </div>
      </div>
    </>
  );
};

export default TeamSpaceDetailPage;
