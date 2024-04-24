import { useState } from "react";
import ProjectTeam from "./ProjectTeam";
import Projectexplanation from "./Projectexplanation";
import TSDUserModal from "./TSDUserModal";
import { AnimatePresence } from "framer-motion";

const TSDProjectContent = ({ whatInfo }) => {
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
          overflowX: "auto",
        }}
      >
        {whatInfo == "설명" && <Projectexplanation />}
        {whatInfo == "팀원" && <ProjectTeam setWhatUser={setWhatUser} />}
        <AnimatePresence>
          {whatUser && (
            <TSDUserModal whatUser={whatUser} setWhatUser={setWhatUser} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default TSDProjectContent;
