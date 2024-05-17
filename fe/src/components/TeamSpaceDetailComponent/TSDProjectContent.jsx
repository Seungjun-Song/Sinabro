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

const TSDProjectContent = ({ whatInfo, isDark }) => {
  const [whatUser, setWhatUser] = useState(false);
  const myCurrentProject = useSelector(state => state.myCurrentProject.value);
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
          height: teamInfo.length >=4 &&whatInfo == "팀원"  ? "46rem" : "23rem",
          border: "1px solid #554BAC", // 투명한 테두리 설정
          borderRadius: "1.5rem",
          width: "100%",
          overflowX: "hidden",
          overflowY: "auto",
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
        {whatInfo == "일정" && <Todo isDark={isDark} />}
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
