import { useState } from "react";
import ProjectTeam from "./ProjectTeam";
import Projectexplanation from "./Projectexplanation";
import TSDUserModal from "./TSDUserModal";
import { AnimatePresence } from "framer-motion";
import { GlobalColor } from "../../services/color";
import { Calender } from "../calender/Calender";
import SonarQubeContents from "./SonarQubeContents"
import Todo from "./Todo";

const TSDProjectContent = ({ whatInfo, isDark }) => {
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
          overflowX: whatInfo === "일정" ? "" : "auto",
          // overflowY: whatInfo === "일정" ? "auto" : "",
          backgroundColor: isDark
            ? GlobalColor.colors.primary_black50
            : "white",
        }}
      >
        {whatInfo == "설명" && <Projectexplanation isDark={isDark} />}
        {whatInfo == "팀원" && (
          <ProjectTeam isDark={isDark} setWhatUser={setWhatUser} />
        )}
        {whatInfo == "일정" && <Todo isDark={isDark} />}
        <AnimatePresence>
          {whatUser && (
            <TSDUserModal whatUser={whatUser} setWhatUser={setWhatUser} />
          )}
        </AnimatePresence>
        {whatInfo == "소나큐브" && <SonarQubeContents/>}
      </div>
    </>
  );
};

export default TSDProjectContent;
