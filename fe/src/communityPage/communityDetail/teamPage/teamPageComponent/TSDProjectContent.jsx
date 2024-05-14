import { useState } from "react";
import ProjectTeam from "./ProjectTeam";
import Projectexplanation from "./Projectexplanation";
import TSDUserModal from "./TSDUserModal";
import { AnimatePresence } from "framer-motion";
import { GlobalColor } from "../../../../services/color";
import Todo from "./Todo";
import { useSelector } from "react-redux";

const TSDProjectContent = ({ whatInfo, isDark, myCurrentProject, teamInfo, teamLeader, pjtId }) => {
  const [whatUser, setWhatUser] = useState(false);

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
          height: "23rem",
          border: "1px solid #554BAC", // 투명한 테두리 설정
          borderRadius: "1.5rem",
          width: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          backgroundColor: isDark
            ? GlobalColor.colors.primary_black50
            : "white",
        }}
      >
        {whatInfo == "설명" && <Projectexplanation isDark={isDark} myCurrentProject={myCurrentProject}/>}
        {whatInfo == "팀원" && (
          <ProjectTeam isDark={isDark} setWhatUser={setWhatUser} myCurrentProject={myCurrentProject}
                        teamInfo={teamInfo} teamLeader={teamLeader} pjtId={pjtId}
          />
        )}
        {whatInfo == "일정" && <Todo isDark={isDark} />}
        <AnimatePresence>
          {whatUser && (
            <TSDUserModal myCurrentProject={myCurrentProject} whatUser={whatUser} setWhatUser={setWhatUser} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default TSDProjectContent;
