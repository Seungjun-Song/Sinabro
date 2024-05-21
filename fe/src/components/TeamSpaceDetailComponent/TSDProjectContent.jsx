import { useState } from "react";
import ProjectTeam from "./ProjectTeam";
import Projectexplanation from "./Projectexplanation";
import TSDUserModal from "./TSDUserModal";
import { AnimatePresence } from "framer-motion";
import { GlobalColor } from "../../services/color";
import { Calender } from "../calender/Calender";
import SonarQubeContents from "./SonarQubeContents"
import Todo from "./Todo";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import getEnv from "../../utils/getEnv";

const TSDProjectContent = ({ whatInfo, isDark }) => {
  const [whatUser, setWhatUser] = useState(false);
  const [milestone ,setMilestone] = useState([])
  const back_url = getEnv("BACK_URL");
  const myCurrentProject = useSelector(state => state.myCurrentProject.value);
  useEffect(()=>{
    const getmilestone = async()=>{
      try {
        const res = await axios.get(
          `${back_url}/milestones/${myCurrentProject.projectId}`
        );
        console.log(res.data.result)
        setMilestone(res.data.result)
      } catch (err) {
        console.error(err);
      }
    }
    getmilestone()
  },[myCurrentProject])

  // console.log(myCurrentProject)
  const [teamInfo, setTeamInfo] = useState([]);
  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "2rem",
          padding: "2rem",
          minHeight:  "23rem",
          border: "1px solid #554BAC", // 투명한 테두리 설정
          borderRadius: "1.5rem",
          width: "100%",
          // overflowX:"auto",
          // overflowY: "auto",
          backgroundColor: isDark
            ? GlobalColor.colors.primary_black50
            : "white",
          transition:"0.3s"
        }}
      >
        {whatInfo == "설명" && <Projectexplanation isDark={isDark} />}
        {whatInfo == "팀원" && (
          <ProjectTeam teamInfo={teamInfo} isDark={isDark} setTeamInfo={setTeamInfo} setWhatUser={setWhatUser} />
        )}
        {whatInfo == "일정" && <Todo milestone={milestone} setMilestone={setMilestone} isDark={isDark} />}
        <AnimatePresence>
          {whatUser && (
            <TSDUserModal myCurrentProject={myCurrentProject} whatUser={whatUser} setWhatUser={setWhatUser} />
          )}
        </AnimatePresence>
        {whatInfo == "소나큐브" && <SonarQubeContents/>}
      </div>
    </>
  );
};

export default TSDProjectContent;
